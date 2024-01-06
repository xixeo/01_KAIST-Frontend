<template>
  <layout/>
</template>

<script>
import envs from '@/envs'
import _ from 'lodash'
import localStore from '@/utils/localStore'

// 테마 레이아웃 설정
var themeType = localStore.get('pc-theme') ? localStore.get('pc-theme') : envs.framework.template.pc
var layout
var target = _.find(envs.framework.template.pcThemes, { id: themeType })
console.log('#target : ' + themeType + ' ----> '+ JSON.stringify(target))
//console.log('#target.component : ' + target.component)
layout = target.component // 해당 vue 연결
//console.log('#layout : ' + layout)
export default {
  name: 'Layout',
  components: {
    layout
  },
  data() {
    return {}
  }
}
</script>

