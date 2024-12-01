type User = {
  userId: number;
  email: string;
  username: string;
  description: string | null;
};

type UserDetails = {
  userId: number;
  email?: string;
  username: string;
  description: string | null;
};
