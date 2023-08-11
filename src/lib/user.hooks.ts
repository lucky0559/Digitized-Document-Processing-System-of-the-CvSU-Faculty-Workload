import ReactS3Client from "react-aws-s3-typescript";
import axios from "../api/axios";
import { eSignatureAwsConfig } from "../constants/Defaults";
import { ESignature } from "../types/ESignature";
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

export const VerifyEmail = async (token?: string) => {
  const { data } = await axios.get(`user/verify/${token}`);
  return { data };
};

export const GetUser = async (userId: string) => {
  const { data } = await axios.get<User>(`user/${userId}`);
  return data;
};

export const EditUserProfile = async (id: string | null, user?: User) => {
  const { data } = await axios.patch(`user/${id}/update-profile`, user);
  return { data };
};

export const UploadESignature = async (
  eSignature?: ESignature,
  eSignatureFile?: File
) => {
  const eSignatureS3 = new ReactS3Client(eSignatureAwsConfig);
  try {
    const eSignatureFileUpload = await eSignatureS3.uploadFile(eSignatureFile!);
    eSignature!.eSignatureFilePath = eSignatureFileUpload.location;
    eSignature!.fileName = eSignatureFileUpload.key;
    const { data } = await axios.post("user/e-signature", eSignature);
    if (data) {
      await eSignatureS3.deleteFile(data.fileName);
    }
    return { data };
  } catch {
    // do nothing
  }
};

export const CheckESignature = async (userId: string) => {
  const { data } = await axios.get(`user/${userId}/check-e-signature`);
  return { data };
};

export const ChangePassword = async (
  username: string,
  oldPassword: string,
  password: string
) => {
  const { data } = await axios.patch(
    `user/${username}/${oldPassword}/${password}/change-password`
  );
  return { data };
};

export const ChangeUserRole = async (id: string, role: string) => {
  const { data } = await axios.patch(`user/${id}/${role}/change-role`);
  return { data };
};

export const GetAllUser = async () => {
  const { data } = await axios.get("/user");
  return { data };
};

export const SendResetPasswordLink = async (email: string) => {
  const { data } = await axios.post(`user/${email}/reset-password`);
  return { data };
};

export const FindUserByPasswordCode = async (passwordCode: string) => {
  const { data: user } = await axios.get(
    `user/${passwordCode}/find-by-passwordResetCode`
  );
  return { user };
};

export const ResetChangePassword = async (
  username: string,
  password: string
) => {
  const { data } = await axios.patch(
    `user/${username}/${password}/reset-change-password`
  );
  return { data };
};
