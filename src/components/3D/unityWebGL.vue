<template>
  <div class="w-full h-full">
    <template v-if="visibleToolBar">
      <el-button @click="reLoad">reLoad</el-button>
      <el-button @click="funcTest">funcTest</el-button>
      <el-button @click="fullscreen">fullscreen</el-button>
    </template>
    <!--<contentPopup>
       <unity ref="unity_obj" :src="unitySrc" width="1000" height="600" :unityLoader="unityLoad"></unity>
    </contentPopup>-->
    <iframe
      ref="ifrmWebGL"
      :id="id"
      :class="classStr"
      :type="type"
      :src="srcPath"
      @load="unityLoad"
      width="100%"
      height="100%"
    />
  </div>
</template>

<script>
// import unity from 'vue-unity-webgl'
// import contentPopup from '@/components/popup/content' // 팝업 창 컴포넌트

import { uuid } from 'vue-uuid'
import testData from '@/api/template/mock/unityData.json'

export default {
  name: 'unityWebGL',
  components: {
    // unity,
    // contentPopup
  },
  props: {
    visibleToolBar: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: uuid.v1()
    },
    type: {
      type: String,
      default: 'text/html'
    },
    classStr: {
      type: String,
      default: 'w-full'
    },
    srcPath: {
      type: String,
      default: ''
    },
    loadBuilder: {
      type: String,
      default: ''
    },
    sendMessageToUnity: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      
    }
  },
  watch: {
    sendMessageToUnity: {
      deep: true,
      handler() {
        //console.log('watch --> ', this.sendMessageToUnity)
        this.sendToUnity(this.sendMessageToUnity)
      }
    }
  },
  mounted() {
    window.addEventListener('message', this.listen)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.listen)
  },
  methods: {
    /// iframe이 로딩 완료되면 동작되도록 처리함
    unityLoad(arg) {
      this.reLoad()
    },
    listen(event) {
      // 메시지의 오리진을 체크하여 신뢰할 수 있는 메시지인지를 확인
      if (!event.data) return
      if (!event.data.id || event.data.id !== this.id) return
      //console.log('listen', event.data)
      this.$emit('message', event)
    },
    /// 데이터로드 주의사항( 현재 메모리 해제가 안됨 계속 로드하면 메모리 증가함. )
    reLoad() {
      this.getChild().setID(this.id)
      this.getChild().loadBuilder(this.loadBuilder)
    },
    sendToUnity(msg) {
      console.log('sendToUnity --> ', msg)
      this.getChild().sendToUnity(msg)
    },
    funcTest() {
      this.getChild().sendToUnity(JSON.stringify(testData))
    },
    close() {
      //this.getChild().close() // 동작 안됨
    },
    /// 전체화면
    fullscreen() {
      this.getChild().fullscreen()
    },
    getChild() {
      let frame = this.$refs.ifrmWebGL
      return frame.contentWindow || frame.contentDocument
    }
  }
}
</script>

<style></style>
