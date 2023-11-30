export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UserRegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
