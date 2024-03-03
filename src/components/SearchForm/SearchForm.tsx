import { Form, DatePicker, Button, Space, Row } from "antd"
import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { ReactNode, useMemo } from "react"

const { RangePicker } = DatePicker;

interface SearchFormFormData {
  dateRange: [string, string]
}

export interface SearchFormProps<T extends {} = {}> {
  onSearch?: (searchValue: SearchFormFormData & T) => void
  extraFormItems?: ReactNode
}
export const SearchForm = <T extends {} = {}>(props: SearchFormProps<T>) => {
  const { extraFormItems, onSearch } = props

  const [form] = Form.useForm<SearchFormFormData & T>()

  const search = () => {
    if (onSearch) {
      onSearch(form.getFieldsValue())
    }
  }

  return (
    <>
      <Form form={form}>
        <Form.Item name="dateRange">
          <RangeStrPicker />
        </Form.Item>
        {
          extraFormItems
        }
        <Row justify="end">
          <Space>
            <Button type="primary" onClick={search}>开始查询</Button>
            <Button onClick={() => form.resetFields()}>重制条件</Button>
          </Space>
        </Row>
      </Form>
    </>
  )
}


interface RangeStrPickerProps {
  value?: [string, string]
  onChange?: (value: RangeStrPickerProps['value']) => void
}
const RangeStrPicker = (props: RangeStrPickerProps) => {
  const { value, onChange } = props

  const innerValue: [Dayjs, Dayjs] | undefined = useMemo(() => {
    if (!value) return undefined
    return [dayjs(value[0]), dayjs(value[1])]
  }, [value])

  const innerOnchange: RangePickerProps['onChange'] = (value, formatString) => {

    if (!value) {
      onChange?.(undefined)
      return
    }

    onChange?.(formatString)
  }

  return <RangePicker value={innerValue} onChange={innerOnchange} />
}

