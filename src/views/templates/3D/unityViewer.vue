<template>
  <div id="test" class="hasNavAndTags">
    <el-input class="search-input" type="text" v-model="srchText" />
    <el-button @click="sendMsg">sendMsg</el-button>
    <!--<el-button @click="close">close</el-button>
    <el-button @click="fullscreen">fullscreen</el-button>-->
    <!--<iframe :src="url" frameborder="0" scrolling="auto" height="100%" width="100%"></iframe>-->
    <!--<contentPopup>
       <unity ref="unity_obj" :src="unitySrc" width="1000" height="600" :unityLoader="unityLoad"></unity>
    </contentPopup>-->
    <div class="flex w-full h-full">
      <unityWebGL class="w-1/2 h-full" :srcPath="src" :loadBuilder="loader" type="text/html" :sendMessageToUnity="msg"/>
    </div>
  </div>
</template>

<script>
// import unity from 'vue-unity-webgl'
// import contentPopup from '@/components/popup/content' // 팝업 창 컴포넌트

import unityWebGL from '@/components/3D/unityWebGL.vue'

export default {
  name: 'unityViewer',
  components: {
    unityWebGL
  },
  data() {
    return {
      src: '/external/unity/index.html',
      loader: 'static/Build/210628_Ulju.json',
      msg: 'test_unityViewer',
      srchText: ''
    }
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    sendMsg() {
      //this.msg = '=====test_unityViewer====='
      this.msg = this.srchText
      //console.log('click -> ' + this.msg)
    }
  }
}
</script>

<style></style>
