import Image from "next/image";
import "../../styles/pages/Settings.scss";
import address from "../../assets/svgs/address.svg";
import copy from "../../assets/svgs/copy.svg";
import passcode from "../../assets/svgs/passcode.svg";
import phraseIcon from "../../assets/svgs/key.svg";

export default function Settings() {
  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-page___address">
        <div className="settings-page___first">
          <div className="address-logo">
            <Image src={address} alt="address-logo" />
          </div>
          <h2>Wallet address:</h2>
          <div className="copy-logo">
            <p>0x72eBDcd...5ebCa3656F8559F2C073</p>
            <Image src={copy} alt="copy-logo" />
          </div>

          <div className="settings-page___buttons">
            <div className="copy-logo-two">
              <Image src={passcode} alt="passcode-icon" />
              <p>Update passcode</p>
            </div>
            <div className="copy-logo-two">
              <Image src={phraseIcon} alt="passcode-icon" />
              <p>Secret phrase and Private Key</p>
            </div>
          </div>
        </div>

        <h3>Log out</h3>
      </div>
    </div>
  );
}
