'use client'
import React from "react";
import { Card, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import FriendsViewPage from "@/containers/friends/FriendsView";

export default function Page() {
  return <FriendsViewPage />;
}