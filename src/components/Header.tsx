"use client";

import React from "react";
import "../styles/components/Header.scss";
import Select from "./Select";
import settingsIcon from "../assets/svgs/settings.svg";
import notificationsIcon from "../assets/svgs/notification.svg";
import Image from "next/image";
import { Jazzicon } from "@ukstv/jazzicon-react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { ellipsizeAddress } from "@/utils/helpers/format";

const Header = () => {
  const router = useRouter();
  const { login, authenticated, user, logout } = usePrivy();
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
        {authenticated ? (
          <div className="header__right__user" onClick={logout}>
            <Jazzicon
              address={user?.wallet?.address || ""}
              className="header__right__user__image"
            />
            <span>{ellipsizeAddress(user?.wallet?.address || "")}</span>
          </div>
        ) : (
          <button className="header__right__button" onClick={login}>
            Launch app
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
