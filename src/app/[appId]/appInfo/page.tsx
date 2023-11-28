import { getToken } from "@/utils/serverUtils"
import { getAppId } from "../helper"

const Page = () => {
  const token = getToken()
  const appId = getAppId()

  return <div>Info</div>
}

export default Page
