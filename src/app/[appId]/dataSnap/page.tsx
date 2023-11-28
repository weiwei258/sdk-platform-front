import { getResourceLogs } from "./dataSnap.api";
import { View } from './View';
import { getToken } from "@/utils/serverUtils";
import { getAppId } from '../helper';

const Page = async () => {
  const token = getToken()
  const appId = getAppId()
  const { data } = await getResourceLogs(token!, appId)

  return (
    <div>
      <View data={data} />
    </div>
  )
}

export default Page
