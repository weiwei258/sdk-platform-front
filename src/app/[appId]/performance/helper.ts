import { TransportCategory } from '@eagle-tracker/types'
import { PerformanceType } from './types'
import dayjs from 'dayjs'

export const calcPerformance = (data: PerformanceType[]) => {

  const map: Map<string, PerformanceDateManager> = new Map
  data.forEach((item) => {
    if (item.category === TransportCategory.PERF) {
      const dateStrkey = dayjs(item.timestamp).format('YYYY-MM-DD')
      const performanceDateManager = map.get(dateStrkey) || new PerformanceDateManager
      performanceDateManager.setValue(item)
      map.set(dateStrkey, performanceDateManager)
    }
  })

  map.forEach((item) => {
    item.calc()
  })
  return map
}

class PerformanceDateManager {
  logSum: number = 0

  clsSumTime: number = 0
  clsSum: number = 0
  cls: number = 0

  fidSumTime: number = 0
  fidSum: number = 0
  fid: number = 0

  lcpSumTime: number = 0
  lcpSum: number = 0
  lcp: number = 0

  fcpSumTime: number = 0
  fcpSum: number = 0
  fcp: number = 0

  fpSumTime: number = 0
  fpSum: number = 0
  fp: number = 0

  public setValue(data: PerformanceType) {
    if (data.category === TransportCategory.PERF) {

      const { context: { CLS, FID, LCP, FCP, FP } } = data

      this.logSum += 1

      this.clsSumTime += CLS?.value && CLS.value !== -1 ? CLS.value : 0
      this.clsSum += 1

      this.fidSumTime += FID?.value && FID.value !== -1 ? FID.value : 0
      this.fidSum += 1

      this.lcpSumTime += LCP?.value && LCP.value !== -1 ? LCP.value : 0
      this.lcpSum += 1

      this.fcpSumTime += FCP?.value && FCP.value !== -1 ? FCP.value : 0
      this.fcpSum += 1

      this.fpSumTime += FP?.value && FP.value !== -1 ? FP.value : 0
      this.fpSum += 1
    }
  }

  public calc() {
    const { clsSumTime, clsSum, fidSumTime, fidSum } = this

    this.cls = clsSumTime / clsSum
    this.fid = fidSumTime / fidSum
    this.lcp = this.lcpSumTime / this.lcpSum
    this.fcp = this.fcpSumTime / this.fcp
    this.fp = this.fpSumTime / this.fpSum
  }
}
