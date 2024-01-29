import { ErrorStackFrames } from "@eagle-tracker/types"
import { Button, Collapse, CollapseProps, Drawer, Modal, Space, Spin } from "antd"
import { useState } from "react"
import { findCodeBySourceMap } from "../hepler"

interface ErrStackDrawerProps {
  errStack: ErrorStackFrames
}
export const ErrStackDrawer = (props: ErrStackDrawerProps) => {
  const { errStack } = props
  const [open, setOpen] = useState(false)

  const onClose = () => setOpen(false)

  const [errInnerHtml, setErrInnerHtml] = useState('')
  const [loading, setLoading] = useState(false)


  const items: CollapseProps['items'] = errStack.map((item, index) => {
    return {
      key: index,
      label: item.functionName || '匿名函数',
      children: (
        <Spin spinning={loading}>
          <div style={{ minHeight: "100px" }} dangerouslySetInnerHTML={{ __html: errInnerHtml }} />
        </Spin>
      )
    }
  })

  const onChange = async (key: string | string[]) => {

    if (Array.isArray(key)) {
      key = key[0]
    }

    setLoading(true)

    const index = items.findIndex(item => item.key == key)

    const { filename, lineNumber, columnNumber } = errStack[index]

    const data = await findCodeBySourceMap({ fileName: filename, line: lineNumber, column: columnNumber, })
    // console.log(data)
    if (data) {
      setErrInnerHtml(data)
    } else {
      setErrInnerHtml('无法定位')
    }
    setLoading(false)
  }
  return <>
    <Button onClick={() => setOpen(true)}>查看错误栈</Button>
    <Drawer
      title='错误栈'
      placement="right"
      size='large'
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button type="link" size="small" onClick={onClose}>关闭</Button>
        </Space>
      }
    >
      <Collapse onChange={onChange} accordion items={items} />
    </Drawer>
  </>
}
