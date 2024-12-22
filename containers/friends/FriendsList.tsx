"use client";
import { useGetAllUsersQuery } from "@/provider/redux/services/user";
import { Button, List, Typography, Avatar, Input, Space, GetProps } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddMoreFriendsModal from "./AddMoreFriendsModal";
const { Title } = Typography;

const FriendsListPage = () => {
  const router = useRouter();
  
  const {data, isError, isLoading} = useGetAllUsersQuery();
  console.log(data, isError, isLoading);

  const [isAddMoreFriendsModalOpen, setIsAddMoreFriendsModalOpen] =
    useState<boolean>(false);
  type SearchProps = GetProps<typeof Input.Search>;
  const { Search } = Input;

  const friends = [
    {
      id: "234",
      name: "Kanika",
      status: "you owe",
      amount: "$250.00",
      avatarColor: "#a6a6a6",
    },
    {
      id: "235",
      name: "Shreyansh Garg",
      status: "settled up",
      amount: "",
      avatarColor: "#0066cc",
    },
  ];

  const handleFriendClick = (id: string) => {
    router.push(`/friends/${id}`);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className="bg-custom p-4 pt-0 flex-1">
      {isAddMoreFriendsModalOpen && (
        <AddMoreFriendsModal
          isAddMoreFriendsModalOpen={isAddMoreFriendsModalOpen}
          setIsAddMoreFriendsModalOpen={setIsAddMoreFriendsModalOpen}
        />
      )}
      <h1 className="text-[22px] text-[#fff] font-bold leading-tight tracking-[-0.015em] mt-[3.5rem] mb-6">
        Overall, you owe <span className="text-danger">$250.00</span>
      </h1>

      <div className="custom-input py-5">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Search
            placeholder="Search Friends..."
            allowClear
            onSearch={onSearch}
          />
        </Space>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={friends}
        renderItem={(friend) => (
          <List.Item
            onClick={() => handleFriendClick(friend.id)}
            className="cursor-pointer flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <Avatar
                style={{
                  backgroundColor: friend.avatarColor,
                  verticalAlign: "middle",
                }}
              >
                {friend.name[0]}
              </Avatar>
              <div>
                <p className="text-white text-[16px] leading-normal line-clamp-1">
                  {friend.name}
                </p>
                <p
                  className={`${
                    friend.status === "you owe" ? "text-danger" : "text-success"
                  } text-sm leading-normal line-clamp-1`}
                >
                  {friend.status === "you owe" ? "Owes You" : "Settled Up"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end text-right">
              {friend.amount && <p className="text-danger text-sm">$20</p>}
            </div>
          </List.Item>
        )}
      />

      <div className="text-center mt-6">
        <Button
          onClick={() => setIsAddMoreFriendsModalOpen(true)}
          type="primary"
        >
          Add more friends
        </Button>
      </div>
    </div>
  );
};

export default FriendsListPage;
