"use client";

import { useRouter } from "next/navigation";
import { ResourceItemLog, ResourceErrLog } from "./types";
import JSONView from 'react-json-view';
import { useEffect } from "react";
import { calcResourceFailTop, calcResourceSuccessTop, getClassificationManager } from "./helper";

export const View = ({ data, errData }: { data: ResourceItemLog[], errData: ResourceErrLog[] }) => {
  const router = useRouter()
  console.info({ data, errData })

  useEffect(() => {
    const map = getClassificationManager(data, errData)
    const map2 = calcResourceSuccessTop(data, errData)
    const map3 = calcResourceFailTop(errData)
    console.log('map', { map, map2, map3 })
  }, [])

  return (
    <JSONView src={data} />
  )
}

