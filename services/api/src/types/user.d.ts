type NewUser = {
  username: string;
  email: string;
  password: string;
};

type ReturnUser = {
  user_id: number;
  email: string;
  username: string;
};

export type { NewUser, ReturnUser };
