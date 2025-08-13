export type LoginPayload = {
  identifier: string;
  password: string;
  requestRefresh: boolean;
};

export type JwtPayload = {
  exp: number;
};

export type LoginResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type Address = {
  district: string;
  province: string;
  post_code: string;
  address_detail: string;
};

export type Fullname = {
  first_name: string;
  last_name: string;
};

export type User = {
  id: number;
  documentId: string;
  username: string;
  email: string;
  name: Fullname;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  phone_number: string;
  dob: Date;
};

export type AuthResponse = {
  jwt: string;
  user: User;
  refreshToken: string;
};

export type ParsedAddress = {
  post_code: string;
  address_detail: string;
  district: string;
  province: string;
};
