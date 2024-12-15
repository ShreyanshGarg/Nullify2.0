import React, { useState } from "react";
import { Modal, Input, Button, Form } from "antd";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import WhoPaidModal from "./whoPaidModal";
import AdjustSplitModal from "./adjustSplitModal";

interface AddExpenseModalProps {
  isAddExpenseModalOpen: boolean;
  setIsExpenseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isAddExpenseModalOpen,
  setIsExpenseModalOpen,
}) => {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedSplitOption, setSelectedSplitOption] =
    useState("split_equally");
  const [isWhoPaidModalOpen, setIsWhoPaidModalOpen] = useState(false);
  const [paidBy, setPaidBy] = useState("Kanika");
  const [paidById, setPaidById] = useState("234");
  const [adjustSplitModal, setAdjustSplitModal] = useState(false);

  const handleConfirm = () => {
    // Add logic for confirming expense
    console.log("Expense:", expense);
    console.log("Amount:", amount);
    console.log("Split Option:", selectedSplitOption);
    setIsExpenseModalOpen(false);
  };

  const updatePaidBy = (name: string, id: string) => {
    setPaidBy(name);
    setPaidById(id);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div>
      {isWhoPaidModalOpen && (
        <WhoPaidModal
          paidById={paidById}
          isWhoPaidModalOpen={isWhoPaidModalOpen}
          setIsWhoPaidModalOpen={setIsWhoPaidModalOpen}
          updatePaidBy={updatePaidBy}
        />
      )}
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
              Add an expense
            </h2>
            <Button
              type="text"
              icon={<CloseOutlined className="text-white" />}
              onClick={() => setIsExpenseModalOpen(false)}
              className="text-white hover:bg-transparent"
            />
          </div>
        }
        open={isAddExpenseModalOpen}
        onCancel={() => setIsExpenseModalOpen(false)}
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
        <div className="space-y-4 p-4 pt-0 ">
          <Form
            className=""
            initialValues={{
              splitOptions: "split_equally",
            }}
            onFinish={onFinish}
          >
            <div className="p-0">
              <Form.Item
                label="Expense"
                name="expense"
                rules={[{ required: true }]}
                className="!mb-2"
              >
                <Input
                  placeholder="What is the expense for?"
                  value={expense}
                  onChange={(e) => setExpense(e.target.value)}
                  className=" h-10 !bg-[#283039] text-white !placeholder-[#9caaba] !border-none"
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true }]}
                className="!mb-2"
              >
                <Input
                  placeholder="₹ 0.00"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-10 !bg-[#283039] text-white !placeholder-[#9caaba] !border-none"
                />
              </Form.Item>
            </div>
          </Form>

          <div className="flex items-center gap-4 bg-custom min-h-[72px] py-2">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="!leading-tight !tracking-[-0.015em] !text-lg font-semibold py-5">
                Paid by
              </h1>
              <div
                className={`flex items-center justify-between ${
                  !amount ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => amount && setIsWhoPaidModalOpen(true)}
              >
                <p className="text-gray text-sm leading-normal line-clamp-1">
                  {paidBy}
                </p>
                <RightOutlined className="text-gray text-sm" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-custom min-h-[72px] py-2">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="!leading-tight !tracking-[-0.015em] !text-lg font-semibold py-5">
                Split
              </h1>
              <div
                className={`flex items-center justify-between ${
                  !amount ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={() => amount && setAdjustSplitModal(true)}
              >
                <p className="text-gray text-sm leading-normal line-clamp-1">
                  Equally
                </p>
                <RightOutlined className="text-gray text-sm" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddExpenseModal;
