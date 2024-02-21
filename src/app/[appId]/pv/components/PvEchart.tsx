import { ReactEchart } from "@/components/ReactEchart"
import { EChartsOption } from "echarts"
import { useMemo } from "react"
import { PvType } from '../types'
import { TransportCategory } from "@eagle-tracker/types"
import dayjs from "dayjs"

interface PvEchartProps {
  data: PvType[]
}
export const PvEchart = (props: PvEchartProps) => {
  const { data } = props

  const option = useMemo<EChartsOption | undefined>(() => {
    const dateMap = new Map<string, number>()

    data.forEach(item => {
      if (item.category === TransportCategory.PV) {
        const key = dayjs(item.timestamp).format('YYYY-MM-DD')
        console.log(item)
        dateMap.set(key, (dateMap.get(key) || 0) + (item as any).context.length)
        return item
      }
    })

    const dateStr = Array.from(dateMap.keys())

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
        data: ['PV']
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
          name: 'PV',
          type: 'line',
          barGap: 0,
          emphasis: {
            focus: 'series'
          },
          data: Array.from(dateMap.values())
        },
      ]
    }
  }, [data])

  return (
    <ReactEchart option={option} />
  )
}
