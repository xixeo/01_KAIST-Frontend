<template>
  <div class="w-full h-full" id="test" v-if="visible">
    <iframe
      v-if="!isReportPopup"
      type="text/html"
      ref="obj"
      id="obj"
      :src="`${this.options.serverUrl}?${this.options.file}&${this.options.param}`"
      width="100%"
      height="100%"
      @load="Load"
    />
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
// import Cookies from 'js-cookie'
// import VueCookies from 'vue-cookies'
// import axios from 'axios'
export default {
  naeme: 'BIRTReport',
  props: {
    options: {
      type: Object,
      default() {
        return {
          serverUrl: 'http://devloggergen.thubiot.com/birt/frameset', // 'http://192.168.3.204:9091/birt/frameset',
          file: '__report=report/test_report.rptdesign',
          // param: 'NM_param=BED',
          width: '100%',
          height: '100%'
        }
      }
    },
    id: {
      type: String,
      default: uuid.v1()
    }
  },
  data() {
    return {
      isLoad: false,
      isReportPopup: true
    }
  },
  watch: {},
  beforeCreate() {
    this.visible = true
    // VueCookies.remove('JSESSIONID')
    // VueCookies.set('JSESSIONID', '187360E65224E8FEAC80EF0B4B905E32', 'null')
  },
  mounted() {
    // window.addEventListener('message', this.listen)
    // CORS 문제로 서로 다른 도메인일 경우 ifrm 처리 에러 발생, 개발 모드에서는 팝업으로 전환
    let hostname = location.hostname
    if (hostname !== 'localhost') this.isReportPopup = false
    if (this.isReportPopup) {
      window.open(
        `${this.options.serverUrl}?${this.options.file}`,
        '_blank'
        // 'width=300, height=300, menubar=no, status=no, toolbar=no, channelmode=yes '
      )
    }
    if (this.options.param) {
      window.open(
        `${this.options.serverUrl}?${this.options.file}&${this.options.param}`,
        '_blank'
        // 'width=300, height=300, menubar=no, status=no, toolbar=no, channelmode=yes '
      )
    }
  },
  beforeDestroy() {
    // window.removeEventListener('message', this.listen)
  },
  methods: {
    // 로딩 완료하면 ID 설정(메시지를 받기 위함)
    Load(...arg) {
      this.isLoad = true
      // this.getChild()?.setID(this.id)
      // this.getChild()?.init(this.options)
    },
    // 자식으로부터 전역 메시지 수신
    listen(event) {
      // 메시지의 오리진을 체크하여 신뢰할 수 있는 메시지인지를 확인
      if (!event.data) return
      if (!event.data.id || event.data.id !== this.id) return
      console.log('listen', event.data)
      this.$emit('message', event)
    },
    getChild() {
      let frame = this.$refs.obj
      return frame.contentWindow || frame.contentDocument
    }
  }
}
</script>

<style lang="scss" scoped></style>
