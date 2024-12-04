import { Card, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const FriendsViewPage = () => {
    const router = useRouter();
  
    const handleBackClick = () => {
      router.push("/friends");
    };
    return (
      <div className="text-white min-h-screen flex flex-col justify-between">
        <div>
          <div className="flex items-center bg-custom p-4 pb-2 justify-between">
            <ArrowLeftOutlined className="text-white" onClick={handleBackClick}/>
          </div>
          <div className="p-4">
            <div className="flex flex-col items-center gap-4">
              {/* <div className="bg-cover bg-center bg-no-repeat rounded-full w-32 h-32"></div> */}
              <div className="flex flex-col items-center">
                <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em]">
                  Sophia Hall
                </h1>
                <p className="text-gray text-base font-normal">$0.00</p>
              </div>
              <Button
                type="primary"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 !bg-[#283039] text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px]"
              >
                Pay
              </Button>
            </div>
          </div>
          <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            You Owe
          </h3>
          <div className="flex text-danger items-center gap-4 bg-custom px-4 min-h-[72px] py-2 justify-between">
            <div className="flex flex-col justify-center">
              <p className="text-base font-medium leading-normal line-clamp-1">
                Dinner
              </p>
              <p className="text-gray text-sm font-normal leading-normal line-clamp-2">
                Jan 15
              </p>
            </div>
            <p className="text-base font-normal">$20</p>
          </div>
          <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Owes You
          </h3>
          <div className="flex text-success  items-center gap-4 bg-custom px-4 min-h-[72px] py-2 justify-between">
            <div className=" flex flex-col justify-center">
              <p className=" text-base font-medium leading-normal line-clamp-1">
                Dinner
              </p>
              <p className="text-gray text-sm font-normal leading-normal line-clamp-2">
                Jan 15
              </p>
            </div>
            <p className="text-base font-normal">$20</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-24">
            <Button
              type="primary"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5  text-white text-base font-bold leading-normal tracking-[0.015em] w-full"
            >
              Settle Up
            </Button>
            <Button className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-xl h-10 px-4 !bg-[#283039] !border-[#283039] !text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px]">
              Add Expense
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default FriendsViewPage;