import { getPathname } from '@/utils/serverUtils'

/**
 * url: /testApp/8848
 * return 8848
 */
export const getAppId = () => {
  return getPathname().split('/')[2]
}
