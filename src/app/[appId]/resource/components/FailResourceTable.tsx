import Table, { ColumnsType } from "antd/es/table";
import { ResourceErrLog, ResourceFailItem } from "../types";
import { useMemo } from "react";
import { calcResourceFailTop } from "../helper";
import { CopyOutlined } from "@ant-design/icons";
import { writeText } from "clipboard-polyfill";
import { message } from "antd";

interface FailResourceTableProps {
  errData: ResourceErrLog[]
}
export const FailResourceTable = (props: FailResourceTableProps) => {
  const { errData } = props

  const data = useMemo<ResourceFailItem[]>(() => {
    return calcResourceFailTop(errData)
  }, [errData])

  const columns: ColumnsType<ResourceFailItem> = [
    {
      title: '页面资源',
      key: 'url',
      render: (_, { url }) => (
        <div>
          {url}
          <CopyOutlined
            className="ml-2"
            onClick={() => {
              writeText(url)
              message.info('复制成功')
            }}
          />
        </div>
      ),
    },
    {
      title: '数量（占比）',
      render: (_, { percent, value }) => (
        `${value}（${(percent).toFixed(2)}%）`
      ),
      sorter: {
        compare: (a, b) => a.value - b.value,
        multiple: 3,
      },
    },
  ];

  return (
    <Table
      pagination={{ showTotal: (total: number) => <div>共 {total} 条</div> }}
      size="small"
      columns={columns}
      dataSource={data}
    />
  )
}
