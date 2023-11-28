import { Authorization } from "@/constants";
import { cookies, headers } from "next/headers";

export const getToken =()=>{
  return cookies().get(Authorization)?.value;
}

export const getPathname = ()=>{
  const headersList = headers();
  return headersList.get("x-invoke-path") || "";
}

