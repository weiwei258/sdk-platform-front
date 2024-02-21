"use client";
import { Card, Typography } from "antd";
import { SearchForm } from "@/components/SearchForm";
import { SearchFormProps } from "@/components/SearchForm/SearchForm";
import { useState } from "react";
import { getPerformanceLogs } from "./performance.api";
import { PerformanceType } from "./types";
import { PerformanceEchart, WebVitalsView } from "./components";


const { Title } = Typography

export const View = ({ data: initailData, appId }: { data: PerformanceType[], appId: string }) => {

  const [data, setData] = useState(initailData)

  const onSearch: SearchFormProps['onSearch'] = async (value) => {
    const { data } = await getPerformanceLogs({ appId, ...value })
    setData(data)
  }

  return (
    <div style={{ background: '#f5f5f5' }}>
      <Card className="mb-3">
        <SearchForm onSearch={onSearch}></SearchForm>
      </Card>

      <Card>
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">性能视图</Title>
        <PerformanceEchart data={data} />
      </Card>

      <Card>
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">Core Web Vitals</Title>
        <WebVitalsView data={data} />
      </Card>

    </div>
  )
}
