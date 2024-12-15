import { Avatar, Button, Input, List, Modal } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import AdjustSplitModal from "./AdjustSplitModal";

interface PaidAmountsModalProps {
  isPaidAmountsModalOpen: boolean;
  setIsPaidAmountsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaidAmountsModal: React.FC<PaidAmountsModalProps> = ({
  isPaidAmountsModalOpen,
  setIsPaidAmountsModalOpen,
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

  const [adjustSplitModal, setAdjustSplitModal] = useState(false);

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
            <h2 className="!leading-tight !tracking-[-0.015em] !text-lg font-bold">
              Enter Paid Amounts
            </h2>
            <Button
              type="text"
              icon={<CloseOutlined className="text-white" />}
              onClick={() => setIsPaidAmountsModalOpen(false)}
              className="text-white hover:bg-transparent"
            />
          </div>
        }
        open={isPaidAmountsModalOpen}
        onCancel={() => setIsPaidAmountsModalOpen(false)}
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

export default PaidAmountsModal;
