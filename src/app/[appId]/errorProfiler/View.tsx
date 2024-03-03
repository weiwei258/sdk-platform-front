"use client";
import { useMemo, useState } from 'react';
import { Card, Typography } from "antd";
import { SearchForm, SearchFormProps } from "@/components/SearchForm/SearchForm";
import { JsErrArrayTable, OtherErrTable, WrongRankingTable, ErrChart } from "./components";
import { ErrorProfilerLog, JsErrType } from "./types";
import { getErrorProfiler } from './errorProfiler.api';

const { Title } = Typography

export const View = ({ data: initailData, appId }: { data: ErrorProfilerLog[], appId: string }) => {

  const [data, setData] = useState(initailData)

  const jsErrArray = useMemo<JsErrType[]>(() => {
    return data.filter((item) => {
      if (item.context.errorType === 'js-error') {
        return true;
      }
    }) as unknown as JsErrType[]
  }, [data])

  const otherErrArray = useMemo<ErrorProfilerLog[]>(() => {
    return data.filter((item) => {
      if (item.context.errorType !== 'js-error') {
        return true;
      }
    })
  }, [data])

  const onSearch: SearchFormProps['onSearch'] = async (value) => {
    const { data } = await getErrorProfiler({ appId, ...value })
    setData(data)
  }

  return (
    <div style={{ background: '#f5f5f5' }}>
      <Card className="mb-4">
        <SearchForm onSearch={onSearch}></SearchForm>
      </Card>
      <Card className="mb-4">
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">异常分析</Title>
        <ErrChart data={data} />
      </Card>
      <Card className="mb-4">
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">JS错误</Title>
        <JsErrArrayTable appId={appId} data={jsErrArray} />
      </Card>
      <Card className="mb-4">
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">JS错误排行</Title>
        <WrongRankingTable data={jsErrArray} />
      </Card>
      <Card>
        <Title level={5} style={{ marginBottom: '20px' }} className="mb-2">其它错误</Title>
        <OtherErrTable data={otherErrArray} />
      </Card>
    </div>
  )
}




