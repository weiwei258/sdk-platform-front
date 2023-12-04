"use client";

import { useParams, useRouter } from "next/navigation";
import { ErrorProfilerLog } from "./errorProfiler.api";
import JSONView from 'react-json-view';

export const View = ({ data }: { data: ErrorProfilerLog[] }) => {
  console.info({ data })

  return (
    <JSONView src={data} />
  )
}
