<template>
  <div class="fileUpContainer">
    <span
      style="padding-top:17px"
      v-if="this.titleLabel"
      :class="getCssClass()"
    >{{this.$t(this.titleLabel)}}</span>
    <div>
      <DxFileUploader
        :style="`width: ${width};`"
        :accept="accept"
        :selectButtonText="selectButtonText"
        :uploadButtonText="uploadButtonText"
        :labelText="labelText"
        :multiple="multiple"
        :value="fileValue"
        :upload-mode="uploadMode"
        :allowed-file-extensions="fileExtensions"
        :upload-url="uploadUrl"
        :max-file-size="maxFileSize"
        @uploaded="onUploaded"
        @uploadError="onUploadError"
        @valueChanged="valueCheck"
      />
    </div>
  </div>
</template>

<script>
import DxFileUploader from 'devextreme-vue/file-uploader'

export default {
  name: 'dxFileUploader',
  data() {
    return {
      fileValue: []
    }
  },
  components: {
    DxFileUploader
  },
  props: {
    fileid: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: function() {
        return '300px'
      }
    },
    titleLabel: {
      type: String,
      default: () => {
        return ''
      }
    },
    accept: {
      type: String,
      default: () => {
        return '*'
      } // 특정 파일 업로드
    },
    selectButtonText: {
      type: String,
      default: () => {
        return 'Select File'
      } // 파일선택 버튼 text
    },
    uploadButtonText: {
      type: String,
      default: () => {
        return 'Upload'
      } // 업로드 버튼 text
    },
    labelText: {
      type: String,
      default: () => {
        return 'Drop Here'
      } // 마우스 끌어놓기 영역 Text
    },
    multiple: {
      type: Boolean,
      default: () => {
        return false
      } // true : 파일 동시선택, false : 파일 하나만 선택
    },
    uploadUrl: {
      type: String,
      default: () => {
        return 'http://'
      }
    },
    uploadMode: {
      type: String,
      default: () => {
        return 'instantly'
      } // instantly : 바로 등록 , useButtons : 업로드 버튼 사용
    },
    fileExtensions: {
      type: Array,
      default: () => []
    },
    maxFileSize: {
      type: Number,
      default: () => {
        return 0
      } // byte 단위
    },
    required: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  methods: {
    onUploaded(e) {
      console.log('eefefef', JSON.parse(e.request.response))
      const file = e.file
      console.log('file', file)
      this.$emit('onFileUploaded', file, e.request.response)
      this.fileValue = []
    },
    onUploadError(e) {
      console.log('error', e)
      alert('Upload Error')
    },
    valueCheck(e) {
      if (e.value.length > 0) {
        console.log('abort', e)
        // 파일 확장자 체크
        let filename = e.value[0].name
        let fileExt = '.' + filename.slice(filename.lastIndexOf('.') + 1).toLowerCase()
        let extCheck = this.fileExtensions.indexOf(fileExt)
        if (extCheck < 0) {
          this.$emit('onFileUploadedFail', '확장자 오류')
          this.fileValue = []
        }
        // 파일 용량 체크
        let filesize = e.value[0].size
        if (filesize > this.maxFileSize) {
          this.$emit('onFileUploadedFail', '파일용량 오류')
          this.fileValue = []
        }
      }
    },
    onValueChanged(e) {
      const previousValue = e.previousValue
      const newValue = e.value
      this.$emit('input', this.dateid, e)
      this.$emit('onValueChanged', this.dateid, e)
    },

    openDetailPop(params) {
      // this.init()
      // this.getDetail(params)
      // this.popupVisible = true
      console.log(params)
    },
    getCssClass() {
      const classObject = {}
      classObject[`label text-key mr-2`] = this.required
      classObject[`label text-dark mr-2`] = !this.required
      return classObject
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/styles/themeB/variables.scss';

.fileUpContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  flex-basis: auto;

  .label {
    //flex-basis: 80px;
    line-height: 36px;
    text-align: right;
  }
}
</style>