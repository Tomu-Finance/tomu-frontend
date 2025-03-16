"use client"

import React from "react"
import "../styles/components/Sidebar.scss"
import logo from "../assets/svgs/logo.svg"
import grid from "../assets/svgs/collapse.svg"
import portfolioIcon from "../assets/svgs/portfolio.svg"
import withdrawIcon from "../assets/svgs/withdrawal.svg"
import depositIcon from "../assets/svgs/deposit.svg"
import exploreIcon from "../assets/svgs/explore.svg"
import Image from "next/image"

import SidebarNavigationTab from "./SidebarNavigationTab"
import { usePrivy } from "@privy-io/react-auth"

const Sidebar = () => {
  const { logout, authenticated } = usePrivy()

  const handleLogout = () => {
    try {
      logout().then(() => (window.location.href = "/sign-in"))
    } catch (error) {
      console.error("Error logging out", error)
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar__brand">
        <Image src={logo} alt="tomu logo" className="sidebar__brand__logo" />
        <Image src={grid} alt="grid icon" className="sidebar__brand__grid" />
      </div>
      <div className="sidebar__navigation">
        <SidebarNavigationTab
          icon={portfolioIcon}
          alt="portfolio icon"
          text="Portfolio"
          route="/"
        />
        <SidebarNavigationTab
          icon={withdrawIcon}
          alt="withdraw icon"
          text="Withdraw"
          route="/withdraw"
        />
        <SidebarNavigationTab
          icon={depositIcon}
          alt="deposit icon"
          text="Deposit"
          route="/deposit"
        />
        <SidebarNavigationTab
          icon={exploreIcon}
          alt="explore icon"
          text="Explore"
          route="/explore"
        />
      </div>

      {/* temporary logout function until logout page is handled */}
      {authenticated && (
        <button type="button" className="" onClick={handleLogout}>
          logout
        </button>
      )}
    </div>
  )
}

export default Sidebar
