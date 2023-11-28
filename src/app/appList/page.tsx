import { getToken } from "@/utils/serverUtils"
import { getAppList } from "./appList.api"
import { PageView } from './View'

const Page = async () => {
  const token = getToken()
  const { data: appList } = await getAppList(token || '')

  return <PageView appList={appList} />
}

export default Page
