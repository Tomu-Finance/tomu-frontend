'use client';

import React, { useState } from 'react';
import '../styles/pages/Portfolio.scss';
import eye from '../assets/svgs/eye.svg';
import send from '../assets/svgs/send.svg';
import deposit from '../assets/svgs/received.svg';
import Image from 'next/image';
import Select from '@/components/Select';
import tecImage from '../assets/images/tecommons.png';
import boost from '../assets/images/boost.png';
import depositIcon from '../assets/svgs/deposit.svg';
import withdraw from '../assets/svgs/withdrawal.svg';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('onOfframp');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="portfolio">
      <div className="portfolio__top">
        <div className="portfolio__top__leftWrapper">
          <div className="portfolio__top__left">
            <div className="portfolio__top__left__left">
              <div className="portfolio__top__left__left__info">
                <p className="portfolio__top__left__left__info__heading">
                  Portfolio Total
                </p>
                <Image
                  src={eye}
                  alt="eye icon"
                  className="portfolio__top__left__left__info__eyeIcon"
                />
              </div>
              <p className="portfolio__top__left__left__total">
                $352.
                <span className="portfolio__top__left__left__total__span">
                  56
                </span>
              </p>
              <div className="portfolio__top__left__left__increase">2.58%+</div>
              <div className="portfolio__top__left__left__buttonWrapper">
                <button className="portfolio__top__left__left__buttonWrapper__button withdraw">
                  <Image
                    src={send}
                    alt="send icon"
                    className="portfolio__top__left__left__buttonWrapper__button__icon"
                  />
                  <p className="portfolio__top__left__left__buttonWrapper__button__text">
                    Withdraw
                  </p>
                </button>
                <button className="portfolio__top__left__left__buttonWrapper__button deposit">
                  <Image
                    src={deposit}
                    alt="deposit icon"
                    className="portfolio__top__left__left__buttonWrapper__button__icon"
                  />
                  <p className="portfolio__top__left__left__buttonWrapper__button__text">
                    Deposit
                  </p>
                </button>
              </div>
            </div>
            <button className="portfolio__top__left__rightButton">
              Edit connections
            </button>
          </div>
          <div className="portfolio__top__bottom">
            <div className="portfolio__top__bottom__top">
              <div className="portfolio__top__bottom__top__left">
                <p className="portfolio__top__bottom__top__left__heading">
                  Portfolio Performance
                </p>
                <div className="portfolio__top__bottom__top__left__increase">
                  2.58%+
                </div>
              </div>
              <Select
                text="Daily"
                height={38}
                width={103}
                iconColor="#00140F"
                type="dynamic"
              />
            </div>
          </div>
        </div>
        <div className="portfolio__top__right">
          <div className="portfolio__top__right__heading">
            <p className="portfolio__top__right__heading__text">Assets</p>
            <div className="portfolio__top__right__heading__increase">
              2.58%+
            </div>
          </div>

          <p className="portfolio__top__right__details">In-app wallet . $120</p>

          <div className="portfolio__top__right__table">
            <div className="portfolio__top__right__table__header">
              <p className="portfolio__top__right__table__header__text">
                Chain
              </p>
              <p className="portfolio__top__right__table__header__text token">
                Token
              </p>
              <p className="portfolio__top__right__table__header__text price">
                Price
              </p>
              <p className="portfolio__top__right__table__header__text amount">
                Amount
              </p>
              <p className="portfolio__top__right__table__header__text value">
                Value
              </p>
              <p className="portfolio__top__right__table__header__text actions">
                Actions
              </p>
            </div>
            <div className="portfolio__top__right__table__row">
              <p className="portfolio__top__right__table__row__text chain">
                GNO
              </p>
              <div className="portfolio__top__right__table__row__wrapper">
                <Image
                  src={tecImage}
                  className="portfolio__top__right__table__row__wrapper__icon"
                  alt=""
                />
                <p className="portfolio__top__right__table__row__wrapper__text">
                  TEC Token
                </p>
              </div>
              <p className="portfolio__top__right__table__row__text price">
                $0.311192
              </p>
              <p className="portfolio__top__right__table__row__text amount">
                668.787
              </p>
              <p className="portfolio__top__right__table__row__text value">
                $208.12
              </p>
              <div className="portfolio__top__right__table__row__iconWrapper">
                <Image
                  src={withdraw}
                  className="portfolio__top__right__table__row__iconWrapper__icon"
                  alt="withdraw icon"
                />
                <Image
                  src={depositIcon}
                  className="portfolio__top__right__table__row__iconWrapper__icon"
                  alt="deposit icon"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="portfolio__top__right__details bottom">
              Seamless Protocol . $120
            </p>

            <div className="portfolio__top__right__table bottom">
              <div className="portfolio__top__right__table__header">
                <p className="portfolio__top__right__table__header__text">
                  Chain
                </p>
                <p className="portfolio__top__right__table__header__text token">
                  Token
                </p>
                <p className="portfolio__top__right__table__header__text price">
                  Price
                </p>
                <p className="portfolio__top__right__table__header__text amount">
                  Amount
                </p>
                <p className="portfolio__top__right__table__header__text value">
                  Value
                </p>
                <p className="portfolio__top__right__table__header__text actions">
                  Actions
                </p>
              </div>
              <div className="portfolio__top__right__table__row">
                <p className="portfolio__top__right__table__row__text chain">
                  BASE
                </p>
                <div className="portfolio__top__right__table__row__wrapper">
                  <Image
                    src={boost}
                    className="portfolio__top__right__table__row__wrapper__icon"
                    alt=""
                  />
                  <p className="portfolio__top__right__table__row__wrapper__text">
                    Boost wstETH
                  </p>
                </div>
                <p className="portfolio__top__right__table__row__text price">
                  $2,543
                </p>
                <p className="portfolio__top__right__table__row__text amount">
                  0.005
                </p>
                <p className="portfolio__top__right__table__row__text value">
                  $12.715
                </p>
                <div className="portfolio__top__right__table__row__iconWrapper">
                  <Image
                    src={withdraw}
                    className="portfolio__top__right__table__row__iconWrapper__icon"
                    alt="withdraw icon"
                  />
                  <Image
                    src={depositIcon}
                    className="portfolio__top__right__table__row__iconWrapper__icon"
                    alt="deposit icon"
                  />
                </div>
              </div>

              <div className="portfolio__top__right__table__row">
                <p className="portfolio__top__right__table__row__text chain">
                  BASE
                </p>
                <div className="portfolio__top__right__table__row__wrapper">
                  <Image
                    src={boost}
                    className="portfolio__top__right__table__row__wrapper__icon"
                    alt=""
                  />
                  <p className="portfolio__top__right__table__row__wrapper__text">
                    Boost wstETH
                  </p>
                </div>
                <p className="portfolio__top__right__table__row__text price">
                  $2,543
                </p>
                <p className="portfolio__top__right__table__row__text amount">
                  0.005
                </p>
                <p className="portfolio__top__right__table__row__text value">
                  $12.715
                </p>
                <div className="portfolio__top__right__table__row__iconWrapper">
                  <Image
                    src={withdraw}
                    className="portfolio__top__right__table__row__iconWrapper__icon"
                    alt="withdraw icon"
                  />
                  <Image
                    src={depositIcon}
                    className="portfolio__top__right__table__row__iconWrapper__icon"
                    alt="deposit icon"
                  />
                </div>
              </div>
            </div>

            <div className="portfolio__top__right__bottom">
              <button className="portfolio__top__right__bottom__bottomButton">
                Show more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="portfolio__bottom">
        <div className="portfolio__bottom__top">
          <p className="portfolio__bottom__top__heading">Transaction History</p>
          <div className="portfolio__bottom__top__right">
            <div
              className={`portfolio__bottom__top__right__tab left ${
                activeTab === 'onOfframp' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('onOfframp')}
            >
              <p
                className={`portfolio__bottom__top__right__tab__text  ${
                  activeTab === 'onOfframp' ? 'active' : ''
                }`}
              >
                On/Offramp
              </p>
            </div>
            <div
              className={`portfolio__bottom__top__right__tab right ${
                activeTab === 'offchain' ? 'active' : ''
              }`}
              onClick={() => handleTabClick('offchain')}
            >
              <p
                className={`portfolio__bottom__top__right__tab__text  ${
                  activeTab === 'offchain' ? 'active' : ''
                }`}
              >
                Offchain activities
              </p>
            </div>
          </div>
        </div>

        <div className="portfolio__bottom__table">
          <div className="portfolio__bottom__table__heading">
            <p className="portfolio__bottom__table__heading__text txn">
              Txn Hash
            </p>
            <p className="portfolio__bottom__table__heading__text action">
              Action
            </p>
            <p className="portfolio__bottom__table__heading__text token">
              Token
            </p>
            <p className="portfolio__bottom__table__heading__text from">From</p>
            <p className="portfolio__bottom__table__heading__text to">To</p>
            <p className="portfolio__bottom__table__heading__text value">
              Value
            </p>
            <p className="portfolio__bottom__table__heading__text status">
              Status
            </p>
          </div>
          <div className="portfolio__bottom__table__row">
            <p className="portfolio__bottom__table__row__text txn">
              0x9a...6e87
            </p>
            <div className="portfolio__bottom__table__row__action">
              Withdrawal
            </div>
            <div className="portfolio__bottom__table__row__tokenWrapper">
              <Image
                className="portfolio__bottom__table__row__tokenWrapper__token"
                src={tecImage}
                alt="token icon"
              />
              <p className="portfolio__bottom__table__row__tokenWrapper__text">
                TEC Token (as USDC)
              </p>
            </div>
            <p className="portfolio__bottom__table__row__text from">
              0x9a...6e87
            </p>
            <p className="portfolio__bottom__table__row__text to">
              0x9a...6e87 (fiat disbursement)
            </p>
            <p className="portfolio__bottom__table__row__text value">$12.715</p>
            <div className="portfolio__bottom__table__row__status">
              Successful
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
