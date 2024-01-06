<template>
  <div class="com-windy" id="test" v-if="visibleMap">
    <!--<el-button @click="test"> dom Create</el-button>
    <el-button @click="windyCreate"> windy Create</el-button>
    <el-button @click="remove"> dom Remove</el-button>-->
    <iframe
      type="text/html"
      ref="obj"
      id="obj"
      src="/external/windy/index.html"
      width="100%"
      height="100%"
      @load="windyLoad"
    />
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
export default {
  naeme: 'WindyComponent',
  props: {
    prsMapData: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      type: String,
      default: uuid.v1()
    }
  },
  data() {
    return {
      options: {
        // Required: API key
        key: 'uLkDsW9OswoWaRzkAXoTjCRyvSLAnI6i', // REPLACE WITH YOUR KEY !!!
        // key: 'OQGxxAGGRS9R3KwEMw8a3kTHyNtcZSCf', // Trial API Key

        // Put additional console output
        verbose: false,

        // Optional: Initial state of the map
        lat: 34.6,
        lon: 128.9,
        zoom: 9
      },

      isLoad: false
    }
  },
  watch: {
    prsMapData(val) {
      if (this.isLoad) this.getChild().setData(this.prsMapData)
    }
  },
  beforeCreate() {
    this.visibleMap = true
  },
  mounted() {
    window.addEventListener('message', this.listen)
    // this.drawMap()
  },
  beforeDestroy() {
    window.removeEventListener('message', this.listen)
  },
  methods: {
    // 로딩 완료하면 ID 설정(메시지를 받기 위함)
    windyLoad(...arg) {
      this.isLoad = true
      this.getChild()?.setID(this.id)
      this.getChild()?.init(this.options)
    },
    // 자식으로부터 전역 메시지 수신
    listen(event) {
      // 메시지의 오리진을 체크하여 신뢰할 수 있는 메시지인지를 확인
      if (!event.data) return
      if (!event.data.id || event.data.id !== this.id) return
      console.log('listen', event.data)
      this.getChild()?.setData(this.prsMapData)
      this.$emit('message', event)
    },
    getChild() {
      let frame = this.$refs.obj
      return frame.contentWindow || frame.contentDocument
    }
  }
}
</script>

<style lang="scss" scoped>
.com-windy {
  width: 100%;
  height: 100%;

  #windy {
    width: 100%;
    height: 100%;
  }
}
</style>
