import { Avatar, Button } from "antd";
import { ArrowLeftOutlined, CalendarOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";
import SelectBalanceModal from "./SelectBalanceModal";
import { useParams } from "next/navigation";
import { useFetchSingleGroupQuery } from "@/provider/redux/services/group";

const GroupsViewPage = () => {
  const router = useRouter();
  const params = useParams();
  const group_id = params.id;
  const [isAddExpenseModalOpen, setIsExpenseModalOpen] =
    useState<boolean>(false);
  const [isSelectBalanceModalOpen, setIsSelectBalanceModalOpen] =
    useState<boolean>(false);
  console.log(group_id);
  const { data: group, isLoading } = useFetchSingleGroupQuery(
    parseInt(group_id),
    {
      skip: !group_id,
    }
  );
  console.log(group);

  const handleBackClick = () => {
    router.push("/groups");
  };

  return (
    <>
      {isAddExpenseModalOpen && (
        <AddExpenseModal
          isAddExpenseModalOpen={isAddExpenseModalOpen}
          setIsExpenseModalOpen={setIsExpenseModalOpen}
          group={group}
        />
      )}

      {isSelectBalanceModalOpen && (
        <SelectBalanceModal
          isSelectBalanceModalOpen={isSelectBalanceModalOpen}
          setIsSelectBalanceModalOpen={setIsSelectBalanceModalOpen}
        />
      )}

      <div className="text-white flex-1 flex flex-col pt-0">
        <div>
          <div className="flex items-center bg-custom p-4 pb-0 justify-between">
            <ArrowLeftOutlined
              className="text-white"
              onClick={handleBackClick}
            />
          </div>
          <div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center">
                <h1 className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-[#B57EDC]">
                  {group?.name}
                </h1>
                <p className="text-gray text-base font-normal">$0.00</p>
              </div>
              <Button
                type="primary"
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 !bg-[#283039] text-white text-sm font-bold leading-normal tracking-[0.015em] w-50 max-w-[480px]"
              >
                Pay
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-custom px-4 min-h-[72px] py-2 justify-between">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-start">
                <div className="text-gray text-sm">
                  Dec <br />
                  08
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-white text-md leading-normal line-clamp-1">
                  Dinner
                </p>
                <p className="text-danger text-sm leading-normal line-clamp-1">
                  You Owe
                </p>
              </div>
            </div>
            <p className="text-danger text-sm">$20</p>
          </div>
          <div className="flex items-center gap-4 bg-custom px-4 min-h-[72px] py-2 justify-between">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-start">
                <div className="text-gray text-sm">
                  Dec <br />
                  08
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-white text-md leading-normal line-clamp-1">
                  Dinner
                </p>
                <p className="text-success text-sm leading-normal line-clamp-1">
                  Owes You
                </p>
              </div>
            </div>
            <p className="text-success text-sm">$20</p>
          </div>
        </div>
        <div className="fixed bottom-20 left-0 w-full flex flex-col gap-3 p-4 bg-custom max-w-[480px] mx-auto">
          <Button
            type="primary"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 text-white text-base font-bold leading-normal tracking-[0.015em] w-full"
            onClick={() => setIsSelectBalanceModalOpen(true)}
          >
            Settle Up
          </Button>
          <Button
            className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-xl h-10 px-4 !bg-[#283039] !border-[#283039] !text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px]"
            onClick={() => setIsExpenseModalOpen(true)}
          >
            Add Expense
          </Button>
        </div>
      </div>
    </>
  );
};

export default GroupsViewPage;
