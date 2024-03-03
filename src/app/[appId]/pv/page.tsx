import { getToken } from "@/utils/serverUtils"
import { getPvLogsWithServerSide } from "./pv.api"
import { View } from "./View"

const Page = async ({ params: { appId } }: { params: { appId: string } }) => {
  const token = getToken()

  const { data } = await getPvLogsWithServerSide(token!, appId)

  return <View data={data} appId={appId} />
}

export default Page
