"use server";

import { ImageResponse } from "next/server";
import { UserBackend } from "../models/userBackendModel";
import { UserInfoModel } from "../models/userInfoModel";
import { backendInstance } from "./backendInstance";

export const createNewUser = async (params: UserBackend) => {
  const promise = await backendInstance.post('/users', params);
  const { data } = promise;
  return data;
}

export const getUserInfo = async () => {
  const { data } = await backendInstance.get('/users/me');
  return data.data as UserInfoModel;
}

export const uploadProfilePhoto = async (formData: FormData) => {
  const { status } = await backendInstance.post('/users/upload', formData,
    { headers: { 'Content-Type': 'multipart/form-data' } });

  return status == 201;
}

export const downloadProfilePhoto = async (fileName: string) => {
  const { data } = await backendInstance.get(`/users/download/${fileName}`);
  return data.data as string;
}