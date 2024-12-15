import { Button, List, Typography, Avatar, Input, Space, GetProps } from "antd";
import { useRouter } from "next/navigation";
const { Title } = Typography;

const GroupsListPage = () => {
  const router = useRouter();

  type SearchProps = GetProps<typeof Input.Search>;
  const { Search } = Input;

  const groups = [
    {
      id: "234",
      name: "Group1",
      status: "you owe",
      amount: "$250.00",
      avatarColor: "#a6a6a6",
    },
    {
      id: "235",
      name: "Group2",
      status: "settled up",
      amount: "",
      avatarColor: "#0066cc",
    },
  ];

  const handleGroupClick = (id: string) => {
    router.push(`/groups/${id}`);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className="bg-custom p-4 flex-1 pt-0">
      <Title level={4} className="mt-8">
        Overall, you owe <span className="text-danger">$250.00</span>
      </Title>

      <div className="custom-input py-5">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Search placeholder="Search..." allowClear onSearch={onSearch} />
        </Space>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={groups}
        renderItem={(group) => (
          <List.Item
            onClick={() => handleGroupClick(group.id)}
            className="cursor-pointer flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <Avatar
                style={{
                  backgroundColor: group.avatarColor,
                  verticalAlign: "middle",
                }}
              >
                {group.name[0]}
              </Avatar>
              <div>
                <p className="text-white text-[16px] leading-normal line-clamp-1">
                  {group.name}
                </p>

                <p
                  className={`${
                    group.status === "you owe" ? "text-danger" : "text-success"
                  } text-sm leading-normal line-clamp-1`}
                >
                  {group.status === "you owe" ? "Owes You" : "Settled Up"}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end text-right">
              {group.amount && <p className="text-danger text-sm">$20</p>}
            </div>
          </List.Item>
        )}
      />

      <div className="text-center mt-6">
        <Button type="primary">Start a new group</Button>
      </div>
    </div>
  );
};

export default GroupsListPage;
