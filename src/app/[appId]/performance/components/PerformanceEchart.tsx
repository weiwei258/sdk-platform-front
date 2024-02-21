import { ReactEchart } from '@/components/ReactEchart'
import { PerformanceType } from '../types'
import { useMemo } from 'react'
import { EChartsOption } from 'echarts'
import { calcPerformance } from '../helper'

interface PerformanceEchartProps {
  data: PerformanceType[]
}
export const PerformanceEchart = (props: PerformanceEchartProps) => {
  const { data } = props

  const option = useMemo<EChartsOption>(() => {
    const map = calcPerformance(data)

    const dateStr = Array.from(map.keys())
    const dateMapArr = Array.from(map.values())
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params: any) => {
          return `${params[0].axisValue}<br/>` +
            `样本数：${params[0].value}<br/>` +
            `CLS：${params[1].value.toFixed(2)}ms<br/>` +
            `FID：${params[2].value.toFixed(2)}ms<br/>` +
            `LCP: ${params[3].value ? params[3].value.toFixed(2) + 'ms' : '无数据'}<br/>` +
            `FCP: ${params[4].value ? params[4].value.toFixed(2) + 'ms' : '无数据'}<br/>` +
            `FP: ${params[5].value ? params[5].value.toFixed(2) + 'ms' : '无数据'}<br/>`
        }
      },
      grid: {
        // 调整整体内边距
        top: 50,
        right: 150,
        bottom: 50,
        left: 50
      },
      legend: {
        data: ['样本数', 'CLS', 'FID', 'LCP', 'FCP', 'FP']
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
          type: 'value',
          name: '耗时',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: '{value}ms'
          }
        },
        {
          type: 'value',
          name: '计数',
          position: 'right',
          alignTicks: true,
          offset: 20,
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
      ],
      series: [
        {
          name: '样本数',
          type: 'bar',
          barGap: 0,
          yAxisIndex: 0,
          emphasis: {
            focus: 'series'
          },
          data: dateMapArr.map(item => item.logSum)
        },
        {
          name: 'CLS',
          type: 'line',
          yAxisIndex: 1,
          emphasis: {
            focus: 'series'
          },
          data: dateMapArr.map(item => item.cls)
        },
        {
          name: 'FID',
          type: 'line',
          yAxisIndex: 1,
          emphasis: {
            focus: 'series'
          },
          data: dateMapArr.map(item => item.fid)
        },
        {
          name: 'LCP',
          type: 'line',
          yAxisIndex: 1,
          emphasis: {
            focus: 'series'
          },
          data: dateMapArr.map(item => item.lcp)
        },
        {
          name: 'FCP',
          type: 'line',
          yAxisIndex: 1,
          emphasis: {
            focus: 'series'
          },
          data: dateMapArr.map(item => item.fcp)
        },
        {
          name: 'FP',
          type: 'line',
          yAxisIndex: 1,
          emphasis: {
            focus: 'series'
          },
          data: dateMapArr.map(item => item.fp)
        },
      ]
    }
  }, [data])

  return <ReactEchart option={option} />
}



