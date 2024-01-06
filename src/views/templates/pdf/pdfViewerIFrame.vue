<template>
  <div class="hasNavAndTags" :class="this.$store.state.menu.flag.fullscreen?'isFullView':''">
    <!--<div class="w-full mx-auto pt-2">
      <a @click="copy">iframe 템플릿</a>
    </div>-->
    <iframe :src="url" frameborder="0" scrolling="auto" height="100%" width="100%"></iframe>
    <!-- <embed
          :src="pdfLink"
          type="application/pdf"
          frameBorder="0"
          scrolling="auto"
          height="100%"
          width="100%"
    ></embed>-->
  </div>
</template>

<script>
// import { api_copyToServer } from '@/api/template/pdfTemplate' // api 호출

export default {
  name: 'pdfViewerIFrame',
  components: {},
  data() {
    return {
      url: '/pdf/pdf-test.pdf', // 'http://www.orimi.com/pdf-test.pdf'
      domain: 'http://www.orimi.com/'
    }
  },
  methods: {
    copy() {
      this.pdfLink()
      // api_copyToServer(this.inputCopyData).then(res => {
      //   this.pdfLink()
      // })
    },
    pdfLink() {
      var address = document.location.href.split('#')
      // this.url = address[0] + '#/' + 'sample.pdf'
      // this.url = 'http://www.orimi.com/pdf-test.pdf' // this.domain + this.inputCopyData.fileNm
      console.log(' @url : ' + this.url)
      return this.url
    }
  }
}
</script>

<style>
</style>
