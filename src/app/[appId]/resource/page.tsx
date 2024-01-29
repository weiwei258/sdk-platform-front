import { getToken } from '@/utils/serverUtils'
import { View } from './View'
import { getAppId } from '../helper'
import { getResourceErrLogsWithServerSide, getResourceLogsWithServerSide } from './errorProfiler.api'

const Page = async () => {
  const token = getToken()
  const appId = getAppId()

  const { data } = await getResourceLogsWithServerSide(token!, appId)
  const { data: errData } = await getResourceErrLogsWithServerSide(token!, appId)

  return <View data={data} errData={errData} />
}

export default Page


