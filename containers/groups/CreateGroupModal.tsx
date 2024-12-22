import React, { useState } from "react";
import { Modal, Input, Button, Form, Checkbox } from "antd";
import { CloseOutlined, RightOutlined, CheckOutlined } from "@ant-design/icons";
import WhoPaidModal from "./WhoPaidModal";
import AdjustSplitModal from "./AdjustSplitModal";

interface CreateGroupModalProps {
  isCreateGroupModalOpen: boolean;
  setIsCreateGroupModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFriends: string[];
  setIsAddGroupMembersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isCreateGroupModalOpen,
  setIsCreateGroupModalOpen,
  setIsAddGroupMembersOpen,
  selectedFriends,
}) => {
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
          <Form form={form} onFinish={onFinish}>
            <div className="p-0">
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
                  className=" h-10 !bg-[#283039] text-white !placeholder-[#9caaba] !border-none"
                />
              </Form.Item>
              <p className="text-gray text-sm leading-normal break-words mt-2">
                You have selected {selectedFriends.length} friends.
              </p>
              <div className="mt-6">
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
            </div>
          </Form>
        </div>

        <div className="p-6 flex justify-end">
          <Button
            className="!bg-[#B57EDC] !border-[#283039]"
            onClick={() => form.submit()}
          >
            Done
            <CheckOutlined />
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateGroupModal;
