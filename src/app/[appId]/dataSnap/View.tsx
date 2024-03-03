"use client";

import { useRouter } from "next/navigation";
import { ResourceLog } from "./dataSnap.api";
import JSONView from 'react-json-view';

export const View = ({ data }: { data: ResourceLog[] }) => {
  const router = useRouter()
  console.info({ data })

  return (
    <JSONView src={data} />
  )
}
