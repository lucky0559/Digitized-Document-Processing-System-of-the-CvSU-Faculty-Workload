import axios from "../api/axios";
import { User } from "../types/User";

export const Register = async (user: User) => {
  const { data } = await axios.post("user/register", user);
  return { data };
};
