import React, { useState } from "react";
import { Modal, Input, Button, Form, Checkbox, Avatar } from "antd";
import { CloseOutlined, CheckOutlined, TeamOutlined } from "@ant-design/icons";
import AdjustSplitModal from "./AdjustSplitModal";

interface Friend {
  id: string;
  name: string;
  avatarColor: string;
}

interface CreateGroupModalProps {
  isCreateGroupModalOpen: boolean;
  setIsCreateGroupModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFriends: Friend[];
  setIsAddGroupMembersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isCreateGroupModalOpen,
  setIsCreateGroupModalOpen,
  setIsAddGroupMembersOpen,
  selectedFriends,
}) => {
  console.log(selectedFriends);
  const [adjustSplitModal, setAdjustSplitModal] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formData = {
      ...values,
      selectedFriends,
    };
    console.log("Form submitted with values:", formData);
    setIsCreateGroupModalOpen(false);
    setIsAddGroupMembersOpen(false);
  };

  return (
    <div>
      {adjustSplitModal && (
        <AdjustSplitModal
          isAdjustSplitModalOpen={adjustSplitModal}
          setIsAdjustSplitModalOpen={setAdjustSplitModal}
        />
      )}
      <Modal
        title={
          <div className="bg-[#111418] p-4 pb-0 flex items-center justify-between">
            <h2 className="!leading-tight !tracking-[-0.015em] !text-xl font-bold">
              Create Group
            </h2>
            <Button
              type="text"
              icon={<CloseOutlined className="text-white" />}
              onClick={() => setIsCreateGroupModalOpen(false)}
              className="text-white hover:bg-transparent"
            />
          </div>
        }
        open={isCreateGroupModalOpen}
        onCancel={() => setIsCreateGroupModalOpen(false)}
        footer={null}
        style={{
          backgroundColor: "#111418",
          top: 0,
          margin: 0,
          maxWidth: "100vw",
          maxHeight: "100vh",
          height: "100vh",
        }}
        className="expense-modal"
        closable={false}
        maskClosable={false}
      >
        <div className="space-y-4 p-4 pt-0 mt-6">
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={{
              simplify_debt: true,
            }}
          >
            <div className="p-0">
              {/* Group Name */}
              <Form.Item
                label="Group Name"
                name="group_name"
                rules={[
                  { required: true, message: "Please enter your group name" },
                ]}
                className="!mb-2"
              >
                <Input
                  placeholder="Please enter your group name?"
                  className="h-10 !bg-[#283039] text-white !placeholder-[#9caaba] !border-none"
                />
              </Form.Item>

              {/* Simplify Debt Checkbox */}
              <div className="mt-4">
                <Form.Item
                  name="simplify_debt"
                  valuePropName="checked"
                  className="!mb-2"
                >
                  <Checkbox>
                    <span className="text-white">Simplify Debt</span>
                  </Checkbox>
                </Form.Item>
              </div>

              {/* Selected Friends Info */}
              <p className="text-gray text-sm leading-normal break-words mt-8">
                You have selected {selectedFriends.length} friends:
              </p>
              <ul className="text-white list-none flex flex-wrap gap-4 mt-8">
                {selectedFriends.map((friend) => (
                  <li key={friend.id} className="flex flex-col items-center">
                    <Avatar
                      style={{
                        backgroundColor: friend.avatarColor,
                        verticalAlign: "middle",
                      }}
                    >
                      {friend.name[0]}
                    </Avatar>
                    <p className="text-gray text-sm leading-normal mt-2 overflow-hidden text-ellipsis whitespace-nowrap max-w-[9ch]">
                      {friend.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Form>
        </div>

        <div className="p-6 flex justify-center">
          <Button
            className="!bg-[#B57EDC] !border-[#283039]"
            onClick={() => form.submit()}
          >
            Create Group
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateGroupModal;
