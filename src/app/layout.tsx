
import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers';

import { redirect } from 'next/navigation';

import LayoutComponent from '@/components/Layout';
import { ckeckTokenRequest } from '@/service/commonApi';
import { getToken } from '@/utils/serverUtils';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: '监控平台',
  description: 'Generated by create next app',
}

export default async function RootLayout(props: {
  children: React.ReactNode
}) {

  const { children } = props
  const token = getToken()
  const { data } = await ckeckTokenRequest(token)
  const headersList = headers();

  const pathname = headersList.get("x-pathname") || "";
  if (!data && pathname !== '/login') {
    redirect(`/login?redirectUrl=${pathname}`)
  }

  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <LayoutComponent>
            {children}
          </LayoutComponent>
        </AntdRegistry>
      </body>
    </html>
  )
}
