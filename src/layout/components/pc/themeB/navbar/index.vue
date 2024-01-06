<template>
  <div class="navbar">
    <div class="left-menu">
      <!-- 로고 -->
      <headicons
        id="headicons"
        iconClass
        :isOnlyImage="titleOption.isOnlyImage"
        :image="titleOption.image"
        :title="titleOption.title"
        :subTitle="titleOption.subTitle"
        class="left-menu-item hover-effect title"
        @HeadiconClick="logoClick"
      />
    </div>
    <div class="right-menu w-3/10 flex">
      <!-- 테마 선택 -->
      <!-- <themeSelect :id="'theme'" /> -->
      <TopTimer class="mr-2"></TopTimer>
      <!-- 로그인 사용자 -->
      <div class="flex user_box">
        <div class="-mt-1">
          <headicons
            id="headicons"
            iconClass="admin_icon"
            :iconStyle="'width: 45px; margin-top: 12px; font-size: 25px; color: #999;'"
            :title="userName"
            class="right-menu-item hover-effect title"
            :tooltip="{ id: 'login_user', mode: 'light', placement: 'bottom' }"
            @HeadiconClick="loginUser"
          />
        </div>
        <!-- 로그아웃 -->
        <headicons
          id="headicons"
          iconClass="logout_icon"
          class="right-menu-item hover-effect mt-3"
          @HeadiconClick="logout"
          :tooltip="{ id: 'logout', mode: 'light', placement: 'bottom' }"
        />
      </div>
      <!-- 언어설정 -->
      <el-dropdown trigger="click" v-if="visible.locale">
        <headicons
          id="headicons"
          iconClass="language"
          class="right-menu-item hover-effect mt-3"
          :tooltip="{ id: 'language', mode: 'light', placement: 'bottom' }"
        />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="updateLocale('ko')">
            <span style="display:block;">{{ this.$t('ko') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="updateLocale('en')">
            <span style="display:block;">{{ this.$t('en') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 도움말 -->
      <headicons
        id="headicons"
        iconClass="help"
        class="right-menu-item hover-effect mt-3"
        :tooltip="{ id: 'help', mode: 'light', placement: 'bottom' }"
        @HeadiconClick="helpClick"
      />
      <!-- 설정 -->
      <headicons
        id="headicons"
        iconClass="settings_icon"
        class="right-menu-item hover-effect mt-3"
        @HeadiconClick="settingClick"
        :tooltip="{ id: 'setting', mode: 'light', placement: 'bottom' }"
        v-if="visible.setting"
      />
      <template v-if="device !== 'mobile'">
        <!-- 전체화면 -->
        <screenfull id="screenfull" class="right-menu-item hover-effect mt-3" :tooltip="{ id: 'fullscreen', mode: 'light', placement: 'bottom' }" />
      </template>
      <!-- 기상 위젯 -->
      <!-- <div class="bg-gray-0" v-if="visible.weather">
        <weatherSummary :items="weatherInfos" :imgHeight="'22px'" :useRotate="false" style="width:200px; height: 49px;" />
      </div> -->
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapGetters } from 'vuex'
import breadcrumb from '@/components/breadcrumb'
import menuicon from '@/components/menuicon'
// import ErrorLog from '@/components/ErrorLog'
import screenfull from '@/components/screenfull'
import headicons from '@/components/headicons'
import themeSelect from '@/components/themeSelect'
import { getUserId } from '@/utils/token'

import TopTimer from './Timer'

import weatherSummary from '@/components/weather/weatherSummary'

// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'

export default {
  components: {
    TopTimer,
    //Hamburger
    //ErrorLog,
    screenfull,
    headicons,
    themeSelect,
    weatherSummary
    //SizeSelect,
    //Search
  },
  props: {
    titleOption: {
      type: Object,
      default: () => {
        return { title: 'LOGO', subTitle: '' }
      }
    },
    // 각 항목별 보이기 설정
    visible: {
      type: Object,
      default: () => {
        return {
          locale: false, // 다국어
          help: true, // 도움말
          settig: false, // 마이페이지
          weather: false // 기상 위젯
        }
      }
    },
    // element-ui tooltip 효과 추가(dark / light)
    tooltipEffect: {
      type: String,
      default: 'light'
    },
    weatherInfos: [
      { tmMm: '3', tmDay: '17', dayOfTheWeek: '수요일', taMax: 30, taMin: 10, wfment: 'test', wf: 'w01', hm: 50, rnRate: 0 },
      { tmMm: '3', tmDay: '18', dayOfTheWeek: '목요일', taMax: 30, taMin: 10, wfment: 'test', wf: 'w02', hm: 50, rnRate: 0 },
      { tmMm: '3', tmDay: '19', dayOfTheWeek: '금요일', taMax: 30, taMin: 10, wfment: 'test', wf: 'w03', hm: 50, rnRate: 0 }
    ]
  },
  data() {
    return {
      isFullscreen: false,
      userName: 'noName',
      language: this.$i18n.locale,
      helpUrl: '/help/main.html'
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device'])
  },
  created() {
    this.userName = getUserId() //this.$store.state.user.userName
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    /// 로그아웃 선택
    async logout() {
      this.$router.push('/logout')

      //await this.$store.dispatch('Logout')

      //await this.$store.dispatch('user/logout')
      //this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    /// 메인 로고 선택
    logoClick() {
      // alert('logoclick')
      this.$router.push('/') // 로고 클릭시 메인으로 이동
    },
    /// 사용자 설정 선택
    settingClick() {},
    /// 도움말 선택
    helpClick() {
      //alert('helpclick')
      //this.$i18n.locale = 'en'
      window.open(this.helpUrl, '_blank')
    },
    loginUser() {
      //alert("loginUser")
      this.$i18n.locale = 'ko'
    },
    updateLocale(locale) {
      this.language = locale
      this.$i18n.locale = locale
    },

    content_title(id) {
      return this.$i18n.t(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.user_box {
  border-left: 1px solid #999;
  border-right: 1px solid #999;
}
</style>
