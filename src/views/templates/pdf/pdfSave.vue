<template>
  <div id="#test" class="bg-gray-0 w-full h-full" style="overflow-y: hidden;">
    <!--<el-button @click="makePDF('#app')">전체 PDF 저장</el-button>-->
    <el-button @click="makePDF('body')">전체 PDF 저장</el-button>
    <el-button @click="makePDF('#test')">body PDF 저장</el-button>
    <el-button @click="makePDF('#area')">영역 PDF 저장</el-button>
    <div id="#area" class="w-full bg-gray-300" style="height: 100vh;">영역</div>
    <div id="pdf"/>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
export default {
  name: 'pdfSaveTeamplate',
  components: {},
  mounted() {},
  beforeDestroy() {},
  data() {
    return {}
  },
  methods: {
    /// 해당 dom 화면을 pdf로 변환 (*해당 dom의 높이가 반드시 있어야함...)
    makePDF(element = 'body') {
      // #app은 전체
      let doc = document.querySelector(element) ? document.querySelector(element) : document.getElementById(element)
      html2canvas(doc, { imageTimeout: 5000, useCORS: true }).then(canvas => {
        console.log(canvas)
        document.getElementById('pdf').appendChild(canvas)
        let img = canvas.toDataURL('image/png')
        let pdf = new jsPDF('portrait', 'mm', 'a4')
        pdf.addImage(img, 'JPEG', 0, 0, 210, 295)
        pdf.save('relatorio-remoto.pdf')
        document.getElementById('pdf').innerHTML = ''
      })
    }
  }
}
</script>
<style scoped>
</style>
