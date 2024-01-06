<template>
  <el-button
    :loading="isLoading"
    type="primary"
    class="w-full h-full"
    style="background=#1976D2"
    @click.native.prevent="signIn"
    label-position="center"
  >
    {{ this.$t('label.member_login') }}
  </el-button>
</template>

<script>
import i18n from '@/i18n' // 언어 변환(매칭) component

export default {
  name: 'loginSignIn',
  components: {},
  props: {
    // 로그인 화면 구성 정보
    isLoading: Boolean
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    signIn(event) {
      this.$emit('signIn', event)
    }
  }
}
</script>

<style lang="scss" scoped></style>
