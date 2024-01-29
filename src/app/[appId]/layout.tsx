"use client";

import { Avatar, Button, Col, Layout, Menu, Popover, Row, theme } from "antd"
import { useParams, usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const PageMap: Record<string, string> = {
  dataSnap: '数据总览',
  performanceTracker: '页面性能',
  logSearcher: '日志查询',
  errorProfiler: '异常分析',
  testApp: '测试app',
  resource: '静态资源',
  // 5: '页面访问',
  // 6: 'API监控',
  // 7: '静态资源',
  // 8: '自定义上报',
  // 9: '通信监控',
  // 10: '应用管理',
}

const useRouterPaths = () => {
  const { appId } = useParams() as { appId: string }

  return useMemo(() => {
    return Object.keys(PageMap).map((key) => {
      const label = PageMap[key];

      return {
        key: `/${appId}/${key}`,
        label
      }
    })
  }, [appId])
}


const AppAdminLayout: React.FC<PropsWithChildren> = (props) => {

  const { children } = props

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const routerPaths = useRouterPaths()

  useEffect(() => {
    if (pathname !== '/login') {
      setSelectedKeys([pathname])
    }
  }, [pathname])

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={routerPaths}
          selectedKeys={selectedKeys}
          onSelect={(e) => {
            setSelectedKeys(e.selectedKeys)
            router.push(e.selectedKeys[0])
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Row justify="space-between">
            <Col>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Row>
              <Col className="mr-4">
                <Button onClick={() => router.push('/appList')}>返回app列表</Button>
              </Col>
              <Col>
                <div className='mr-5'>
                  <Popover
                    placement="bottom"
                    content={
                      <div>
                        <p className='cursor-pointer'>个人中心</p>
                        <p className='cursor-pointer'>退出</p>
                      </div>
                    }
                  >
                    <Avatar size='default' icon={<UserOutlined />} />
                  </Popover>
                </div>
              </Col>
            </Row>
          </Row>

        </Header>
        <Content
          className="m-[24px] mx-[16px] min-[280px] h-full overflow-auto"
          style={{ background: colorBgContainer }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppAdminLayout
