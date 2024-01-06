<template>
  <div class="h-full w-full bg-blue-400">
    <span style="font-size: 12pt; font-family: -webkit-pictograph; color:#15eb59;"> {{ getcurrentTime }}</span>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TopTimer',
  components: {
    moment
  },
  props: {
    // curruntTime: {
    //   type: String,
    //   default: () => {
    //     return ''
    //   }
    // }
  },
  created() {
    this.timer = setInterval(this.refreshTiemr, 1000) //1초마다 refresh 처리
  },
  data() {
    return { timer: '', currentTime: moment().format('dddd YYYY-MM-DD HH:mm:ss') }
  },
  computed: {
    getcurrentTime() {
      return this.currentTime
    }
  },
  methods: {
    refreshTiemr() {
      this.currentTime = moment().format('dddd YYYY-MM-DD  HH:mm:ss')
    },
    cancelAutoUpdate() {
      clearInterval(this.timer)
    }
  },
  beforeDestroy() {
    this.cancelAutoUpdate()
  }
}
</script>
