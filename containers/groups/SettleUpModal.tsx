import React, { useState } from "react";
import {
    Modal,
    Input,
    DatePicker,
    Button,
    Form,
    ConfigProvider,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface SettleUpModalProps {
    isSettleUpModalOpen: boolean;
    setIsSettleUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettleUpModal: React.FC<SettleUpModalProps> = ({
    isSettleUpModalOpen,
    setIsSettleUpModalOpen,
}) => {
    const [amount, setAmount] = useState("");

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    return (
        <Modal
            title={
                <div className="bg-[#111418] p-4 pb-0 flex items-center justify-between">
                    <h2 className="!leading-tight !tracking-[-0.015em] !text-xl font-bold">
                        Record Payment
                    </h2>
                    <Button
                        type="text"
                        icon={<CloseOutlined className="text-white" />}
                        onClick={() => setIsSettleUpModalOpen(false)}
                        className="text-white hover:bg-transparent"
                    />
                </div>
            }
            open={isSettleUpModalOpen}
            onCancel={() => setIsSettleUpModalOpen(false)}
            footer={null}
            style={{
                backgroundColor: "#111418",
                margin: "0 20px", // Add margin on the left and right
                maxWidth: "calc(100vw - 40px)", // Make sure the modal doesn't overflow the screen with the added margin
            }}
            className="expense-modal"
            closable={false}
        >
            <div className="space-y-4 p-4 pt-0 ">
                <Form
                    className=""
                    onFinish={onFinish}
                >

                    <div>
                        <Form.Item
                            label="Amount"
                            name="amount"
                            rules={[{ required: true }]}
                            className="!mb-2"
                        >
                            <Input
                                placeholder="$0.00"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="h-10 !bg-[#283039] text-white !placeholder-[#9caaba] !border-none"
                            />
                        </Form.Item>
                    </div>
                    <ConfigProvider
                        theme={{
                            components: {
                                DatePicker: {
                                    colorBgContainer: "#283039",
                                    colorTextHeading: "black",
                                    colorBgBase: "#9caaba",
                                    colorText: "black",
                                    colorPrimaryText: "white",
                                    colorTextPlaceholder: "#9caaba",
                                    borderRadius: 6,
                                    controlHeight: 32,
                                    colorBorder: "transparent",
                                    colorPrimaryHover: "#0b6cda",
                                    colorPrimary: "#0b6cda",
                                    algorithm: true,
                                },
                            },
                        }}
                    >
                        <Form.Item
                            label="Date"
                            name="date"
                            rules={[{ required: true }]}
                            className="!mb-6"
                        >
                            <DatePicker
                                placeholder="Select a date"
                                className="h-10 w-full !bg-[#283039] !text-white !border-none "
                                format="YYYY-MM-DD"
                                inputReadOnly
                            />
                        </Form.Item>
                    </ConfigProvider>
                    <Form.Item label={null}>
                        <Button
                            type="primary"
                            className="w-full h-12 mt-4"
                            htmlType="submit"
                        >
                            Settle Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>

    );
};

export default SettleUpModal;
