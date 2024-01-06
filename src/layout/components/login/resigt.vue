<template>
  <el-button type="warn" class="w-full h-full" @click.native.prevent="regist" label-position="center">
    {{ this.$t('회원 가입/비밀번호 확인') }}
  </el-button>
</template>

<script>
import i18n from '@/i18n' // 언어 변환(매칭) component
export default {
  name: 'regist',
  components: {},
  props: {},
  data() {
    return {}
  },
  mounted() {},
  methods: {
    regist(event) {
      //console.log('change', event)
      this.$emit('clickItem', event)
    }
  }
}
</script>

<style lang="scss" scoped></style>
