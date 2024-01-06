<template>
  <div class="login-container">
    <!--배경 이미지-->
    <img :src="layouts.bgImage" class="w-full h-full fixed" />
    <!--로그인 폼-->
    <el-form class="login-form" autocomplete="on" label-position="left">
      <div :class="`grid auto-rows-max grid-cols-${layouts.layout.columns}`">
        <div v-for="(item, key, index) in layouts.layout" :key="index" :class="getLayoutClass(item)" :style="item.style">
          <!-- 헤더 -->
          <loginHeader :items="item" v-if="key === 'header'" />

          <!-- 도메인 선택창 -->
          <selectDomain :domainData="domainData" @onValueChanged="valueChanged" v-if="key === 'domainSelection'" />
          <!-- 아이디 -->
          <loginID :userId="userId" @changeId="userId = $event" v-if="key === 'id'" />
          <!-- 패스워드 -->
          <loginPW :userPassword="userPassword" :passwordType="passwordType" @change="userPassword = $event" @signIn="signIn" v-if="key === 'pw'" />
          <!-- 자동 로그인 여부 -->
          <loginAutoCheck :isAutoLogin="isAutoLogin" @change="isAutoLogin = $event" v-if="key === 'autologin'" />
          <!-- 회원가입/비밀번호 확인 -->
          <loginRegist @clickItem="resigt" v-if="key === 'register'" />
          <!-- 로그인 버튼 -->
          <loginSignIn :loading="isLoading" @signIn="signIn" v-if="key === 'login'" />
          <!-- 하단부 로고 이미지 -->
          <loginFooter :items="layouts.layout.footer" v-if="key === 'footer'" />
          <el-button type="secondary" class="mt-3" size="mini" style="margin-left:46%;" v-if="key === 'openApiLink'" @click="MoveToOpenApiService"
            >OPEN API SERVICE</el-button
          >
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import store from '@/store'
import i18n from '@/i18n' // 언어 변환(매칭) componen
import localStore from '@/utils/localStore'
// import RouterSectionVue from './RouterSection.vue'
// import router from '@/router'
import loginLayout from './data/loginLayout'
import loginHeader from './login/header'
import loginID from './login/inputID'
import loginPW from './login/inputPW'
import loginAutoCheck from './login/autoCheck'
import loginRegist from './login/resigt'
import loginSignIn from './login/signIn'
import loginFooter from './login/footter'
import selectDomain from './login/selectDomain'
import { getDomainListData } from '@/api/system/domainManage' // 도메인 리스트 api 호출
import envs from '@/envs'
// import VueGridLayout from 'vue-grid-layout'

export default {
  components: {
    loginHeader,
    loginID,
    loginPW,
    loginAutoCheck,
    loginRegist,
    loginSignIn,
    loginFooter,
    selectDomain
    // gridLayout: VueGridLayout.GridLayout,
    // gridItem: VueGridLayout.GridItem
    //ModalPopup,
    //ErrorPopup
  },
  props: {
    // 로그인 화면 구성 정보
    items: {
      type: Object,
      default: function() {
        return {
          bgImage: require(`@/assets/images/bg/background.png`), //2021-10-13 by lyj
          layout: {
            columns: 10,
            header: {
              row: [1, 1],
              col: [1, 10],
              class: 'pb-1 large',
              title: {
                label: 'KAIST DATA Broker' //by lyj
              }
            },

            id: { row: [2, 1], col: [2, 8], class: '' },
            pw: { row: [3, 1], col: [2, 8], style: 'height: 2.5rem;' },
            autologin: { row: [4, 1], col: [2, 3], class: '', style: 'margin-top: 0.5rem; padding-bottom: 1.5rem;', use: true },
            // register: { row: [4, 1], col: [6, 4], class: 'mt-2 pb-6', use: false },
            login: { row: [5, 1], col: [2, 8], class: '' },
            openApiLink: { row: [6, 1], col: [1, 8], class: '' },
            footer: {
              row: [7, 1],
              col: [1, 10],
              class: 'pt-10',
              isOnlyImage: true,
              ciImage: {
                src: require('@/assets/images/ci/team_logo.png'),
                style: 'display: inline-block; object-position: center; margin: 5% 20% 5% 20%;',
                class: ''
              }
            }
          }
        }
      }
    }
  },
  data() {
    return {
      layouts: loginLayout,
      userId: '',
      userPassword: '',
      isLoading: false,
      idEmpty: false,
      pwEmpty: false,
      idPwCheck: false,
      passwordType: 'password',
      capsTooltip: false,
      isAutoLogin: false,
      domainData: {
        id: 'domainData',
        ref: 'domainData',
        value: 'A00001', //admin-> A00001// 슈퍼도메인 고정 //윤주
        itemList: [],
        placeholder: 'label.select_domain',
        style: 'margin-bottom: 1.5rem;',
        visible: true
      },
      open_api_url: 'http://52.78.247.4:9007/swagger-ui.html'
    }
  },
  watch: {
    items: {
      deep: true,
      handler(val) {
        console.log('items change', val)
      }
    }
  },
  created() {
    this.layouts = this.items
    this.isAutoLogin = Boolean(localStore.get('isAutoLogin'))
    this.getDomainList() // 도메인 리스트 호출
  },
  mounted() {
    // console.log(this.items)
  },
  methods: {
    MoveToOpenApiService() {
      window.open(this.open_api_url, '_blank')
      console.log('MoveToOpenApiService')
    },
    getLayoutClass(item) {
      if (!item || typeof item !== 'object') return ''
      let result = ''
      result += `${item.class} `
      result += `row-start-${item.row[0]} `
      result += `row-span-${item.row[1]} `
      result += `col-start-${item.col[0]} `
      result += `col-span-${item.col[1]} `
      return result
    },
    resigt() {},
    // 로그인
    signIn() {
      if (this.domainData.value !== '') {
        console.log('login domain: ', this.domainData.value)
        if (!this.userId || this.userId === '') {
          this.loginError()
          this.idEmpty = true
          return
        }
        if (!this.userPassword || this.userPassword === '') {
          this.loginError()
          this.pwEmpty = true
          return
        }
        // store에 정의한 Login을 사용한다.
        this.isLoading = true

        console.log(this.userId)
        console.log(this.userPassword)
        console.log(this.domainData.value)
        console.log(this.isAutoLogin)

        store
          .dispatch('LoginByPassword', {
            userId: this.userId,
            userPassword: this.userPassword,
            domainCd: this.domainData.value,
            isAutoLogin: this.isAutoLogin
          })
          .then(response => {
            // Login이 완료될 경우
            this.pwEmpty = false
            this.idEmpty = false
            this.idPwCheck = false

            console.log('####LoginByPassword response->', response)

            //user정보를 가져온다.
            store
              .dispatch('SetUserInfo', {
                userId: this.userId
              })
              .then(response => {
                // user정보
                // this.$store.dispatch('GetEmpInfo', { empNo: this.$store.state.user.empNo})

                // user 정보를 가져온 이후에 이동 및 메뉴 적용
                this.$store
                  .dispatch('GetMenus', {
                    userId: this.userId,
                    domainCd: this.domainData.value
                  })
                  .then(response => {
                    let startPage = localStore.get('start-page')

                    if (startPage) {
                      this.$router.push(localStore.get('start-page'))
                    } else {
                      this.$router.push('/')
                    }
                  })
                //this.$router.push('/')
                // // 로그인 화면에서 바디 스크롤을 막아주는 클래스 지우기
                //   let bodyElement = document.getElementById('app')
                //   bodyElement.classList.remove('not_scroll')
              })
          })
          .catch(reject => {
            //Login이 실패할 경우
            console.error('Login fail : ', reject)
            this.loginError()
            this.idEmpty = false
            this.pwEmpty = false
            this.idPwCheck = true
          })
          .finally(() => {
            this.isLoading = false
          })
      } else {
        this.$vToastify.warning(this.$t('msg.no_select_domain')) // 에러 메시지 출력
      }
    },
    loginError() {
      this.$vToastify.error({
        title: '로그인 실패',
        body: '아이디 또는 비밀번호를 확인해주세요.',
        canTimeout: false,
        theme: 'dark',
        iconEnabled: true
      })
    },
    getDomainList() {
      // 도메인 중복 체크를 위한 데이터 셋
      getDomainListData({ domainStatusCd: '', domainCd: '' })
        .then(res => {
          res.list.forEach(item => {
            this.domainData.itemList.push({
              value: item.domainCd,
              label: item.domainNm
            })
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // select box 값 변경
    valueChanged(...arg) {
      console.log(arg)
      this.domainData.value = arg[0][0].value
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #168ff4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  height: 100vh;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    margin-top: 20%;
    --padding: 30px 35px 0;
    --margin: 0 auto;
    --margin-top: 320px;
    overflow: hidden;
    background-color: rgba(39, 39, 39, 0); // 로그인 박스 배경
    border-radius: 10px;
  }

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

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

<style lang="scss">
$bg: #fff; // #283443;
$light_gray: #283443; // #fff;
$cursor: #283443;

.login-container {
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
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: $bg;
    border-radius: 1px;
    color: #454545;

    &:hover {
      background: #454545;
      transition: all 1s;
    }
  }

  .el-checkbox {
    color: $bg;
    .el-checkbox__inner {
      background-color: $bg;
    }
  }
}
</style>
