import { Button, List, Typography, Avatar } from "antd";
import { useRouter } from "next/navigation";
const { Title } = Typography;

const FriendsPage = () => {
    const router = useRouter();
  
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
  
    const handleFriendClick = (id: string) => {
      router.push(`/friends/${id}`);
    };
  
    return (
      <div className="bg-custom p-4 flex-1">
        <Title level={4}>
          Overall, you owe <span className="text-danger">$250.00</span>
        </Title>
  
        <List
          itemLayout="horizontal"
          dataSource={friends}
          renderItem={(friend) => (
            <List.Item onClick={() => handleFriendClick(friend.id)} className="cursor-pointer">
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: friend.avatarColor,
                      verticalAlign: "middle",
                    }}
                  >
                    {friend.name[0]}
                  </Avatar>
                }
                title={<div className="text-white text-md">{friend.name}</div>}
                description={
                  <div
                    className={friend.status === "you owe" ? "text-danger" : "text-success"}
                  >
                    {friend.status}
                  </div>
                }
              />
              {friend.amount && <div className="text-danger text-md">{friend.amount}</div>}
            </List.Item>
          )}
        />
  
        <div className="text-center mt-6">
          <Button type="primary">
            Add more friends
          </Button>
        </div>
      </div>
    );
  };
  
  export default FriendsPage;
  