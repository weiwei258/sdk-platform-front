import { EChartsOption, init } from "echarts"
import { CSSProperties, useEffect, useRef } from "react"

interface ReactEchartProps {
  option: EChartsOption | undefined
  width?: CSSProperties['width']
  height?: CSSProperties['height']
}
export const ReactEchart = (props: ReactEchartProps) => {

  const { option, width, height = '300px' } = props
  const domRef = useRef<HTMLDivElement>(null)

  const echartInstanceRef = useRef<echarts.ECharts>()
  useEffect(() => {
    if (domRef.current && option) {
      setTimeout(()=>{
        const echartInstance = init(domRef.current,null,{
          width: parseInt(getComputedStyle(domRef.current!).width)
        })
        echartInstance.setOption(option)
        echartInstanceRef.current = echartInstance
      })
    }
  }, [domRef.current, option])

  useEffect(() => {
    if (echartInstanceRef.current && option) {
      echartInstanceRef.current.setOption(option)
    }
  }, [echartInstanceRef.current, option])

  return (
    <div style={{ width, height }} ref={domRef}></div>
  )
}
