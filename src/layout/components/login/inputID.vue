<template>
  <el-form-item>
    <span class="svg-container">
      <svg-icon icon-class="user" />
    </span>
    <el-input
      :placeholder="this.$t('label.member_id')"
      v-model="id"
      name="username"
      type="text"
      tabindex="1"
      autocomplete="on"
      v-on:change="change"
    />
  </el-form-item>
</template>

<script>
import i18n from '@/i18n' // 언어 변환(매칭) component

export default {
  name: 'inputID',
  components: {},
  props: {
    // 로그인 화면 구성 정보
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: ''
    }
  },
  mounted() {
    this.id = this.userId
  },
  methods: {
    change(event) {
      this.$emit('changeId', event)
      // console.log('chagne', event)
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #fff; // #283443;
$dark_gray: #168ff4;
$light_gray: #283443; // #fff;
$cursor: #283443;
.tips {
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;

  span {
    &:first-of-type {
      margin-right: 16px;
    }
  }
}

.svg-container {
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 40px;
  display: inline-block;
}
</style>
