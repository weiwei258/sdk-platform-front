'use client';

import { Button, Form, Input,message } from 'antd';
import { useState } from 'react';
import { loginRequest, LoginType, registerRequest } from './login.api'
import Cookies from 'js-cookie';
import { Authorization } from '@/constants';
import { useRouter } from 'next/navigation'

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type RegisterType = {
  nickname: string;
  account: string;
  password: string;
};

interface LoginProps {
  searchParams: {
    redirectUrl?: string
  }
}
const Login: React.FC<LoginProps> = (props) => {
  const { searchParams } = props
  const { redirectUrl = '/' } = searchParams
  const router = useRouter()

  const [mode, setMode] = useState<'login' | 'register'>('login')

  const loginFinish = async (values: LoginType) => {
    const { data: { token } } = await loginRequest(values)
    Cookies.set(Authorization, token)
    router.push(redirectUrl)
  };

  const regisetrFinish = async (value: RegisterType) => {
    await registerRequest(value)
    message.success('注册成功')
    setMode('login')
  }

  const loginForm = (
    <Form<LoginType>
      key="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={loginFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='w-[400px]'
    >
      <Form.Item<LoginType>
        label="账号"
        name="account"
        rules={[{ required: true, message: '请输入账号' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<LoginType>
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登陆
        </Button>
      </Form.Item>
    </Form>
  )

  const register = (
    <Form<RegisterType>
      key="register"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={regisetrFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='w-[400px]'
    >
      <Form.Item<RegisterType>
        label="账号名"
        name="nickname"
        rules={[{ required: true, message: '请输入账号名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<RegisterType>
        label="账号"
        name="account"
        rules={[{ required: true, message: '请输入账号' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<RegisterType>
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  )

  return (
    <div className='flex justify-center items-center h-full flex-col'>
      <div>
        {mode === 'login' ? loginForm : register}
        <Button
          type="link"
          className='ml-[115px]'
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login')
          }}
        >
          切换到{mode === 'login' ? '注册' : '登陆'}
        </Button>
      </div>
    </div>
  );
}

export default Login;
