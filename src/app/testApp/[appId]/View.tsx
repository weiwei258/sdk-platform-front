"use client";

import { Button, Input, Space, } from 'antd'
import { useEffect, useState } from 'react';
import { triggerPromiseError, triggerJSError, httpError, fetchError, ImageError } from './helper';
import { EagleTracker } from '@eagle-tracker/core';
import { AppInfo } from '@/app/appList/appList.api';

export const PageView = ({ appInfo }: { appInfo: AppInfo }) => {
  const { appId, appKey } = appInfo

  useEffect(() => {
    // const instance = new EagleTracker({
    //   isTest: false,
    //   sendMode: '',
    //   postUrl: 'http://127.0.0.1:7001/logs',
    //   appId,
    //   // appKey,
    //   uid: '88888',
    // })
    // instance.start()
  }, [appId, appKey])

  return (
    <div className='flex justify-center mt-40'>
      <Space>
        <Button onClick={triggerPromiseError}>触发Promise错误</Button>
        <Button onClick={triggerJSError}>触发JS错误</Button>
        <Button onClick={httpError}>触发Http(xhr)错误</Button>
        <Button onClick={fetchError}>触发Http(fetch)错误</Button>
        <Button onClick={ImageError}>图片加载错误</Button>
      </Space>
    </div>
  )
}
