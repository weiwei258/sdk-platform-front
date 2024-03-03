import { Authorization } from "@/constants";
import { cookies } from "next/headers";

export const getToken =()=>{
  return cookies().get(Authorization)?.value;
}

