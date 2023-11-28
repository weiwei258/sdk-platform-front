"use client";

import { useParams, useRouter } from "next/navigation";
import { ErrorProfilerLog } from "./errorProfiler.api";

export const View = ({data}: { data: ErrorProfilerLog[] }) => {
  const router = useRouter()
  console.info({ data })

  return (
    <div onClick={() => {
      router.push('/8848/dataSnap')
    }}>
      view
    </div>)
}
