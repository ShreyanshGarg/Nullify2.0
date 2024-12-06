"use client";

import FriendsPage from "@/containers/friends/FriendsList";
import { Button, List, Typography, Avatar } from "antd";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function Page() {
  return <FriendsPage />;
}
