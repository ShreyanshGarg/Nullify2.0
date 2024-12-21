import { Avatar, Button, List, Modal } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import PaidAmountsModal from "./PaidAmountsModal";

interface WhoPaidModalProps {
  isWhoPaidModalOpen: boolean;
  setIsWhoPaidModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updatePaidBy: (name: string, id: string) => void;
  paidById: string;
}

const WhoPaidModal: React.FC<WhoPaidModalProps> = ({
  isWhoPaidModalOpen,
  setIsWhoPaidModalOpen,
  updatePaidBy,
  paidById,
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

  const [paidAmountsModal, setPaidAmountsModal] = useState(false);

  const handleSelectFriend = (id: string, name: string) => {
    updatePaidBy(name, id);
    setIsWhoPaidModalOpen(false);
  };

  useEffect(() => {
    console.log("Selected Friend ID:", paidById);
  }, [paidById]);

  return (
    <div>
      {paidAmountsModal && (
        <PaidAmountsModal
          isPaidAmountsModalOpen={paidAmountsModal}
          setIsPaidAmountsModalOpen={setPaidAmountsModal}
        />
      )}
      <Modal
        title={
          <div className="bg-[#111418] p-4 pb-0 flex items-center justify-between">
            <h2 className="!leading-tight !tracking-[-0.015em] !text-lg font-bold">
              Who Paid?
            </h2>
            <Button
              type="text"
              icon={<CloseOutlined className="text-white" />}
              onClick={() => setIsWhoPaidModalOpen(false)}
              className="text-white hover:bg-transparent"
            />
          </div>
        }
        open={isWhoPaidModalOpen}
        onCancel={() => setIsWhoPaidModalOpen(false)}
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
              <List.Item
                onClick={() => handleSelectFriend(friend.id, friend.name)}
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

                {/* Tick icon for selected user */}
                <div className="flex flex-col items-end text-right">
                  {paidById === friend.id && (
                    <CheckOutlined className="text-green-500 text-lg" />
                  )}
                </div>
              </List.Item>
            )}
          />
        </div>
        <Button
          className="m-6 !bg-[#283039] !border-[#283039]"
          onClick={() => setPaidAmountsModal(true)}
        >
          Multiple people
        </Button>
      </Modal>
    </div>
  );
};

export default WhoPaidModal;
