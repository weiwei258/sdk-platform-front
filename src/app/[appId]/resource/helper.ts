import dayjs from "dayjs"
import { ResourceErrLog, ResourceItemLog } from "./types"

class ResourceManager {
  logSum: number = 0
  elapsedTime: number = 0
  averageTime: number = 0
  successSum: number = 0
  failSum: number = 0
  successPercentage: number = 0
  elapsedTimecollect: {
    '0-0.5': number
    '0.5-1': number
    '1-3': number
    '3-5': number
    '5-10': number
    '10+': number
  } = {
      '0-0.5': 0,
      '0.5-1': 0,
      '1-3': 0,
      '3-5': 0,
      '5-10': 0,
      '10+': 0,
    }
  elapsedTimePercentage: {
    '0-0.5': number
    '0.5-1': number
    '1-3': number
    '3-5': number
    '5-10': number
    '10+': number
  } = {
      '0-0.5': 0,
      '0.5-1': 0,
      '1-3': 0,
      '3-5': 0,
      '5-10': 0,
      '10+': 0,
    }

  calc() {
    const { successSum, elapsedTime, logSum } = this
    this.averageTime = elapsedTime / successSum
    this.successPercentage = successSum / logSum
    this.elapsedTimePercentage['0-0.5'] = this.elapsedTimecollect['0-0.5'] / logSum
    this.elapsedTimePercentage['0.5-1'] = this.elapsedTimecollect['0.5-1'] / logSum
    this.elapsedTimePercentage['1-3'] = this.elapsedTimecollect['1-3'] / logSum
    this.elapsedTimePercentage['3-5'] = this.elapsedTimecollect['3-5'] / logSum
    this.elapsedTimePercentage['5-10'] = this.elapsedTimecollect['5-10'] / logSum
    this.elapsedTimePercentage['10+'] = this.elapsedTimecollect['10+'] / logSum
  }

}

const getTimeClassify = (time: number) => {
  const second = time / 1000
  if (second < 0.5) {
    return '0-0.5'
  }
  if (second >= 0.5 && second < 1) {
    return '0.5-1'
  }
  if (second >= 1 && second < 3) {
    return '1-3'
  }
  if (second >= 3 && second < 5) {
    return '3-5'
  }
  if (second >= 5 && second < 10) {
    return '5-10'
  }
  if (second >= 10) {
    return '10+'
  }

}

class ClassificationManager {
  private dateResourceManagerMap: Map<string, ResourceManager> = new Map

  public setResourceData(data: ResourceItemLog) {
    const { dateResourceManagerMap } = this

    const dateStr = dayjs(data.timestamp).format('YYYY-MM-DD')
    const resourceManager = dateResourceManagerMap.get(dateStr) || new ResourceManager

    resourceManager.logSum = resourceManager.logSum + data.context.length

    data.context.forEach((item) => {
      resourceManager.elapsedTime = resourceManager.elapsedTime + item.loadTime
      resourceManager.successSum += 1
      const elapsedTimecollectKey = getTimeClassify(item.loadTime)
      if (elapsedTimecollectKey) {
        resourceManager.elapsedTimecollect[elapsedTimecollectKey] += 1
      }
    })

    dateResourceManagerMap.set(dateStr, resourceManager)
  }

  public setResourceErrData(data: ResourceErrLog) {
    const { dateResourceManagerMap } = this

    const dateStr = dayjs(data.timestamp).format('YYYY-MM-DD')
    const resourceManager = dateResourceManagerMap.get(dateStr) || new ResourceManager
    resourceManager.logSum += 1
    resourceManager.failSum += 1
    dateResourceManagerMap.set(dateStr, resourceManager)
  }

  public calcDateResourceManagerMap() {
    const { dateResourceManagerMap } = this
    Array.from(dateResourceManagerMap.values()).forEach((item) => {
      item.calc()
    })
    return dateResourceManagerMap
  }
}

export const getClassificationManager = (data: ResourceItemLog[], errData: ResourceErrLog[]) => {
  const classificationManager = new ClassificationManager

  data.forEach((item) => {
    classificationManager.setResourceData(item)
  })

  errData.forEach((item) => {
    classificationManager.setResourceErrData(item)
  })

  return classificationManager.calcDateResourceManagerMap()
}

class ResourceSuccessManager {
  logSum: number = 0
  elapsedTime: number = 0
  averageTime: number = 0
  successSum: number = 0
  failSum: number = 0
  successPercentage: number = 0
  calc() {
    const { logSum, successSum, elapsedTime } = this
    this.averageTime = elapsedTime / successSum
    this.successPercentage = successSum / logSum
  }
}

class ResourceSuccessListManager {
  resourceSuccessManagerMap: Map<string, ResourceSuccessManager> = new Map
  public setResourceData(data: ResourceItemLog) {
    const { resourceSuccessManagerMap } = this
    data.context.forEach(item => {
      const resourceSuccessManager = resourceSuccessManagerMap.get(item.name) || new ResourceSuccessManager
      resourceSuccessManager.logSum += 1
      resourceSuccessManager.successSum += 1
      resourceSuccessManager.elapsedTime += item.loadTime

      resourceSuccessManagerMap.set(item.name, resourceSuccessManager)
    })
  }
  public setResourceErrData(data: ResourceErrLog) {
    const { resourceSuccessManagerMap } = this
    const resourceSuccessManager = resourceSuccessManagerMap.get(data.context.url) || new ResourceSuccessManager
    resourceSuccessManager.logSum += 1
    resourceSuccessManager.failSum += 1
    resourceSuccessManagerMap.set(data.context.url, resourceSuccessManager)
  }
  calc() {
    const { resourceSuccessManagerMap } = this
    Array.from(resourceSuccessManagerMap.values()).forEach((item) => item.calc())
    return resourceSuccessManagerMap
  }
}

export const calcResourceSuccessTop = (data: ResourceItemLog[], errData: ResourceErrLog[]) => {
  const resourceSuccessManager = new ResourceSuccessListManager()
  data.forEach((item) => resourceSuccessManager.setResourceData(item))
  errData.forEach((item) => resourceSuccessManager.setResourceErrData(item))
  return resourceSuccessManager.calc()
}

export const calcResourceFailTop = (errData: ResourceErrLog[]) => {
  const resourceFailMap = new Map<string, { value: number, percent: number }>()
  let count = 0
  errData.forEach((item) => {
    count++
    const resourceFail = resourceFailMap.get(item.context.url) || { value: 0, percent: 0 }
    resourceFail.value += 1
    resourceFailMap.set(item.context.url, resourceFail)
  })
  Array.from(resourceFailMap.values()).forEach(item => {
    item.percent = item.value / count
  })

  return resourceFailMap
}
