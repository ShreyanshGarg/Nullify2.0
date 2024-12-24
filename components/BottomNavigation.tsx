"use client";

import React, { useEffect, useState } from "react";
import {
  UserAddOutlined,
  TeamOutlined,
  LineChartOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNavigation = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";
  const isSignupPage = pathname === "/signup";
  const isLoginPage = pathname === "/login";
  const isForgotPasswordPage = pathname === "/forgot-password";

  const tabs = [
    { key: "groups", label: "Groups", icon: <TeamOutlined />, href: "/groups" },
    {
      key: "friends",
      label: "Friends",
      icon: <UserAddOutlined />,
      href: "/friends",
    },
    {
      key: "activity",
      label: "Activity",
      icon: <LineChartOutlined />,
      href: "/activity",
    },
    {
      key: "account",
      label: "Account",
      icon: <WalletOutlined />,
      href: "/account",
    },
  ];
  if (isAuthPage || isSignupPage || isLoginPage || isForgotPasswordPage) {
    return null;
  }

  const initialActiveTab = tabs.find((tab) => pathname.startsWith(tab.href))?.key || "friends";
  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    const currentTab = tabs.find((tab) => pathname.startsWith(tab.href))?.key || "friends";
    setActiveTab(currentTab);
  }, [pathname]);

  return (
    <div
      className="navigation z-40 fixed bottom-0 w-full border-t border-gray-800 bg-[#283039] flex justify-around
      md:static md:bottom-auto md:w-20 md:h-screen md:flex-col md:border-t-0 md:border-r sm:border-r"
    >
      {tabs.map((tab) => (
        <Link key={tab.key} href={tab.href} passHref>
          <div
            onClick={() => setActiveTab(tab.key)}
            className={`text-center cursor-pointer text-sm py-4 md:py-6 relative ${
              activeTab === tab.key ? "text-[#B57EDC]" : "text-white"
            }`}
          >
            <div className="mb-1">{tab.icon}</div>
            <div>{tab.label}</div>
            {activeTab === tab.key && (
              <div className="absolute md:top-0 md:left-0 md:h-full md:border-l-2 md:border-[#B57EDC]" />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
