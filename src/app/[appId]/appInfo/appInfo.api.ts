import { AppInfo } from "@/app/appList/appList.api"
import { serverRequestCommon } from "@/service/request"

const prefix = '/app'
export const getAppInfo = (token: string, appId: AppInfo['appId']) => {
  return serverRequestCommon<AppInfo>({
    method: 'GET',
    url: `${prefix}/${appId}`,
    headers: {
      Authorization: token
    }
  })
}
