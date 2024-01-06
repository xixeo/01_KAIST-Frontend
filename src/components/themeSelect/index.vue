<template>
  <editorsLayout class="w-full h-full" ref="themeInfo" :layoutData="seletedTheme" @onValueChanged="changeTheme" />
</template>

<script>
import envs from '@/envs'
import localStore from '@/utils/localStore'
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트
import layout from './data/layout' // 레이아웃 정보
import defaultDevExtrmeCssList from './data/devExtreme' // devExtreme 기본 테마 css 리스트
import themes from '@/assets/theme/echart/themeList.js'
import { changeStyle } from '@/utils/themeSelectElementUI.js'

export default {
  components: {
    editorsLayout
  },
  props: {
    // 선택할 테마 정보(theme, elementui, devExtreme, echart)
    id: {
      type: String,
      default: 'theme'
    },
    // 테마 셀렉터의 타이틀
    title: {
      type: String
    },
    /// 로컬 스토리지 저장 여부
    isSaveLocalStore: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      themesLayout: layout(),
      devExtremeThemes: defaultDevExtrmeCssList(),
      seletedTheme: {},
      originalStylesheetCount: -1,
      originalStyle: '',
      styleFiles: [],
      fonts: []
    }
  },
  created() {
    this.seletedTheme = this.themesLayout[this.id] // id로 테마 카테고리 분류
    let theme = this.seletedTheme.editorList[0] // .find(editor => editor.id === 'theme')
    if (this.title) theme.title.label = this.title // 타이틀이 있으면 정보 갱신

    switch (this.id) {
      case 'theme':
        {
          envs.framework.template.pcThemes.forEach(item => {
            theme?.itemList.push({ value: item.id, label: item.name })
          })
          this.setTheme('pc-theme')
        }
        break
      case 'devExtreme':
        {
          let idx = 0
          // 기본 테마 정보
          this.devExtremeThemes.forEach(item => {
            idx++
            theme?.itemList.push({ value: idx + ':' + item, label: item })
          })
          // 프레임워크 내부 정의 테마
          envs.framework.template.pcThemes.forEach(item => {
            idx++
            theme?.itemList.push({ value: idx + ':' + item.devExtreme, label: item.devExtreme })
          })
          this.setTheme('theme-devExtreme')
        }
        break
      case 'elementui':
        {
          envs.framework.template.pcThemes.forEach((item, index) => {
            theme?.itemList.push({ value: index + ':' + item.elementui, label: item.elementui })
          })
          this.setTheme('theme-elementui')
        }
        break
      case 'echart':
        {
          // envs.framework.template.pcThemes.forEach((item, index) => {
          //   theme?.itemList.push({ value: index + ':' + item.echart, label: item.echart })
          // })
          themes.items.forEach((item, index) => {
            theme?.itemList.push({ value: index + ':' + item.value, label: item.text })
          })
          this.setTheme('theme-echart')
        }
        break
    }
  },
  mounted() {},
  methods: {
    setTheme(themeKind) {
      let localTheme = localStore.get(themeKind)
      let findItem = this.seletedTheme.editorList[0]?.itemList.find(item => item.value.includes(localTheme))
      this.seletedTheme.editorList[0].value = findItem.value
    },
    changeTheme(arg) {
      // console.log(arg, arg[1].value)
      switch (this.id) {
        case 'theme':
          {
            let theme = envs.framework.template.pcThemes.find(item => item.id === arg[1].value)
            console.log('theme : ' + theme)
            if (this.isSaveLocalStore) {
              localStore.set('pc-theme', theme.id) // 테마 정보 저장
              localStore.set('theme-devExtreme', theme.devExtreme) // 테마 정보 저장
              localStore.set('theme-elementui', theme.elementui) // 테마 정보 저장
              localStore.set('theme-echart', theme.echart) // 테마 정보 저장
            }
            this.$emit('change', theme)

            // require('@/assets/theme/element-ui/' + theme.elementui + '/index.css')
          }
          break
        case 'devExtreme':
          {
            let data = arg[1].value.toString().split(':')
            if (data && this.isSaveLocalStore) localStore.set('theme-devExtreme', data[1]) // 테마 정보 저장
            this.$emit('change', data[1])
          }
          break
        case 'elementui':
          {
            let data = arg[1].value.toString().split(':')
            if (data && this.isSaveLocalStore) localStore.set('theme-elementui', data[1]) // 테마 정보 저장
            this.$emit('change', data[1])
            // require('element-ui/lib/theme-chalk/reset.css') // element ui 테마 css 적용
            // require('element-ui/lib/theme-chalk/index.css') // element ui 테마 css 적용
            // require('@/assets/theme/element-ui/' + data[1] + '/index.css') // element ui 테마 css 적용
            // this.changeStyle(data[1], 'element-ui')
            changeStyle(data[1], 'element-ui')
          }
          break
        case 'echart':
          {
            let data = arg[1].value.toString().split(':')
            if (data && this.isSaveLocalStore) localStore.set('theme-echart', data[1]) // 테마 정보 저장
            this.$emit('change', data[1])
          }
          break
      }
      if (this.id !== 'echart') location.reload() // 화면 재 갱신
    }
  }
}
</script>

<style scoped></style>
