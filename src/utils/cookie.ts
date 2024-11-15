"use server";
import { cookies } from "next/headers";

export const getCookie = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("userToken")?.value;
  return token;
};