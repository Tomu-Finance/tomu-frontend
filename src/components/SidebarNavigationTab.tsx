'use client';

import Image from 'next/image';
import React from 'react';
import '../styles/components/Sidebar.scss';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarNavigationTabProps {
  icon: string;
  alt: string;
  text: string;
  route: string;
}

const SidebarNavigationTab = ({
  icon,
  alt,
  text,
  route,
}: SidebarNavigationTabProps) => {
  const router = useRouter();
  const pathName = usePathname();

  const handleTabClick = (route: string) => {
    router.push(route);
  };

  return (
    <div
      className={`sidebar__navigation__tab ${
        pathName === route ? 'active' : ''
      }`}
      onClick={() => handleTabClick(route)}
    >
      <Image src={icon} alt={alt} className="sidebar__navigation__tab__icon" />
      <p className="sidebar__navigation__tab__text">{text}</p>
    </div>
  );
};

export default SidebarNavigationTab;
