import { Table } from "antd"
import { PvType } from "../types"
import { ColumnsType } from "antd/es/table"
import { useMemo } from "react"
import { TransportCategory } from "@eagle-tracker/types"

interface TableType {
  url: string
  pageviews: number
}

interface TopViewTableProps {
  data: PvType[]
}
export const TopViewTable = (props: TopViewTableProps) => {

  const { data: innerData } = props

  const data = useMemo(() => {
    const map = new Map<string, TableType>()
    innerData.forEach((item) => {
      if (item.category === TransportCategory.PV) {
        (item as any).context.forEach(({ url }:any) => {
          const config = map.get(url) || { url, pageviews: 0 }
          config.pageviews += 1
          map.set(url, config)
        })
      }
    })
    return Array.from(map.values())
  }, [innerData])

  const columns: ColumnsType<TableType> = [
    {
      title: '页面 URL',
      render: (_, { url }) => (url),
    },
    {
      title: '页面访问量',
      render: (_, { pageviews }) => (pageviews),
      sorter: {
        compare: (a, b) => a.pageviews - b.pageviews,
        multiple: 3,
      },
    },
  ]

  return (
    <Table
      pagination={{ showTotal: (total: number) => <div>共 {total} 条</div> }}
      size="small"
      columns={columns}
      dataSource={data}
    />
  )
}

