import React from "react";
import { Avatar, Badge } from "antd";
import { BellOutlined, BellFilled } from "@ant-design/icons";

interface TopNavigationProps {
  userName: string;
  avatarColor: string;
  notificationCount: number;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ userName, avatarColor, notificationCount }) => {
  return (
    <div className="flex justify-between items-center p-4 absolute top-0 right-0 left-0 z-10 bg-[#B57EDC]">
      {/* Profile Section */}
      <div className="flex items-center gap-2">
        <Avatar style={{ backgroundColor: avatarColor }} size="large">
          {userName[0]}
        </Avatar>
        <span className="text-white text-lg">{userName}</span>
      </div>

      {/* Notification Section */}
      <div className="flex items-center gap-4">
        <Badge count={notificationCount} size="small" style={{ backgroundColor: '#f5222d' }}>
        <BellFilled className="text-xl" style={{ color: '#ffd32c'}} />
        </Badge>
      </div>
      {/* <div className="flex items-center gap-4">
        <Signou className="text-xl" style={{ color: '#ffd32c'}} />
      </div> */}
    </div>
  );
};

export default TopNavigation;
