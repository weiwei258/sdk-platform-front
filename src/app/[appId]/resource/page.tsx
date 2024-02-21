import { getToken } from '@/utils/serverUtils'
import { View } from './View'
import { getResourceErrLogsWithServerSide, getResourceLogsWithServerSide } from './errorProfiler.api'

const Page = async ({ params: { appId } }: { params: { appId: string } }) => {
  const token = getToken()

  const { data } = await getResourceLogsWithServerSide(token!, appId)
  const { data: errData } = await getResourceErrLogsWithServerSide(token!, appId)

  return <View appId={appId} data={data} errData={errData} />
}

export default Page


