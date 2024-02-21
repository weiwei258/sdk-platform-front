import { getResourceLogs } from "./dataSnap.api";
import { View } from './View';
import { getToken } from "@/utils/serverUtils";

const Page = async ({ params: { appId } }: { params: { appId: string } }) => {
  const token = getToken()
  const { data } = await getResourceLogs(token!, appId)

  return (
    <div>
      <View data={data} />
    </div>
  )
}

export default Page
