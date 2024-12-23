import React from 'react';
import '../../styles/pages/Withdraw.scss';
import Select from '@/components/Select';

const Withdraw = () => {
  return (
    <div className="withdraw">
      <p className="withdraw__title">Withdrawal</p>
      <div className="withdraw__box">
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
            <Select text="Asset" height={45} width={124} iconColor="#00140F" />
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
              <div className="withdraw__box__bottom__wrapper__tab__wallet active">
                Wallet
              </div>
              <div className="withdraw__box__bottom__wrapper__tab__transfer">
                Bank transfer
              </div>
            </div>
            <input
              className="withdraw__box__bottom__wrapper__input"
              placeholder="Enter a wallet address"
            />
            <input
              className="withdraw__box__bottom__wrapper__input"
              placeholder="Enter passcode"
            />
            <button className="withdraw__box__bottom__wrapper__button">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
