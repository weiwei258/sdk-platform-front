"use client";

import { useRouter } from "next/navigation";
import { ResourceLog } from "./dataSnap.api";

export const View = ({ data }: { data: ResourceLog[] }) => {
  const router = useRouter()
  console.info({ data })

  return (
    <div onClick={() => {
      router.push('/8848/dataSnap')
    }}>
      view
    </div>)
}
