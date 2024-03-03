"use client";

import { ResourceItemLog, ResourceErrLog } from "./types";
import { useState } from "react";
import { FailResourceTable } from './components/FailResourceTable'
import { Card, Typography } from "antd";
import { SearchForm } from "@/components/SearchForm";
import { ResourceEchart, SuccessResourceTable } from "./components";
import { SearchFormProps } from "@/components/SearchForm/SearchForm";
import { getResourceErrLogs, getResourceLogs } from './resource.api'

const { Title } = Typography

export const View = ({ data: initialData, errData: initialErrData, appId }: { data: ResourceItemLog[], errData: ResourceErrLog[], appId: string }) => {

  const [data, setData] = useState(initialData)

  const [errData, setErrData] = useState(initialErrData)

  const onSearch: SearchFormProps['onSearch'] = async (values) => {
    const { data } = await getResourceLogs({ ...values, appId })
    const { data: errData } = await getResourceErrLogs({ ...values, appId })
    setData(data)
    setErrData(errData)
  }

  return (
    <div style={{ background: '#f5f5f5' }}>
      <Card className="mb-4">
        <SearchForm onSearch={onSearch}></SearchForm>
      </Card>
      <Card className="mb-4">
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">静态资源视图</Title>
        <ResourceEchart data={data} errData={errData} />
      </Card>
      <Card className="mb-4">
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">
          资源请求 TOP 视图
        </Title>
        <SuccessResourceTable data={data} errData={errData} />
      </Card>
      <Card className="mb-4">
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">资源请求失败 TOP 视图</Title>
        <FailResourceTable errData={errData} />
      </Card>
    </div>
  )
}

