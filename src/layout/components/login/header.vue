<template>
  <div class="title-container">
    <h3 class="title">{{ $t(items.title.label) }}</h3>
  </div>
</template>

<script>
import i18n from '@/i18n' // 언어 변환(매칭) component

export default {
  name: 'loginHeader',
  components: {},
  props: {
    // 로그인 화면 구성 정보
    items: {
      type: Object,
      default: function() {
        return {
          label: 'Title'
        }
      }
    }
  },
  data() {
    return {}
  },
  watch: {
    items: {
      deep: true,
      handler(val) {
        console.log('header items change', val)
      }
    }
  },
  mounted() {},
  methods: {
    getLabel(label) {
      return i18n.t(label)
    }
  }
}
</script>

<style lang="scss" scoped>
$light_gray: #eee;

.systemtitle {
  font-size: 35px;
  color: $light_gray;
  margin: 20px auto 40px 20px;
  text-align: Left;
  font-weight: bold;
}

.title-container {
  position: relative;

  .title {
    padding-bottom: 20px;
    border-bottom: 1px solid #889aa4;
    font-size: 35px;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
}
</style>
