import { Col, Row } from "antd"
import { PerformanceType } from "../types"
import { useMemo } from "react"
import { TransportCategory } from "@eagle-tracker/types"

type MetricName = 'CLS' | 'FID' | 'LCP' | 'FCP' | 'FP';

type WebVitals = {
  [key in MetricName]: WebVitalsManager;
};

class WebVitalsManager {
  sum: number = 0;
  totalTime: number = 0;
  averageTime: string = '';
}

interface WebVitalsViewProps {
  data: PerformanceType[]
}
export const WebVitalsView = (props: WebVitalsViewProps) => {
  const { data } = props

  const map = useMemo<WebVitals>(() => {
    const CLSManager = new WebVitalsManager
    const FIDManager = new WebVitalsManager
    const LCPManager = new WebVitalsManager
    const FCPManager = new WebVitalsManager
    const FPManager = new WebVitalsManager

    data.forEach((item) => {
      if (item.category === TransportCategory.PERF) {
        item.context.CLS
        if (item.context.CLS) {
          CLSManager.sum += 1
          CLSManager.totalTime += item.context.CLS.value && item.context.CLS.value !== -1 ? item.context.CLS.value : 0
        }
        if (item.context.FID) {
          FIDManager.sum += 1
          FIDManager.totalTime += item.context.FID.value && item.context.FID.value !== -1 ? item.context.FID.value : 0
        }
        if (item.context.LCP) {
          LCPManager.sum += 1
          LCPManager.totalTime += item.context.LCP.value && item.context.LCP.value !== -1 ? item.context.LCP.value : 0
        }
        if (item.context.FCP) {
          FCPManager.sum += 1
          FCPManager.totalTime += item.context.FCP.value && item.context.FCP.value !== -1 ? item.context.FCP.value : 0
        }
        if (item.context.FP) {
          FPManager.sum += 1
          FPManager.totalTime += item.context.FP.value && item.context.FP.value !== 1 - 1 ? item.context.FP.value : 0
        }
      }

    })

    CLSManager.averageTime = (CLSManager.totalTime / CLSManager.sum).toFixed(2)
    FIDManager.averageTime = (FIDManager.totalTime / FIDManager.sum).toFixed(2)
    LCPManager.averageTime = (LCPManager.totalTime / LCPManager.sum).toFixed(2)
    FCPManager.averageTime = (FCPManager.totalTime / FCPManager.sum).toFixed(2)
    FPManager.averageTime = (FPManager.totalTime / FPManager.sum).toFixed(2)

    return {
      'CLS': CLSManager,
      'FID': FIDManager,
      'LCP': LCPManager,
      'FCP': FCPManager,
      'FP': FPManager
    }
  }, [data])

  return (
    <Row>
      <Col span={8}>
        CLS：{map.CLS.averageTime}ms
      </Col>
      <Col span={8}>
        FID：{map.FID.averageTime}ms
      </Col>
      <Col span={8}>
        LCP：{map.CLS.averageTime}ms
      </Col>
      <Col span={8}>
        FCP：{map.FCP.averageTime != 'NaN' ? map.FCP.averageTime + 'ms' : '暂无数据'}
      </Col>
      <Col span={8}>
        FP：{map.FCP.averageTime != 'NaN' ? map.FCP.averageTime + 'ms' : '暂无数据'}
      </Col>
    </Row>
  )
}


