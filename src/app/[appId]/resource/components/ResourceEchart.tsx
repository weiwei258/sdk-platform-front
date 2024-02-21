import { ReactEchart } from "@/components/ReactEchart"
import { useMemo } from "react"
import { ResourceErrLog, ResourceItemLog } from "../types";
import { getClassificationManager } from "../helper";
import { EChartsOption } from "echarts";

interface ResourceEchartProps {
  data: ResourceItemLog[];
  errData: ResourceErrLog[]
}
export const ResourceEchart = (props: ResourceEchartProps) => {

  const { data, errData } = props
  const option = useMemo<EChartsOption>(() => {
    const map = getClassificationManager(data, errData)
    const arr = [...map.values()]

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: (params:any) => {
          return `${params[0].axisValue}<br/>` +
            `样本数：${params[0].value}<br/>` +
            `耗时：${params[1].value.toFixed(2)}ms<br/>` +
            `成功率：${params[2].value.toFixed(2)}%<br/>` +
            `0-0.5s占比: ${params[3].value ? params[3].value.toFixed(2) + '%' : '无数据'}<br/>` +
            `0.5-1s占比: ${params[4].value ? params[4].value.toFixed(2) + '%' : '无数据'}<br/>` +
            `1-3s占比: ${params[5].value ? params[5].value.toFixed(2) + '%' : '无数据'}<br/>` +
            `3-5s占比: ${params[6].value ? params[6].value.toFixed(2) + '%' : '无数据'}<br/>` +
            `5-10s占比: ${params[7].value ? params[7].value.toFixed(2) + '%' : '无数据'}<br/>` +
            `10s+占比: ${params[8].value ? params[8].value.toFixed(2) + '%' : '无数据'}`
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
        data: ['样本数', '耗时', '成功率', '0-0.5s占比', '0.5-1s占比', '1-3s占比', '3-5s占比', '5-10s占比', '10s+占比']
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: Array.from(map.keys())
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
        {
          type: 'value',
          name: '占比',
          position: 'right',
          alignTicks: true,
          offset: 80,
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: '{value}%'
          }
        },

      ],
      series: [
        {
          name: '样本数',
          type: 'bar',
          yAxisIndex: 1,
          data: arr.map(item => item.logSum)
        },
        {
          name: '耗时',
          type: 'line',
          yAxisIndex: 0,
          data: arr.map(item => item.averageTime)
        },
        {
          name: '成功率',
          type: 'line',
          yAxisIndex: 2,
          data: arr.map(item => item.successPercentage)
        },
        {
          name: '0-0.5s占比',
          type: 'bar',
          yAxisIndex: 2,
          stack: 'stack',
          data: arr.map(item => item.elapsedTimePercentage["0-0.5"])
        },
        {
          name: '0.5-1s占比',
          type: 'bar',
          yAxisIndex: 2,
          stack: 'stack',
          data: arr.map(item => item.elapsedTimePercentage["0.5-1"])
        },
        {
          name: '1-3s占比',
          type: 'bar',
          yAxisIndex: 2,
          stack: 'stack',
          data: arr.map(item => item.elapsedTimePercentage["1-3"])
        },
        {
          name: '3-5s占比',
          type: 'bar',
          yAxisIndex: 2,
          stack: 'stack',
          data: arr.map(item => item.elapsedTimePercentage["3-5"])
        },
        {
          name: '5-10s占比',
          type: 'bar',
          yAxisIndex: 2,
          stack: 'stack',
          data: arr.map(item => item.elapsedTimePercentage["5-10"])
        },
        {
          name: '10s+占比',
          type: 'bar',
          yAxisIndex: 2,
          stack: 'stack',
          data: arr.map(item => item.elapsedTimePercentage["5-10"])
        }
      ],
    }
  }, [data, errData])

  return <ReactEchart option={option} />
}
