"use client";

import { useState } from "react"
import { deleteFile, getFileList, uploadFileList } from './mapManager.api'
import { Card, Popconfirm, Table, Upload, UploadFile, UploadProps, type GetProp, message, Row, Col, Button } from "antd";
import { ColumnsType } from "antd/es/table";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface TableRowType {
  name: string
}

interface ViewProps {
  appId: string
  data: string[]
}

export const View = (props: ViewProps) => {

  const { appId, data: initalData } = props

  const [data, setData] = useState(initalData.map(name => ({ name })))

  const columns: ColumnsType<TableRowType> = [
    {
      title: '页面资源',
      key: 'url',
      render: (_, { name }) => (
        name
      ),
    },
    {
      title: '操作',
      render: (_, { name }) => {
        return (
          <Popconfirm
            title={null}
            description="确定要删除这个文件吗?"
            onConfirm={() => { deleteHandle(name) }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        )
      },
    },
  ];

  const updateData = async () => {
    const { data } = await getFileList(appId)
    setData(data.reverse().map(name => ({ name })))
  }

  const deleteHandle = async (fileName: string) => {
    await deleteFile({ appId, fileName })
    updateData()
  }

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append(file.name, file as FileType);
    });
    setUploading(true);
    uploadFileList(appId, formData)
      .then(() => {
        setFileList([]);
        updateData()
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <div style={{ background: '#f5f5f5' }}>
      <Card className="mb-4 p-1">
        <div className="flex mb-3">
          <Upload {...uploadProps}>
            <Button>选择文件</Button>
          </Upload>

          <Button
            type="primary"
            className="ml-2"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
          >
            {uploading ? '上传中' : '开始上传'}
          </Button>
        </div>
        <Table
          pagination={{ showTotal: (total: number) => <div>共 {total} 条</div> }}
          size="small"
          columns={columns}
          dataSource={data}
        />
      </Card>
    </div>
  )
}
