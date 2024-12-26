'use client';

import React, { useState } from 'react';
import '../../styles/pages/Withdraw.scss';
import Select from '@/components/Select';
import successful from '../../assets/svgs/successful.svg';
import link from '../../assets/svgs/link.svg';
import Image from 'next/image';

type ActiveTab = 'wallet' | 'bankTransfer';

const Withdraw: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('wallet');
  const [withdrawalSuccess, setWithdrawalSuccess] = useState<boolean>(false);

  const handleWithdraw = () => {
    setWithdrawalSuccess(true);
  };

  return (
    <div className="withdraw">
      <p className="withdraw__title">
        {withdrawalSuccess ? 'Withdrawal Successful' : 'Withdrawal'}
      </p>
      <div className="withdraw__box">
        {withdrawalSuccess ? (
          <div className="withdraw__box__success">
            {activeTab === 'wallet' ? (
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
                />
                <Select
                  text="Protocol"
                  height={45}
                  width={145}
                  iconColor="#00140F"
                />
              </div>
              <div className="withdraw__box__top__second">
                <Select
                  text="Asset"
                  height={45}
                  width={124}
                  iconColor="#00140F"
                />
                <input
                  className="withdraw__box__top__second__input"
                  placeholder="Enter amount"
                />
              </div>
            </div>
            <div className="withdraw__box__bottom">
              <p className="withdraw__box__bottom__heading">Recipient</p>
              <div className="withdraw__box__bottom__wrapper">
                <div className="withdraw__box__bottom__wrapper__tab">
                  <div
                    className={`withdraw__box__bottom__wrapper__tab__wallet ${
                      activeTab === 'wallet' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('wallet')}
                  >
                    Wallet
                  </div>
                  <div
                    className={`withdraw__box__bottom__wrapper__tab__transfer ${
                      activeTab === 'bankTransfer' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('bankTransfer')}
                  >
                    Bank transfer
                  </div>
                </div>
                {activeTab === 'wallet' ? (
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
                    />
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Account number"
                    />
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Account name"
                    />
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Bank"
                    />
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Remark"
                    />
                    <input
                      className="withdraw__box__bottom__wrapper__input"
                      placeholder="Enter passcode"
                    />
                  </>
                )}
                <button
                  className="withdraw__box__bottom__wrapper__button"
                  onClick={handleWithdraw}
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
