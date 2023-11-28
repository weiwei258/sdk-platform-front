import { getToken } from '@/utils/serverUtils'
import { PageView } from './View'
import { getAppId } from './serverHelper'
import { getAppInfo } from './testApp.api'

const Page = async () => {
  const appId = getAppId()
  const token = getToken()
  const { data } = await getAppInfo(token!, appId)

  return <PageView appInfo={data} />
}

export default Page
