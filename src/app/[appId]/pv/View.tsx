"use client";
import { Card, Typography } from "antd";
import { PvType } from "./types"
import { SearchForm } from "@/components/SearchForm";
import { SearchFormProps } from "@/components/SearchForm/SearchForm";
import { useState } from "react";
import { getPvLogs } from "./pv.api";
import { PvEchart, TopViewTable } from "./components"

const { Title } = Typography

export const View = ({ data: initailData, appId }: { data: PvType[], appId: string }) => {

  console.log({ initailData, appId })
  const [data, setData] = useState(initailData)

  const onSearch: SearchFormProps['onSearch'] = async (value) => {
    const { data } = await getPvLogs({ appId, ...value })
    setData(data)
  }

  return (
    <div style={{ background: '#f5f5f5' }}>
      <Card className="mb-3">
        <SearchForm onSearch={onSearch}></SearchForm>
      </Card>

      <Card>
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">时间视图</Title>
        <PvEchart data={data} />
      </Card>

      <Card>
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">访问页面 TOP 视图</Title>
        <TopViewTable data={data} />
      </Card>

    </div>
  )
}
