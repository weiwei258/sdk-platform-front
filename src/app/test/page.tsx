import { cookies } from "next/headers"

async function getArtist(username: string) {
  return Promise.resolve({name:'8848'})
}
 
async function getArtistAlbums(username: string) {
  return Promise.resolve({test:'123'})
}
 
export default async function Page({
  params: { username },
}: {
  params: { username: string }
}) {
  // Initiate both requests in parallel
  const artistData = getArtist(username)
  const albumsData = getArtistAlbums(username)
 
  // Wait for the promises to resolve
  const [artist, albums] = await Promise.all([artistData, albumsData])
 
  return (
    <>
      <h1 >{artist.name}</h1>
    
    </>
  )
}