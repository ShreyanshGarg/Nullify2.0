import { Button, Form, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface AddMoreFriendsModalProps {
  isAddMoreFriendsModalOpen: boolean;
  setIsAddMoreFriendsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMoreFriendsModal: React.FC<AddMoreFriendsModalProps> = ({
  isAddMoreFriendsModalOpen,
  setIsAddMoreFriendsModalOpen,
}) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  return (
    <div>
      <Modal
        title={
          <div className="bg-[#111418] p-4 pb-0 flex items-center justify-between">
            <h2 className="!leading-tight !tracking-[-0.015em] !text-xl font-bold">
              Add your friend
            </h2>
            <Button
              type="text"
              icon={<CloseOutlined className="text-white" />}
              onClick={() => setIsAddMoreFriendsModalOpen(false)}
              className="text-white hover:bg-transparent"
            />
          </div>
        }
        open={isAddMoreFriendsModalOpen}
        onCancel={() => setIsAddMoreFriendsModalOpen(false)}
        footer={null}
        style={{
          maxHeight: "50vh",
          height: "50vh",
          top: 120,
        }}
        className="expense-modal"
        closable={false}
      >
        <div className="bg-custom p-4 pt-0 flex-1 pb-10">
          <Form onFinish={onFinish}>
            <Form.Item
              label="Email Id"
              name="email_id"
              rules={[{ required: true }]}
              className="!mb-2"
            >
              <input
                placeholder="What is the email of your friend?"
                className="p-2 h-10 w-[100%] !bg-[#283039] text-white !placeholder-[#9caaba] !border-none rounded-md"
              />
            </Form.Item>
            <Button
              type="primary"
              className="w-full h-12 mt-4 mt-10"
              htmlType="submit"
            >
              Send Request
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default AddMoreFriendsModal;
