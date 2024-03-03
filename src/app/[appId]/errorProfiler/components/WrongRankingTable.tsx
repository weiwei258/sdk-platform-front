import Table, { ColumnsType } from "antd/es/table"
import { JsErrType, WrongRankingType } from "../types";
import { useMemo } from "react";

interface WrongRankingTableProps {
  data: JsErrType[]
}
export const WrongRankingTable = (props: WrongRankingTableProps) => {

  const { data } = props

  const WrongRankingColumns: ColumnsType<WrongRankingType> = [
    {
      title: '错误内容',
      key: 'errorType',
      render: (_, { key }) => key,
    },
    {
      title: '发生次数',
      key: 'message',
      render: (_, { value }) => value,
    },
  ];

  const WrongRankingArray = useMemo<WrongRankingType[]>(() => {
    const wrongMap = new Map<string, number>()

    data.forEach((item) => {
      const message = item.context.message
      wrongMap.set(message, (wrongMap.get(message) || 0) + 1)
    })

    return [...wrongMap.entries()]
      .sort((v1, v2) => v2[1] - v1[1])
      .map<WrongRankingType>(([key, value]) => {
        return { key, value }
      })

  }, [data])

  return (
    <Table
      pagination={{ showTotal: (total: number) => <div>共 {total} 条</div> }}
      size="small"
      columns={WrongRankingColumns}
      dataSource={WrongRankingArray}
    />
  )
}
