// 차트 리스트 (레퍼런스, 호출 함수, api 함수, 실시간) 정보
// let chartRefs = []
// let isSuspend = false
let procApi = {
  // chart 리스트에 아이템 추가
  pushItem(refs, obj) {
    refs.push(obj)
  },
  // 해당 차트의 사용 여부 설정
  setUse(refs, name, use) {
    refs.forEach((item, index) => {
      if (item.name === name) item.use = use
    })
    // console.log(name, refs)
  },
  // interval 설정
  setInterval(refs, name, interval) {
    refs.forEach((item, index) => {
      if (item.name === name) item.interval = interval
    })
    // console.log(name, refs)
  },
  // 생성된 정보들 제거
  destroy(refs) {
    // console.log('destroy', refs.length)
    if (refs && refs.length > 0) {
      refs.forEach(item => {
        if (item.t) clearInterval(item.t)
      })

      for (let i = 0; i < refs.length; i++) {
        refs.pop()
      }
    }
    refs = []
  },
  // 자동 반복 호출에 사용(사용하지 않을경우 호출하지 않으면 됨)
  processes(refs, interval) {
    // this.chartControl() // 차트 데이터 변경 재생
    refs.forEach(item => {
      if (item.interval && item.interval > 0) {
        item.t = setInterval(() => {
          // console.log('check', item.name, item.t)
          this.process(item)
        }, interval)
      }
    })
  },
  // 인터벌로 호출하는 모든 api를 일시정지 시킴
  async suspend(refs) {
    refs.forEach(item => {
      item.isSuspend = true
      console.log('suspend', item.name, item.isSuspend)
    })
  },
  // suspend된 프로스세를 다시 기동시킴
  async restart(refs) {
    refs.forEach(item => {
      item.isSuspend = false
      console.log('restart', item.name, item.isSuspend)
    })
  },
  // 한번만 호출하는데 사용
  instance(refs, name, req) {
    // console.log('instance call', name, refs)
    refs.forEach(item => {
      if (item.use) {
        if (name === item.name && item.api) {
          // console.log(name, item.name, req || item.req)
          item
            .api(req || item.req) // API 호출
            .then(res => {
              // console.log(res)
              // item.result = _.cloneDeep(res) // 결과 데이터 저장(object 복사 이용)
              if (item.chart) {
                item.chart.name = item.name
              } // else console.log(`chart(${item.name}) is undeifned. check refs`)
              if (item.fn) {
                item.fn(res, item.chart) // 차트 연결 함수 호출
              } else console.log(`chart(${item.name}) is not a function. resgit func`)
            })
            .catch(reject => {
              console.log('err', item.name, req || item.req, reject)
              if (item.fn && item.useError === true) {
                item.fn(reject, item.chart) // 차트 연결 함수 호출
              }
            })
        }
      }
    })
  },
  // 해당 장비의 정보 요청 처리 함수
  process(item) {
    if (item.use === false) return
    // console.log(item.name, item.isSuspend)
    if (item.isSuspend === true) return
    if (!item.interval) return
    try {
      // let chart = item.chart.options // 해당 차트
      let date = new Date()
      let curTime = date.getTime()
      let isCheckTime = curTime - item.lastTime >= item.interval
      // console.log(item.name, curTime - item.lastTime, item.interval)
      if (isCheckTime) {
        // console.log(item.name, curTime - item.lastTime)
        item.lastTime = curTime
        if (item.init && item.init.use) {
          // console.log(item.init.req)
          item.init
            .api(item.init.req) // API 호출
            .then(res => {
              // console.log(res)
              if (item.chart) {
                item.chart.name = item.name
                if (item.fn) item.fn(res, item.chart) // 차트 연결 함수 호출
              } else console.log(`chart(${item.name}) is undeifned. check refs`)
            })
            .catch(() => {
              console.log('err', item.name, item.req, item.init.api)
            })
          item.init.use = false
        } else if (item.api) {
          // console.log(name, item.name, item.req)
          item
            .api(item.req) // API 호출
            .then(res => {
              // console.log(res)
              // item.result = _.cloneDeep(res) // 결과 데이터 저장(object 복사 이용)
              if (item.chart) {
                item.chart.name = item.name
              }
              if (item.fn) {
                item.fn(res, item.chart) // 차트 연결 함수 호출
              } else console.log(`chart(${item.name}) is not a function. resgit func`)
              // else console.log(`chart(${item.name}) is undeifned. check refs`)
            })
            .catch(() => {
              console.log('err', item.name, item.req, item.api)
            })
        }
      } else if (item.realTime && item.realTime.use) {
        item.realTime.fn(item.chart, date)
      }
    } catch (e) {
      console.log('processChart Exception', e)
    }
  }
}

export default procApi
