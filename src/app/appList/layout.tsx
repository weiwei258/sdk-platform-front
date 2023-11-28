"use client";
import { Avatar, Col, Layout, Popover, Row, Typography, theme } from "antd"
import { UserOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title } = Typography;

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Row justify="space-between">
          <Col>
            <Title className="ml-6 mt-5" level={5}> 首页 </Title>
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

      </Header>
      <Content
        className="m-[24px] mx-[16px] p-[24px] min-[280px]"
        style={{ background: colorBgContainer }}
      >
        {children}
      </Content>
    </Layout>
  )
}

export default PageLayout
