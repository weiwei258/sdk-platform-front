import { getPathname } from "@/utils/serverUtils"

/**
 * url: /8848/dataSnap
 * return 8848
 */
export const getAppId = () => {
  return getPathname().split('/')[1]
}
