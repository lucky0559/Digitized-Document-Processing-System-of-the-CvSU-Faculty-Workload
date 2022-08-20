import axios from "../api/axios";
import { User } from "../types/User";

export type LoginDTO = {
  username: string;
  password: string;
};

export const Register = async (user: User) => {
  const { data } = await axios.post("user/register", user);
  return { data };
};

export const Login = async (user: LoginDTO) => {
  const { data, request } = await axios.get(
    `user/${user.username}/${user.password}/login`
  );
  return { data, request };
};
