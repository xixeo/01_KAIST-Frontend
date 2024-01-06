<template>
  <el-tooltip v-model="tooltip" content="Caps lock is On" placement="right" manual>
    <el-form-item>
      <span class="svg-container">
        <svg-icon icon-class="password" />
      </span>
      <el-input
        ref="password"
        v-model="pw"
        :type="type"
        :placeholder="this.$t('label.member_password')"
        name="password"
        tabindex="2"
        autocomplete="on"
        @keyup.native="checkCapslock"
        @blur="tooltip = false"
        @keyup.enter.native="signIn"
        v-on:change="change"
      />
      <div>
        <p class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="type === 'password' ? 'eye' : 'eye-open'" />
        </p>
      </div>
    </el-form-item>
  </el-tooltip>
</template>

<script>
import i18n from '@/i18n' // 언어 변환(매칭) component

export default {
  name: 'inputPW',
  components: {},
  props: {
    // 로그인 화면 구성 정보
    userPassword: {
      type: String,
      default: ''
    },
    passwordType: String,
    capsTooltip: String
  },
  data() {
    return {
      pw: '',
      type: '',
      tooltip: ''
    }
  },
  mounted() {
    this.pw = this.userPassword
    this.type = this.passwordType
    this.tooltip = this.capsTooltip
  },
  methods: {
    // Capslock 동작 확인 및 툴팁 출력
    checkCapslock(e) {
      // console.log('checkCapslock', e)
      const { key } = e
      this.tooltip = key && key.length === 1 && key >= 'A' && key <= 'Z'
    },
    // 암호 비이기감추기
    showPwd() {
      this.type = this.type === 'password' ? '' : 'password'
      this.$nextTick(() => {
        // this.$refs.password.focus()
        this.$refs.password.$el.getElementsByTagName('input')[0].focus()
      })
    },
    change(event) {
      // console.log('chagne', this.pw)
      this.$emit('change', this.pw)
    },
    signIn(event) {
      this.change()
      this.$emit('signIn', event)
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

.el-input {
  display: inline-block;
  height: 40px;
  width: 78%;

  input {
    background: $bg;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 1px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
    height: 100%;
    caret-color: $cursor;

    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px $bg inset !important;
      -webkit-text-fill-color: $cursor !important;
    }
  }
}

.show-pwd {
  position: absolute;
  right: 12%;
  top: 38%;
  font-size: 120%;
  color: $dark_gray;
  cursor: pointer;
  user-select: none;
}
</style>
