"use client";

import { Button, Card, Popconfirm, Space } from 'antd'
import { App, CreateAppData, createApp, deleteApp, requestTest } from './appList.api'
import { useRouter } from 'next/navigation';
import { CreateModalButton } from './components/CreateModalButton'
import { useEffect } from 'react';

export const PageView = ({ appList }: { appList: App[] }) => {
  const router = useRouter()

  const deleteConfirm = async (appId: string) => {
    await deleteApp(appId)
    router.refresh()
  }

  const goto = (appId: string) => {
    router.push(`/${appId}/dataSnap`)
  }

  const onOK = async (values: CreateAppData) => {
    await createApp(values)
    router.refresh()
  }

  return (
    <>
      <div className='mb-5 flex flex-row-reverse'>
        <CreateModalButton onOk={onOK} />
      </div>
      <Space wrap>
        {appList.map(item => (
          <Card
            key={item.appId}
            className='w-[300px] mr-10 mb-10'
            title={item.name}
            extra={<Button size='small' onClick={() => goto(item.appId)} type='link'>进入应用</Button>}
            actions={[
              <Button key='edit' size='small' type='link'>管理应用</Button>,
              <Button
                key='edit'
                size='small'
                type='link'
                onClick={() => router.push(`/${item.appId}/testApp`)}
              >
                测试应用
              </Button>,
              ...(
                item.permission.includes('admin') ?
                  [
                    <Popconfirm
                      key='delete'
                      title="Delete the app"
                      description="Are you sure to delete this app?"
                      onConfirm={() => deleteConfirm(item.appId)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button size='small' className='ml-1' type='link'>删除</Button>
                    </Popconfirm>
                  ] : []
              )
            ]}
          >
            <p>appId: <span className='ml-1'>{item.appId}</span></p>
            <p>appKey: <span className='ml-1'>{item.appKey}</span></p>
          </Card>
        ))}
      </Space>
    </>
  )
}
