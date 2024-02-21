import { Table, message } from "antd";
import { ResourceErrLog, ResourceItemLog } from "../types";
import { ColumnsType } from "antd/es/table";
import { ResourceSuccessManager, calcResourceSuccessTop } from "../helper";
import { useMemo } from "react";
import { CopyOutlined } from "@ant-design/icons";
import { writeText } from "clipboard-polyfill";

interface SuccessResourceTableProps {
  data: ResourceItemLog[];
  errData: ResourceErrLog[]
}

export const SuccessResourceTable = (props: SuccessResourceTableProps) => {
  const { data, errData } = props

  const tableData = useMemo(() => {
    return calcResourceSuccessTop(data, errData)
  }, [data, errData])

  const columns: ColumnsType<ResourceSuccessManager> = [
    {
      title: '页面资源',
      key: 'url',
      width: 250,
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
      title: '请求耗时',
      width: 200,
      render: (_, { averageTime }) => (
        `${averageTime.toFixed(2)}ms`
      ),
      sorter: {
        compare: (a, b) => a.averageTime - b.averageTime,
        multiple: 3,
      },
    },
    {
      title: 'HTTP Code 成功率',
      width: 200,
      render: (_, { successPercentage }) => (
        `${successPercentage.toFixed(2)}%`
      ),
      sorter: {
        compare: (a, b) => a.successPercentage - b.successPercentage,
        multiple: 3,
      },
    },
    {
      title: '采样数量',
      width: 200,
      render: (_, { logSum }) => (
        `${logSum}`
      ),
      sorter: {
        compare: (a, b) => a.logSum - b.logSum,
        multiple: 3,
      },
    },
  ];

  return (
    <Table
      pagination={{ showTotal: (total: number) => <div>共 {total} 条</div> }}
      size="small"
      columns={columns}
      dataSource={tableData}
    />
  )
}
