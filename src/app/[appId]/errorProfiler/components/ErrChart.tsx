import { ReactEchart } from '@/components/ReactEchart'
import dayjs, { Dayjs } from 'dayjs';
import { ErrorProfilerLog } from '../types';
import { useMemo } from 'react';
import { EChartsOption } from "echarts"

interface ErrRecord {
  'api-error': number
  'js-error': number
  'vue-error': number
  'promise-error': number
}


interface ErrChartProps {
  data: ErrorProfilerLog[]
}
export const ErrChart = (props: ErrChartProps) => {
  const { data } = props

  const option = useMemo<EChartsOption | undefined>(() => {
    // 设置起始和结束日期
    if (data.length > 0) {
      const startDate = dayjs(data[0].timestamp);
      const endDate = dayjs(data[data.length - 1].timestamp);
      const dateArr: Dayjs[] = []
      const hasDateSet = new Set(data.map((item) => dayjs(item.timestamp).format('YYYY-MM-DD')))
      let currentDate = startDate
      while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
        if (hasDateSet.has(currentDate.format('YYYY-MM-DD'))) {
          dateArr.push(currentDate)
        }
        currentDate = currentDate.add(1, 'day')
      }
      const dateStr = dateArr.map((date) => date.format('YYYY-MM-DD'))
      const dateMap: Record<string, ErrRecord> = {}
      const dateMapArr: ErrRecord[] = []
      dateStr.forEach((item) => {
        const obj = {
          'api-error': 0,
          'js-error': 0,
          'vue-error': 0,
          'promise-error': 0,
        }
        dateMap[item] = obj
        dateMapArr.push(obj)
      })

      data.forEach((item) => {
        const key = dayjs(item.timestamp).format('YYYY-MM-DD')
        if (dateMap[key]) {
          dateMap[key][item.context.errorType] = dateMap[key][item.context.errorType] + 1
        }
      })

      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          // 调整整体内边距
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        },
        legend: {
          data: ['接口错误', 'JS错误', 'vue错误', 'promise错误']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: dateStr
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '接口错误',
            type: 'bar',
            barGap: 0,
            emphasis: {
              focus: 'series'
            },
            data: dateMapArr.map(item => item['api-error'])
          },
          {
            name: 'JS错误',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: dateMapArr.map(item => item['js-error'])
          },
          {
            name: 'vue错误',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: dateMapArr.map(item => item['vue-error'])
          },
          {
            name: 'promise错误',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: dateMapArr.map(item => item['promise-error'])
          }
        ]
      }
    }
  }, [data])

  return <ReactEchart option={option} />
}
