import { getToken } from "@/utils/serverUtils"
import { View } from "./View"
import { getPerformanceLogsWithServerSide } from "./performance.api"

const Page = async ({ params: { appId } }: { params: { appId: string } }) => {
  const token = getToken()
  const { data } = await getPerformanceLogsWithServerSide(token!, appId)
  return <View data={data} appId={appId} />
}

export default Page


