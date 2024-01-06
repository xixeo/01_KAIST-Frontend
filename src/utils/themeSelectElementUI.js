function getFile(url, isBlob = false) {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest()
    client.responseType = isBlob ? 'blob' : ''
    client.onreadystatechange = () => {
      if (client.readyState !== 4) {
        return
      }
      if (client.status === 200) {
        const urlArr = client.responseURL.split('/')
        resolve({
          data: client.response,
          url: urlArr[urlArr.length - 1]
        })
      } else {
        reject(new Error(client.statusText))
      }
    }
    client.open('GET', url)
    client.send()
  })
}
// 새 스타일 head에 추가 또는 갱신
function writeNewStyle(id, styleData) {
  let cssText = styleData
  // Object.keys(this.colors).forEach(key => {
  //   cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + this.colors[key])
  // })
  // console.log('writeNewStyle', document.styleSheets.length, this.originalStylesheetCount, document.getElementById('elementui'))
  if (!document.getElementById(id)) {
    let style = document.createElement('style')
    style.setAttribute('id', id)
    style.innerText = cssText
    document.head.appendChild(style)
  } else {
    document.head.lastChild.innerText = cssText
  }
}
// 특정 아이디의 스타일 색상 변경
function getStyleTemplate(data) {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  for (var key in colorMap) {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  }
  return data
}

function getSeparatedStyles() {
  getFile('//unpkg.com/element-ui/lib/theme-chalk/')
    .then(({ data }) => {
      return data.match(/href="[\w-]+\.css"/g).map(str => str.split('"')[1])
    })
    .then(styleFiles => {
      return Promise.all(
        styleFiles.map(file => {
          return getFile(`//unpkg.com/element-ui/lib/theme-chalk/${file}`)
        })
      )
    })
    .then(files => {
      let styleFiles = files.map(file => {
        return {
          name: file.url,
          data: getStyleTemplate(file.data)
        }
      })
    })
}
// 폰트 파일 로딩
function getFontFiles(id, theme) {
  let fontFile = ['element-icons.ttf', 'element-icons.woff']
  Promise.all(
    fontFile.map(font => {
      // let path = `//unpkg.com/element-ui/lib/theme-chalk/fonts/${font}`
      let path = `/assets/theme/${id}/${theme}/fonts/${font}`
      // console.log('getFontFiles', path)
      return getFile(path, true)
    })
  ).then(fonts => {
    // let fonts = fonts
  })
}

// css 파일 로딩
export function changeStyle(theme, id) {
  // let path = '//unpkg.com/element-ui/lib/theme-chalk/index.css'
  let path = `/assets/theme/${id}/${theme}/index.css`
  getFile(path).then(({ data }) => {
    let StyleData = data // this.getStyleTemplate(data)
    //console.log('changeStyle', theme, data.length)
    // this.getFontFiles(id, theme)
    writeNewStyle(id, StyleData)
  })
}
