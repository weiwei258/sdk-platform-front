"use client";
import { EagleTracker } from '@eagle-tracker/core';
import React, { PropsWithChildren, useEffect, useLayoutEffect, useMemo, useState } from 'react';

const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useLayoutEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}

const LayoutComponent: React.FC<PropsWithChildren> = (props) => {
  const { children } = props

  const mounted = useMounted()

  useEffect(() => {
    // console.log({ isTest: process.env.NODE_ENV === 'development' })
    const instance = new EagleTracker({
      isTest: process.env.NODE_ENV === 'development',
      sendMode: 'post',
      dsn: process.env.NEXT_PUBLIC_BASE_URL + '/logs',
      appId: 'WXfvhDdQ',
      appKey: 'e90b2b6de544c7779bc6fddff671135e',
      uid: '88888',
    })
    instance.start()
  }, [])

  const content = useMemo(() => {
    if (!mounted) {
      return null
    }

    return children
  }, [children, mounted])

  return content;
};

export default LayoutComponent;
