import React, { useState, useCallback } from "react";
import { Avatar, Button, List, Modal, Space, Input } from "antd";
import { CloseOutlined, CheckOutlined, ArrowRightOutlined } from "@ant-design/icons";
import CreateGroupModal from "./CreateGroupModal";

interface AddGroupMembersProps {
  isAddGroupMembersOpen: boolean;
  setIsAddGroupMembersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Friend {
  id: string;
  name: string;
  status?: string;
  amount?: string;
  avatarColor: string;
}

const AddGroupMembers: React.FC<AddGroupMembersProps> = ({
  isAddGroupMembersOpen,
  setIsAddGroupMembersOpen,
}) => {
  const { Search } = Input;

  const friends: Friend[] = [
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
    {
      id: "236",
      name: "Anjali",
      status: "settled up",
      amount: "",
      avatarColor: "#a6a6a6",
    },
    {
      id: "236",
      name: "Anjali",
      status: "settled up",
      amount: "",
      avatarColor: "#a6a6a6",
    },
  ];

  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  const handleSelectFriend = useCallback(
    (friend: Friend) => {
      setSelectedFriends((prevSelected) => {
        const isAlreadySelected = prevSelected.some(
          (selected) => selected.id === friend.id
        );
        if (isAlreadySelected) {
          return prevSelected.filter((selected) => selected.id !== friend.id);
        } else {
          return [
            ...prevSelected,
            { id: friend.id, name: friend.name, avatarColor: friend.avatarColor },
          ];
        }
      });
    },
    []
  );

  const onSearch = (value: string) => console.log(value);

  return (
    <div>
      {showCreateGroupModal && (
        <CreateGroupModal
          selectedFriends={selectedFriends}
          isCreateGroupModalOpen={showCreateGroupModal}
          setIsCreateGroupModalOpen={setShowCreateGroupModal}
          setIsAddGroupMembersOpen={setIsAddGroupMembersOpen}
        />
      )}
      <Modal
        title={
          <div className="bg-[#111418] p-4 pb-0 flex items-center justify-between">
            <h2 className="!leading-tight !tracking-[-0.015em] !text-lg font-bold">
              Add Group Members
            </h2>
            <Button
              type="text"
              icon={<CloseOutlined className="text-white" />}
              onClick={() => setIsAddGroupMembersOpen(false)}
              className="text-white hover:bg-transparent"
            />
          </div>
        }
        open={isAddGroupMembersOpen}
        onCancel={() => setIsAddGroupMembersOpen(false)}
        footer={null}
        style={{
          backgroundColor: "#111418",
          top: 0,
          margin: 0,
          maxWidth: "100vw",
          height: "100vh",
          maxHeight: "100vh",
        }}
        className="expense-modal"
        closable={false}
        maskClosable={false}
      >
        <div className="space-y-4 pl-4 pr-6 pt-0">
          <div className="custom-input py-5">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Search
                placeholder="Search your friends..."
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
                onClick={() => handleSelectFriend(friend)}
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
                    <p className="text-white text-[15px] leading-normal line-clamp-1">
                      {friend.name}
                    </p>
                  </div>
                </div>

                {selectedFriends.some(
                  (selected) => selected.id === friend.id
                ) && <CheckOutlined className="text-green-500 text-lg" />}
              </List.Item>
            )}
          />
        </div>
        <div className="p-6 flex justify-end">
          <Button
            className="!bg-[#B57EDC] !border-[#283039]"
            onClick={() => setShowCreateGroupModal(true)}
            disabled={selectedFriends.length === 0}
          >
            Next
            <ArrowRightOutlined />
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddGroupMembers;
