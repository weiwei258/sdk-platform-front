import requestCommon, { serverRequestCommon } from "@/service/request"


export const getFileListWithServerSide = (token: string, appId: string) => {
  return serverRequestCommon<string[]>({
    url: "/platform/fileList",
    params: {
      appId
    },
    headers: {
      Authorization: token
    }
  })
}

export const getFileList = (appId: string) => {
  return requestCommon<string[]>({
    url: "/platform/fileList",
    method: 'GET',
    params: {
      appId
    },
  })
}

interface deleteFileParams {
  appId: string;
  fileName: string
}
export const deleteFile = (params: deleteFileParams) => {
  return requestCommon<string[]>({
    url: "/platform/file",
    method: 'DELETE',
    params,
  })
}

export const uploadFileList = (appId: string, data: FormData) => {

  return requestCommon<string[]>({
    url: "/platform/upload",
    method: 'POST',
    params: {
      appId
    },
    data,
  })
}
