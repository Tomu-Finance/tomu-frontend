"use client";

import React from "react";
import "../styles/components/Header.scss";
import Select from "./Select";
import settingsIcon from "../assets/svgs/settings.svg";
import notificationsIcon from "../assets/svgs/notification.svg";
import Image from "next/image";

import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleTabClick = () => {
    router.push("/settings");
  };

  return (
    <div className="header">
      <input
        className="header__input"
        placeholder="Search for assets, address, chain"
      />
      <div className="header__right">
        <div className="header__right__selectFlex">
          <Select
            text="Protocols"
            iconColor="#00140F"
            height={45}
            width={153}
          />
          <Select
            text="All networks"
            iconColor="#00140F"
            height={45}
            width={153}
          />
        </div>
        <Image
          src={settingsIcon}
          alt="settings icon"
          className="header__right__icon settings"
          onClick={handleTabClick}
        />
        <Image
          src={notificationsIcon}
          alt="notification icon"
          className="header__right__icon"
        />
        <button className="header__right__button">Launch app</button>
      </div>
    </div>
  );
};

export default Header;
