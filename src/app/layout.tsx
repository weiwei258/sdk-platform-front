
import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers';

import { redirect } from 'next/navigation';

import LayoutComponent from '@/components/layout'
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { ckeckTokenRequest } from '@/service/commonApi';
import { getToken } from '@/utils/serverUtils';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  const token = getToken()
  const { data } = await ckeckTokenRequest(token)
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  if (!data && pathname !== '/login') {
    redirect(`/login?redirectUrl=${pathname}`)
  }

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <LayoutComponent>
            {children}
          </LayoutComponent>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
