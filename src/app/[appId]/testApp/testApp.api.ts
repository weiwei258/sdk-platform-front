import { AppInfo } from "@/app/appList/appList.api"
import { serverRequestCommon } from "@/service/request"

const prefix = '/app'

export const getAppInfo = (token: string, appId: AppInfo['appId']) => {
  return serverRequestCommon<AppInfo>({
    url: `${prefix}`,
    params: { appId },
    headers: {
      Authorization: token
    }
  })
}
