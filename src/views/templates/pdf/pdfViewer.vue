<template>
  <div class="hasNavAndTags" :class="this.$store.state.menu.flag.fullscreen?'isFullView':''">
    <vuePdfApp :config="config" :data="data"/>
  </div>
</template>

<script>
import vuePdfApp from '@/components/pdf/pdfApp.vue'

export default {
  name: 'pdfViewer',
  components: {
    vuePdfApp
  },
  props: {},
  data() {
    return {
      data: {
        fileNm: 'pdf-test.pdf', // 'sample.pdf',
        url: 'pdf/' // document.location.origin + '/' // 로컬 테스트일 경우 public 폴더에 테스트 pdf 넣어서 하면 됨
      },
      config: {
        sidebar: {
          viewThumbnail: true,
          viewOutline: true,
          viewAttachments: true
        },
        findbar: true,
        secondaryToolbar: {
          secondaryPresentationMode: true,
          secondaryOpenFile: true,
          secondaryPrint: true,
          secondaryDownload: true,
          secondaryViewBookmark: true,
          firstPage: true,
          lastPage: true,
          pageRotateCw: true,
          pageRotateCcw: true,
          cursorSelectTool: true,
          cursorHandTool: true,
          scrollVertical: true,
          scrollHorizontal: true,
          scrollWrapped: true,
          spreadNone: true,
          spreadOdd: true,
          spreadEven: true,
          documentProperties: true
        },
        toolbar: {
          toolbarViewerLeft: {
            previous: true,
            next: true,
            pageNumber: true
          },
          toolbarViewerRight: {
            presentationMode: true,
            openFile: true,
            print: true,
            download: true,
            viewBookmark: true,
            secondaryToolbarToggle: true
          },
          toolbarViewerMiddle: {
            zoomOut: true,
            zoomIn: true,
            scaleSelectContatiner: true
          }
        },
        viewerContextMenu: true,
        errorWrapper: true
      }
    }
  },
  methods: {}
}
</script>

<style>
</style>
