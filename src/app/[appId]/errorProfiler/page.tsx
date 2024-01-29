import { getErrorProfilerLogsWithServerSide } from "./errorProfiler.api";
import { View } from './View';
import { getToken } from "@/utils/serverUtils";
import { getAppId } from '../helper';

const Page = async () => {
  const token = getToken()
  const appId = getAppId()

  const { data } = await getErrorProfilerLogsWithServerSide(token!, appId)
  return (
    <div>
      <View data={data} appId={appId} />
    </div>
  )
}

export default Page
