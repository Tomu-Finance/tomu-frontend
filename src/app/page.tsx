import React from 'react';
import '../styles/pages/Portfolio.scss';
import eye from '../assets/svgs/eye.svg';
import send from '../assets/svgs/send.svg';
import deposit from '../assets/svgs/received.svg';
import Image from 'next/image';
import Select from '@/components/Select';

const HomePage = () => {
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
        <div className="portfolio__top__right"></div>
      </div>
      <div className="portfolio__bottom"></div>
    </div>
  );
};

export default HomePage;
