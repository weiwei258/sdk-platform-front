import { getToken } from '@/utils/serverUtils'
import { getFileListWithServerSide } from './mapManager.api'
import { View } from './View'

const Page = async ({ params: { appId } }: { params: { appId: string } }) => {
  const token = getToken()
  const { data } = await getFileListWithServerSide(token!, appId)
  return <View data={data.reverse()} appId={appId} />
}

export default Page
