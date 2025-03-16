"use client";

import React, { useEffect, useMemo, useState } from "react";
import "../../styles/pages/Withdraw.scss";
import Select from "@/components/Select";
import successful from "../../assets/svgs/successful.svg";
import link from "../../assets/svgs/link.svg";
import Image from "next/image";
import { supportedChains } from "@/utils/constants/chaints";
import {
  useSendSponsoredTransaction,
  useSmartAccount,
  useUserOpWait,
} from "@biconomy/use-aa";
import {
  fetchSupportedTokens,
  getGatewayContractAddress,
  publicKeyEncrypt,
} from "@/utils/helpers/utils";
import {
  fetchAccountName,
  fetchAggregatorPublicKey,
  fetchRate,
  fetchSupportedInstitutions,
  NGN_PROVIDER_ID,
} from "@/utils/helpers/aggregator";
import { Address, InstitutionProps, Token } from "@/utils/helpers/types";
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWriteContract,
} from "wagmi";
import {
  BaseError,
  decodeEventLog,
  encodeFunctionData,
  erc20Abi,
  formatUnits,
  getAddress,
  parseUnits,
} from "viem";
import { gatewayAbi } from "@/utils/constants/abi";
type ActiveTab = "wallet" | "bankTransfer";
// TODO: break this component into different sub component this is too packed makes the code a whole lot less readable
const Withdraw: React.FC = () => {
  // TODO: manage form states more effectively (I.e with react-hook-form)
  const account = useAccount();
  const client = usePublicClient();
  const [activeTab, setActiveTab] = useState<ActiveTab>("wallet");
  const [withdrawalSuccess, setWithdrawalSuccess] = useState<boolean>(false);
  const [network, setNetwork] = useState<string>("");
  const [asset, setAsset] = useState<Token | undefined>(undefined);
  const [amount, setAmount] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [bank, setBank] = useState<string>("");
  const [remark, setRemark] = useState<string>("");
  const [passcode, setPasscode] = useState<string>("");
  // TODO: add loading state for banks
  const [banks, setBanks] = useState<InstitutionProps[]>([]);
  const [rate, setRate] = useState<number>(0);
  const [isFecthingRate, setIsFetchingRate] = useState<boolean>(false);
  const [gatewayAllowance, setGatewayAllowance] = useState<number>(0);
  const [smartGatewayAllowance, setSmartGatewayAllowance] = useState<number>(0);
  const [paymasterAllowance, setPaymasterAllowance] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState("");
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isGateWayApproved, setIsGatewayApproved] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const {
    mutate,
    data: userOpResponse,
    error: userOpError,
    isPending: useropIsPending,
  } = useSendSponsoredTransaction();

  const {
    isLoading: waitIsLoading,
    isSuccess: waitIsSuccess,
    error: waitError,
    data: waitData,
  } = useUserOpWait(userOpResponse);
  const handleWithdraw = () => {
    setWithdrawalSuccess(true);
  };
  const { data: gatewayAllowanceInWei } = useReadContract({
    abi: erc20Abi,
    address: asset?.address as `0x${string}`,
    functionName: "allowance",
    args: [
      account.address!,
      getGatewayContractAddress(network) as `0x${string}`,
    ],
  });
  const { smartAccountAddress } = useSmartAccount();
  const { data: smartGatewayAllowanceInWei } = useReadContract({
    abi: erc20Abi,
    address: asset?.address as `0x${string}`,
    functionName: "allowance",
    args: [
      account.address!,
      getGatewayContractAddress(network) as `0x${string}`,
    ],
  });
  const { data: smartTokenBalanceInWei } = useReadContract({
    abi: erc20Abi,
    address: fetchSupportedTokens(network)?.find(
      (t) => t.symbol.toUpperCase() === asset?.symbol
    )?.address as `0x${string}`,
    functionName: "balanceOf",
    args: [smartAccountAddress!],
  });
  const [smartTokenBalance, setSmartTokenBalance] = useState(0);
  const { data: tokenBalanceInWei } = useReadContract({
    abi: erc20Abi,
    address: fetchSupportedTokens(network)?.find(
      (t) => t.symbol.toUpperCase() === asset?.symbol
    )?.address as `0x${string}`,
    functionName: "balanceOf",
    args: [account.address!],
  });
  const { data: paymasterAllowanceInWei } = useReadContract({
    abi: erc20Abi,
    address: asset?.address as `0x${string}`,
    functionName: "allowance",
    args: [
      getAddress("0x00000f79b7faf42eebadba19acc07cd08af44789"),
      getGatewayContractAddress(network) as `0x${string}`,
    ],
  });
  const {
    data: hash,
    error,
    isPending,
    writeContractAsync,
  } = useWriteContract();
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isApprovalLogsFetched, setIsApprovalLogsFetched] = useState(false);
  useEffect(() => {
    if (tokenBalanceInWei && asset) {
      setTokenBalance(Number(formatUnits(tokenBalanceInWei, asset?.decimals)));
    }

    if (smartTokenBalanceInWei && asset) {
      setSmartTokenBalance(
        Number(formatUnits(smartTokenBalanceInWei, asset?.decimals))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenBalanceInWei, smartTokenBalanceInWei, asset]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!client || isApprovalLogsFetched || !isConfirming || !asset) return;

    const getApprovalLogs = async () => {
      try {
        const toBlock = await client.getBlockNumber();
        const logs = await client.getContractEvents({
          address: asset?.address as Address,
          abi: erc20Abi,
          eventName: "Approval",
          args: {
            owner: account.address,
            spender: getGatewayContractAddress(network) as `0x${string}`,
          },
          fromBlock: toBlock - BigInt(10),
          toBlock: toBlock,
        });
        if (logs.length > 0) {
          console.log(logs);
          const decodedLog = decodeEventLog({
            abi: erc20Abi,
            eventName: "Approval",
            data: logs[0].data,
            topics: logs[0].topics,
          });

          if (
            decodedLog.args.value ===
            parseUnits(amount.toString(), asset?.decimals || 0)
          ) {
            clearInterval(intervalId);
            setIsApprovalLogsFetched(true);
            await createOrder();
          }
        }
      } catch (error) {
        console.error("Error fetching Approval logs:", error);
      }
    };

    // Initial call
    getApprovalLogs();

    // Set up polling
    intervalId = setInterval(getApprovalLogs, 2000);

    // Cleanup function
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [client, isApprovalLogsFetched, isConfirming]);
  useEffect(() => {
    if (gatewayAllowanceInWei && asset) {
      setGatewayAllowance(
        Number(formatUnits(gatewayAllowanceInWei, asset?.decimals))
      );
    }

    if (smartGatewayAllowanceInWei && asset) {
      setSmartGatewayAllowance(
        Number(formatUnits(smartGatewayAllowanceInWei, asset?.decimals))
      );
    }

    if (paymasterAllowanceInWei && asset) {
      setPaymasterAllowance(
        Number(formatUnits(paymasterAllowanceInWei, asset?.decimals))
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    gatewayAllowanceInWei,
    smartGatewayAllowanceInWei,
    paymasterAllowanceInWei,
    asset,
  ]);
  const handleLoadBanks = async () => {
    const banks = await fetchSupportedInstitutions("NGN");
    setBanks(banks);
  };
  useEffect(() => {
    void handleLoadBanks();
  }, []);
  const networkOptions = React.useMemo(
    () =>
      supportedChains.map((chain) => ({
        value: chain.name,
        label: chain.name,
      })),
    []
  );

  const assetOptions = fetchSupportedTokens(network)?.map((token) => ({
    value: token.address,
    label: token.name,
  }));
  const bankOptions = useMemo(
    () =>
      banks.map((bank) => ({
        value: bank.code,
        label: bank.name,
      })),
    [banks]
  );
  const handleNameLoad = async () => {
    setAccountName("");
    if (accountNumber.length !== 10 || !bank) return;
    const accountName = await fetchAccountName({
      accountIdentifier: accountNumber,
      institution: bank,
    });
    setAccountName(accountName);
  };
  const prepareCreateOrderParams = async () => {
    // Prepare recipient data
    const recipient = {
      accountIdentifier: accountNumber,
      accountName: accountName,
      institution: bank,
      providerId: NGN_PROVIDER_ID,
      memo: remark,
    };

    // Fetch aggregator public key
    const publicKey = await fetchAggregatorPublicKey();
    const encryptedRecipient = publicKeyEncrypt(recipient, publicKey.data);

    // Prepare transaction parameters
    const params = {
      token: asset?.address,
      amount: parseUnits(amount, asset?.decimals || 0),
      rate: parseUnits(rate.toString(), 0),
      senderFeeRecipient: getAddress(
        "0x0000000000000000000000000000000000000000"
      ),
      senderFee: BigInt(0),
      refundAddress: account.address,
      messageHash: encryptedRecipient,
    };

    return params;
  };

  const createOrder = async () => {
    try {
      const params = await prepareCreateOrderParams();
      console.log(params);
      setCreatedAt(new Date().toISOString());

      if (smartTokenBalance >= parseInt(amount)) {
        // Create order with sponsored user operation
        const transactions = [
          {
            to: getGatewayContractAddress(network) as Address,
            data: encodeFunctionData({
              abi: gatewayAbi,
              functionName: "createOrder",
              args: [
                params.token as `0x${string}`,
                params.amount,
                params.rate,
                params.senderFeeRecipient,
                params.senderFee,
                params.refundAddress!,
                params.messageHash,
              ],
            }),
          },
        ];

        if (smartGatewayAllowance < parseInt(amount)) {
          // Approve gateway contract to spend token
          transactions.push({
            to: asset?.address as Address,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: "approve",
              args: [
                getGatewayContractAddress(network) as `0x${string}`,
                parseUnits(amount.toString(), asset?.decimals || 0),
              ],
            }),
          });
        }

        if (paymasterAllowance < parseInt(amount)) {
          // Approve paymaster contract to spend token
          transactions.push({
            to: asset?.address as Address,
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: "approve",
              args: [
                getAddress("0x00000f79b7faf42eebadba19acc07cd08af44789"),
                parseUnits(amount.toString(), asset?.decimals || 0),
              ],
            }),
          });
        }

        mutate({ transactions });
        setIsOrderCreated(true);
      } else {
        // Create order
        await writeContractAsync({
          abi: gatewayAbi,
          address: getGatewayContractAddress(network) as `0x${string}`,
          functionName: "createOrder",
          args: [
            params.token as Address,
            params.amount,
            params.rate,
            params.senderFeeRecipient,
            params.senderFee,
            params.refundAddress!,
            params.messageHash,
          ],
        });

        setIsOrderCreated(true);
      }
    } catch (e: any) {
      if (error) {
        setErrorMessage((error as BaseError).shortMessage || error!.message);
      } else {
        setErrorMessage((e as BaseError).shortMessage);
      }
      setIsConfirming(false);
    }
  };
  const handlePaymentConfirmation = async () => {
    try {
      setIsConfirming(true);

      if (smartTokenBalance >= parseInt(amount)) {
        await createOrder();
      } else {
        // Approve gateway contract to spend token
        if (gatewayAllowance < parseInt(amount)) {
          await writeContractAsync({
            address: asset?.address as Address,
            abi: erc20Abi,
            functionName: "approve",
            args: [
              getAddress(getGatewayContractAddress(network)!),
              parseUnits(amount, asset?.decimals || 0),
            ],
          });

          setIsGatewayApproved(true);
        } else {
          await createOrder();
        }
      }
    } catch (e: any) {
      console.log(e, error);
      if (error) {
        setErrorMessage((error as BaseError).shortMessage || error!.message);
      } else {
        setErrorMessage((e as BaseError).shortMessage);
      }
      // setErrorCount((prevCount) => prevCount + 1);
      setIsConfirming(false);
    }
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const getRate = async () => {
      if (!amount || !asset) return;
      setIsFetchingRate(true);
      try {
        const rate = await fetchRate({
          token: "USDT",
          amount: parseInt(amount),
          currency: "NGN",
        });
        setRate(rate.data);
        setIsFetchingRate(false);
      } catch (error) {
        console.log(error);
      }
    };

    const debounceFetchRate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(getRate, 1000);
    };

    debounceFetchRate();

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, asset]);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debounceFetchRecipientName = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleNameLoad, 1000);
    };

    debounceFetchRecipientName();

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bank, accountNumber]);

  return (
    <div className="withdraw">
      <p className="withdraw__title">
        {withdrawalSuccess ? "Withdrawal Successful" : "Withdrawal"}
      </p>
      <div className="withdraw__box">
        {withdrawalSuccess ? (
          <div className="withdraw__box__success">
            {activeTab === "wallet" ? (
              <>
                <Image
                  src={successful}
                  alt="successful icon"
                  className="withdraw__box__success__icon"
                />
                <p className="withdraw__box__success__heading">
                  Transaction details
                </p>
                <div className="withdraw__box__success__box">
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Assets
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      USDC
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Amount
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      10 USDT
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Recipient
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      0x34gheg...
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Fee
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      10 USDT
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Date/Time
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      28th Oct, 2024 | 23:20pm
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Transaction status
                    </p>
                    <div className="withdraw__box__success__box__wrapper__status successful">
                      Completed
                    </div>
                  </div>
                  <button className="withdraw__box__success__box__wrapper__button">
                    <p className="withdraw__box__success__box__wrapper__text">
                      See explorer
                    </p>
                    <Image
                      src={link}
                      alt="link icon"
                      className="withdraw__box__success__box__wrapper__icon"
                    />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Image
                  src={successful}
                  alt="successful icon"
                  className="withdraw__box__success__icon"
                />
                <p className="withdraw__box__success__heading">
                  Transaction details
                </p>
                <div className="withdraw__box__success__box">
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Assets
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      USDC
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Amount
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      10 USDT
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Recipient name
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      Pius Anyim
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Account number
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      0108149208
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Bank
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      Access Bank
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Fee
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      10 USDT
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Date/Time
                    </p>
                    <p className="withdraw__box__success__box__wrapper__content">
                      28th Oct, 2024 | 23:20pm
                    </p>
                  </div>
                  <div className="withdraw__box__success__box__wrapper">
                    <p className="withdraw__box__success__box__wrapper__title">
                      Transaction status
                    </p>
                    <div className="withdraw__box__success__box__wrapper__status successful">
                      Completed
                    </div>
                  </div>
                  <button className="withdraw__box__success__box__wrapper__button">
                    <p className="withdraw__box__success__box__wrapper__text">
                      See explorer
                    </p>
                    <Image
                      src={link}
                      alt="link icon"
                      className="withdraw__box__success__box__wrapper__icon"
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <p className="withdraw__box__heading">Assets</p>
            <div className="withdraw__box__top">
              <div className="withdraw__box__top__first">
                <Select
                  text="Network"
                  height={45}
                  width={145}
                  iconColor="#00140F"
                  options={networkOptions}
                  onChange={(e) => setNetwork(e.target.value)}
                  value={network}
                />
                <Select
                  text="Protocol"
                  height={45}
                  width={145}
                  iconColor="#00140F"
                  defaultValue="payzcrest"
                  options={[
                    {
                      label: "Paycrest",
                      value: "paycrest",
                    },
                  ]}
                />
              </div>
              <div className="withdraw__box__top__second">
                <Select
                  text="Asset"
                  height={45}
                  width={124}
                  iconColor="#00140F"
                  options={assetOptions}
                  onChange={(e) => {
                    setAsset(
                      fetchSupportedTokens(network)?.find(
                        (option) => option.address === e.target.value
                      )
                    );
                  }}
                  value={asset?.symbol}
                />
                <input
                  className="withdraw__box__top__second__input"
                  placeholder="Enter amount"
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  disabled={network === "" || asset === ""}
                  max={500}
                />
              </div>
            </div>
            <div className="withdraw__box__bottom">
              <p className="withdraw__box__bottom__heading">Recipient</p>
              <div className="withdraw__box__bottom__wrapper">
                <div className="withdraw__box__bottom__wrapper__tab">
                  <div
                    className={`withdraw__box__bottom__wrapper__tab__wallet ${
                      activeTab === "wallet" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("wallet")}
                  >
                    Wallet
                  </div>
                  <div
                    className={`withdraw__box__bottom__wrapper__tab__transfer ${
                      activeTab === "bankTransfer" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("bankTransfer")}
                  >
                    Bank transfer
                  </div>
                </div>
                {activeTab === "wallet" ? (
                  <>
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Enter a wallet address"
                    />
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Enter passcode"
                    />
                  </>
                ) : (
                  <>
                    <Select
                      text="Currency"
                      height={45}
                      width={363}
                      iconColor="#00140F"
                      defaultValue="NGN"
                      options={[
                        {
                          label: "NGN",
                          value: "NGN",
                        },
                      ]}
                    />
                    <Select
                      text="Select Bank"
                      height={45}
                      width={363}
                      iconColor="#00140F"
                      options={bankOptions}
                      onChange={(e) => setBank(e.target.value)}
                      value={bank}
                    />
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Account number"
                      required
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Account name"
                      required
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      disabled
                    />
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Remark"
                      required
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Enter passcode"
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                    />
                  </>
                )}
                <button
                  className="withdraw__box__bottom__wrapper__button"
                  onClick={handlePaymentConfirmation}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Withdraw;
