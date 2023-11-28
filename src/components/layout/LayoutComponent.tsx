"use client";
import React, { PropsWithChildren, useLayoutEffect, useMemo, useState } from 'react';

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

  const content = useMemo(() => {
    if (!mounted) {
      return null
    }

    return children
  }, [children, mounted])

  return content;
};

export default LayoutComponent;
