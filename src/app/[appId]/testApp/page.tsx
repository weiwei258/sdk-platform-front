import { getToken } from '@/utils/serverUtils'
import { PageView } from './View'
import { getAppInfo } from './testApp.api'

const Page = async ({ params: { appId } }: { params: { appId: string } }) => {
  const token = getToken()
  const { data } = await getAppInfo(token!, appId)

  return <PageView appInfo={data} />
}

export default Page
