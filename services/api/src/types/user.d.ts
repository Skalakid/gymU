type NewUser = {
  username: string;
  email: string;
  password: string;
};

type ReturnUser = {
  userId: number;
  email: string;
  username: string;
};

type BaseUser = {
  userId: number;
  username: string;
};

export type { NewUser, ReturnUser, BaseUser };
