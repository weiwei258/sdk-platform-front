import { getErrorProfilerLogsWithServerSide } from "./errorProfiler.api";
import { View } from './View';
import { getToken } from "@/utils/serverUtils";

const Page = async ({ params: { appId } }: { params: { appId: string } }) => {
  const token = getToken()

  const { data } = await getErrorProfilerLogsWithServerSide(token!, appId)
  return (
    <div>
      <View data={data} appId={appId} />
    </div>
  )
}

export default Page
