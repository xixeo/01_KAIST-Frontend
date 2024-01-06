<template>
  <div class="login_footer">
    <headicons
      id="headicons"
      iconClass
      :isOnlyImage="items.isOnlyImage"
      :image="items.ciImage.src"
      :class="items.ciImage.class ? items.ciImageClass : 'logo'"
      :style="items.ciImage.style"
    />
  </div>
</template>

<script>
import i18n from '@/i18n' // 언어 변환(매칭) component
import headicons from '@/components/headicons'

export default {
  name: 'loginFooter',
  components: {
    headicons
  },
  props: {
    // 로그인 화면 구성 정보
    items: {
      type: Object,
      default: function() {
        return {
          isOnlyImage: true,
          ciImage: require('@/assets/images/ci/mipodockyard.png')
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
        console.log('footer items change', val)
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
.logo {
  display: inline-block;
  object-position: center;
  margin: 10% 30% 10% 30%;
  width: auto;
  height: auto;
}
.login_footer {
  border-top: 1px solid #889aa4;
}
</style>
