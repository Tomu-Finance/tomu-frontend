'use client';

import React, { useState } from 'react';
import '../../../styles/pages/Deposit.scss';
import Image from 'next/image';
import copy from '../../../assets/svgs/copy.svg';
import Select from '@/components/Select';

type ActiveModeTab = 'fiat' | 'crypto';
type ActiveDepositTab = 'inAppWallet' | 'protocol';

const Deposit = () => {
  const [activeModeTab, setActiveModeTab] = useState<ActiveModeTab>('fiat');
  const [activeDepositTab, setActiveDepositTab] =
    useState<ActiveDepositTab>('inAppWallet');
  const [showProtocolDepositDetails, setShowProtocolDepositDetails] = useState({
    fiat: false,
    crypto: false,
  });

  const handleProtocolDepositClick = () => {
    setShowProtocolDepositDetails((prevState) => ({
      ...prevState,
      [activeModeTab]: true, // Update the state for the current mode (fiat or crypto)
    }));
  };

  const closeProtocolDepositDetails = () => {
    setShowProtocolDepositDetails((prevState) => ({
      ...prevState,
      [activeModeTab]: false, // Close the state for the current mode
    }));
  };

  return (
    <div className="depositPage">
      <p className="depositPage__heading">Deposit</p>
      <div className="depositPage__box">
        <div className="depositPage__box__tab">
          <div
            className={`depositPage__box__tab__fiat ${
              activeModeTab === 'fiat' ? 'active' : ''
            }`}
            onClick={() => setActiveModeTab('fiat')}
          >
            Fiat
          </div>
          <div
            className={`depositPage__box__tab__crypto ${
              activeModeTab === 'crypto' ? 'active' : ''
            }`}
            onClick={() => setActiveModeTab('crypto')}
          >
            Crypto
          </div>
        </div>
        <div className="depositPage__box__actions">
          <p className="depositPage__box__actions__heading">Deposit to</p>
          <div className="depositPage__box__actions__tab">
            <div
              className={`depositPage__box__actions__tab__wallet ${
                activeDepositTab === 'inAppWallet' ? 'active' : ''
              }`}
              onClick={() => setActiveDepositTab('inAppWallet')}
            >
              In-app wallet
            </div>
            <div
              className={`depositPage__box__actions__tab__protocol ${
                activeDepositTab === 'protocol' ? 'active' : ''
              }`}
              onClick={() => setActiveDepositTab('protocol')}
            >
              Protocol
            </div>
          </div>
        </div>
        <div className="depositPage__box__info">
          {(activeModeTab === 'fiat' && activeDepositTab === 'inAppWallet') ||
          (activeModeTab === 'crypto' && activeDepositTab === 'inAppWallet') ? (
            <div className="depositPage__box__info__wallet">
              <div className="depositPage__box__info__wallet__top">
                <p className="depositPage__box__info__wallet__top__address">
                  0x72eBDcd...5ebCa3656F8559F2C073
                </p>
                <Image
                  src={copy}
                  alt="copy icon"
                  className="depositPage__box__info__wallet__top__copy"
                />
              </div>
              <p className="depositPage__box__info__wallet__instructions">
                Above is your wallet detail where the deposit will be made, you
                can also go ahead and copy the address to make the deposit via
                direct crypto deposit.{' '}
                <span>Deposit on through EVM chains.</span>
              </p>
            </div>
          ) : null}

          {activeModeTab === 'fiat' && activeDepositTab === 'inAppWallet' && (
            <div className="depositPage__box__info__details">
              <div className="depositPage__box__info__details__wrapper">
                <p className="depositPage__box__info__details__wrapper__title">
                  Bank Transfer
                </p>
                <p className="depositPage__box__info__details__wrapper__sub">
                  Deposit to the account below to credit your account.
                </p>
              </div>

              <p className="depositPage__box__info__details__text">
                <span>Bank name:</span> Wema Bank
              </p>

              <p className="depositPage__box__info__details__text">
                <span>Account name:</span> onramp-gateway-account
              </p>

              <div className="depositPage__box__info__details__group">
                <p className="depositPage__box__info__details__group__text">
                  Account number: <span>0108149208</span>
                </p>
                <Image
                  className="depositPage__box__info__details__group__icon"
                  src={copy}
                  alt="copy icon"
                />
              </div>

              <button className="depositPage__box__info__details__button">
                Deposit
              </button>
            </div>
          )}

          {activeModeTab === 'crypto' && activeDepositTab === 'inAppWallet' && (
            <div className="depositPage__box__info__details">
              <div className="depositPage__box__info__details__wrapper">
                <p className="depositPage__box__info__details__wrapper__title">
                  Deposit wallet address
                </p>
                <p className="depositPage__box__info__details__wrapper__sub">
                  Deposit to the address below to credit your account.
                </p>
              </div>

              <p className="depositPage__box__info__details__text">
                <span>Network:</span> Base network
              </p>

              <div className="depositPage__box__info__details__wrapper small">
                <p className="depositPage__box__info__details__wrapper__heading bold">
                  Wallet address:
                </p>
                <div className="depositPage__box__info__details__group">
                  <p className="depositPage__box__info__details__group__text">
                    <span>0x72eBDcd...5ebCa3656F8559F2C073</span>
                  </p>
                  <Image
                    className="depositPage__box__info__details__group__icon"
                    src={copy}
                    alt="copy icon"
                  />
                </div>
              </div>

              <button className="depositPage__box__info__details__button">
                Deposit
              </button>
            </div>
          )}

          {activeDepositTab === 'protocol' && (
            <>
              {!showProtocolDepositDetails[activeModeTab] && (
                <div className="depositPage__box__info__chain">
                  <p className="depositPage__box__info__chain__heading">
                    Chain selection
                  </p>
                  <div className="depositPage__box__info__chain__column">
                    <div className="depositPage__box__info__chain__column__wrapper">
                      <Select
                        width={145}
                        height={45}
                        text="Network"
                        iconColor="#00140F"
                      />
                      <Select
                        width={145}
                        height={45}
                        text="Protocol"
                        iconColor="#00140F"
                      />
                    </div>
                    <div className="depositPage__box__info__chain__column__wrapper lg">
                      <Select
                        width={124}
                        height={45}
                        text="Asset"
                        iconColor="#00140F"
                      />
                      <input
                        placeholder="Enter amount"
                        className="depositPage__box__info__chain__column__wrapper__input"
                      />
                    </div>
                    <button
                      className="depositPage__box__info__chain__column__button"
                      onClick={handleProtocolDepositClick}
                    >
                      Deposit
                    </button>
                  </div>
                </div>
              )}

              {showProtocolDepositDetails[activeModeTab] && (
                <div>
                  <div className="depositPage__box__info__wallet">
                    <p className="depositPage__box__info__wallet__heading">
                      Complete the deposit in: <span>2mins 12 secs</span>
                    </p>
                    <p className="depositPage__box__info__wallet__instructions">
                      Ensure to make the deposit in this time window to ensure
                      the successful deposit of your funds to the chain.
                    </p>
                  </div>

                  <div className="depositPage__box__info__details">
                    {activeModeTab === 'fiat' ? (
                      <>
                        <div className="depositPage__box__info__details__wrapper">
                          <p className="depositPage__box__info__details__wrapper__title">
                            Bank Transfer
                          </p>
                          <p className="depositPage__box__info__details__wrapper__sub">
                            Deposit to the account below to credit your account.
                          </p>
                        </div>

                        <p className="depositPage__box__info__details__text">
                          <span>Bank name:</span> Wema Bank
                        </p>

                        <p className="depositPage__box__info__details__text">
                          <span>Account name:</span> onramp-gateway-account
                        </p>

                        <div className="depositPage__box__info__details__group">
                          <p className="depositPage__box__info__details__group__text">
                            Account number: <span>0108149208</span>
                          </p>
                          <Image
                            className="depositPage__box__info__details__group__icon"
                            src={copy}
                            alt="copy icon"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="depositPage__box__info__details__wrapper">
                          <p className="depositPage__box__info__details__wrapper__title">
                            Deposit wallet address
                          </p>
                          <p className="depositPage__box__info__details__wrapper__sub">
                            Deposit to the address below to credit your account.
                          </p>
                        </div>

                        <p className="depositPage__box__info__details__text">
                          <span>Network:</span> Base network
                        </p>

                        <div className="depositPage__box__info__details__wrapper small">
                          <p className="depositPage__box__info__details__wrapper__heading bold">
                            Wallet address:
                          </p>
                          <div className="depositPage__box__info__details__group">
                            <p className="depositPage__box__info__details__group__text">
                              <span>0x72eBDcd...5ebCa3656F8559F2C073</span>
                            </p>
                            <Image
                              className="depositPage__box__info__details__group__icon"
                              src={copy}
                              alt="copy icon"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <button
                      className="depositPage__box__info__details__button"
                      onClick={closeProtocolDepositDetails}
                    >
                      I have made the deposit
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
