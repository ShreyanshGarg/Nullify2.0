interface User {
  user_id1: string;
  user_id2: string;
  email: string;
  name: string;
  status?: string;
  avatarColor?: string;
}

interface Friend {
  id?: string;
  user_id1: string;
  user_id2: string;
  name: string;
  status?: string;
  amount?: string;
  avatarColor?: string;
}

interface Group {
  group_id: string;
  name: string;
  simplify_debt: boolean;
  member_details: GroupMemberDetails;
}

interface GroupMemberDetails {
  [key: string]: {
    amount: number;
  };
}

export type { User, Friend, GroupMemberDetails, Group };
