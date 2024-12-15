import { Avatar, Button, Checkbox, Input, List, Modal, Tabs } from "antd";
import {
  CloseOutlined,
  WalletOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import SettleUpModal from "../../components/SettleUpModal";

interface AdjustSplitModalProps {
  isAdjustSplitModalOpen: boolean;
  setIsAdjustSplitModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdjustSplitModal: React.FC<AdjustSplitModalProps> = ({
  isAdjustSplitModalOpen,
  setIsAdjustSplitModalOpen,
}) => {
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

  const [showSettleUpModal, setShowSettleUpModal] = useState(false);
  const [activeKey, setActiveKey] = useState("1"); // Set the default active key

  const handleTabChange = (key: string) => {
    setActiveKey(key); // Update active tab on change
  };

  return (
    <div>
      {showSettleUpModal && (
        <SettleUpModal
          isSettleUpModalOpen={showSettleUpModal}
          setIsSettleUpModalOpen={setShowSettleUpModal}
        />
      )}
      <Modal
        title={
          <div className="bg-[#111418] p-4 pb-0 flex items-center justify-between">
            <h2 className="!leading-tight !tracking-[-0.015em] !text-lg font-bold">
              Adjust Split
            </h2>
            <Button
              type="text"
              icon={<CloseOutlined className="text-white" />}
              onClick={() => setIsAdjustSplitModalOpen(false)}
              className="text-white hover:bg-transparent"
            />
          </div>
        }
        open={isAdjustSplitModalOpen}
        onCancel={() => setIsAdjustSplitModalOpen(false)}
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
        <div className="space-y-4 pl-4 pr-6 pt-0 pb-16">
          <Tabs
            defaultActiveKey="1"
            activeKey={activeKey}
            onChange={handleTabChange}
            items={[
              {
                key: "1",
                label: "Equally",
                icon: <WalletOutlined />,
                children: (
                  <div>
                    <div className="text-center">
                      <div className="m-6">
                        <p className="text-white text-md leading-normal">
                          Split Equally
                        </p>
                        <p className="text-gray text-sm leading-normal break-words">
                          Distribute the amount equally among the selected
                          individuals.
                        </p>
                      </div>
                      <List
                        itemLayout="horizontal"
                        dataSource={friends}
                        renderItem={(friend) => (
                          <List.Item className="cursor-pointer flex justify-between items-center">
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
                            <Checkbox />
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                ),
              },
              {
                key: "2",
                label: "Unequally",
                icon: <CalculatorOutlined />,
                children: (
                  <div>
                    <div className="text-center">
                      <div className="m-6">
                        <p className="text-white text-md leading-normal">
                          Split by exact amounts
                        </p>
                        <p className="text-gray text-sm leading-normal break-words">
                          Assign specific amounts to each individual based on
                          their share.
                        </p>
                      </div>
                      <List
                        itemLayout="horizontal"
                        dataSource={friends}
                        renderItem={(friend) => (
                          <List.Item className="cursor-pointer flex justify-between items-center">
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
                            <Input
                              placeholder="₹ 0.00"
                              className="h-7 !w-20 !bg-[#283039] text-white !placeholder-[#9caaba] border-0 border-b border-gray-500 focus:border-b-white focus:ring-0"
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                ),
              },
            ]}
          />
          <div
            className="fixed bottom-0 left-0 w-full bg-[#111418] p-4"
            style={{ maxWidth: "480px", margin: "0 auto" }}
          >
            <div className="text-center m-4">
              <p className="text-white text-md leading-normal">
                ₹0.00 of ₹0.00
              </p>
              <p className="text-gray text-sm leading-normal break-words">
                ₹0.00 left.
              </p>
            </div>
            <Button
              className="!bg-[#B57EDC] !border-[#283039] w-full"
              onClick={() => console.log("Add Expense clicked")}
            >
              Add Expense
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdjustSplitModal;
