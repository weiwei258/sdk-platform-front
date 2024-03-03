import { Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import JSONView from 'react-json-view';
import { ErrorProfilerLog } from "../types";

interface OtherErrTableProps {
  data: ErrorProfilerLog[]
}
export const OtherErrTable = (props: OtherErrTableProps) => {
  const { data } = props

  const columns: ColumnsType<ErrorProfilerLog> = [
    {
      title: '错误类型',
      width:250,
      key: 'errorType',
      render: (_, { context }) => {
        return (
          <Tag> {context.errorType} </Tag>
        )
      },
    },
    {
      title: '日期',
      width:250,
      key: 'date',
      render: (_, { timestamp }) => dayjs(timestamp).format('YYYY MM-DD HH:mm:ss'),
    },
    {
      title: '错误内容',
      key: 'context',
      dataIndex: 'context',
      render: (_, { context }) => (
        <JSONView collapsed={true} src={context} />
      ),
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
