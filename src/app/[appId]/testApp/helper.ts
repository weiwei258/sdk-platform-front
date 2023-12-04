
// 触发Proise错误
function a() {
  b()
}
function b() {
  throw Error('测试错误')
}
// 触发ReferenceError

export async function triggerPromiseError() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('promise rej test')
    }, 2000)
  })
  await promise
  console.log('成功了')
}

export function triggerJSError() {
  console.log('触发js错误')
  a()
}

export function httpError() {
  const xhr = new XMLHttpRequest()
  xhr.withCredentials = true

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText)
    }
  })

  xhr.open("GET", "http://jsonplaceholder.typicode.com/post")

  xhr.send()
}

export function fetchError() {
  fetch('http://jsonplaceholder.typicode.com/post').then(response => {
    response.json().then(res => {
      console.log(res)
    })
  })
}

export function ImageError() {
  const ImgDom = document.createElement('img');
  ImgDom.src = 'https://example.com/image.jpg'; // Replace with the correct image URL
  document.body.appendChild(ImgDom); // Use "appendChild" instead of "paddeng"
}
