import { getToken } from "@/utils/serverUtils"

const Page = ({ params: { appId } }: { params: { appId: string } }) => {
  const token = getToken()

  return <div>Info</div>
}

export default Page
