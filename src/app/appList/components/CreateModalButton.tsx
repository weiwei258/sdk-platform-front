import { Button, Form, Input } from "antd"
import Modal from "antd/es/modal/Modal"
import { useState } from "react"
import { delay } from "@/utils/clientUtils"
import { CreateAppData } from '../appList.api';

type FormData = CreateAppData

export const CreateModalButton = ({ onOk }: { onOk: (formValues: FormData) => Promise<void> }) => {

  const [form] = Form.useForm<FormData>()
  const [open, setOpen] = useState(false)

  const onOkHandle = async () => {
    const data = await form.validateFields()
    await onOk(data)
    setOpen(false)
    await delay(300)
    form.resetFields()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>新建应用</Button>
      <Modal
        open={open}
        title="新建应用"
        onCancel={() => setOpen(false)}
        onOk={onOkHandle}
      >
        <Form form={form}>
          <Form.Item
            name="name"
            label="app名称"
            rules={[{
              required: true,
              message: '请输入app名称',
              type: 'string'
            }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
