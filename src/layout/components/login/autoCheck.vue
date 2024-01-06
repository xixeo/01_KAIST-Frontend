<template>
  <el-checkbox name="autoLogin" id v-model="isAuto" @change="change">{{ this.$t('label.member_autologin') }}</el-checkbox>
</template>

<script>
import i18n from '@/i18n' // 언어 변환(매칭) component
export default {
  name: 'loginAutoCheck',
  components: {},
  props: {
    isAutoLogin: Boolean
  },
  data() {
    return {
      isAuto: false
    }
  },
  mounted() {
    this.isAuto = this.isAutoLogin
  },
  methods: {
    change(event) {
      //console.log('change', event)
      this.$emit('change', event)
    }
  }
}
</script>

<style lang="scss" scoped></style>
