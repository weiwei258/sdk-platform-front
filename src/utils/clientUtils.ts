export const delay = (delayTime: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, delayTime)
  },)
}
