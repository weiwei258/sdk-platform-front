import { Table, Tag } from "antd"
import { JsErrType } from "../types";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { ErrStackDrawer } from "./ErrStackDrawer";


interface JsErrArrayTableProps {
  data: JsErrType[]
}
export const JsErrArrayTable = ({ data }: JsErrArrayTableProps) => {

  const columns: ColumnsType<JsErrType> = [
    {
      title: '错误类型',
      key: 'errorType',
      render: (_, { context: { errorType } }) => {
        return (
          <Tag> {errorType} </Tag>
        )
      },
    },
    {
      title: '错误信息',
      key: 'message',
      render: (_, { context: { message } }) => message,
    },
    {
      title: '日期',
      key: 'date',
      render: (_, { timestamp }) => dayjs(timestamp).format('YYYY MM-DD HH:mm:ss'),
    },
    {
      title: '错误栈',
      key: 'stack',
      dataIndex: 'stack',
      render: (_, { context: { stack } }) => (
        <ErrStackDrawer errStack={stack} />
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
