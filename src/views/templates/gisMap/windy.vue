<template>
  <div class="hasNavAndTags" :class="this.$store.state.menu.flag.fullscreen ? 'isFullView' : ''">
    <el-button @click="test"> test</el-button>
    <windy-component :prsMapData="mapData" class="w-full h-full" />
  </div>
</template>

<script>
import WindyComponent from '@/components/windy/WindyComponent'
export default {
  name: 'htmlEditorTeamplate',
  components: {
    'windy-component': WindyComponent
  },
  data() {
    return {
      // 호선 이동 경로
      mapData: {
        '2486': {
          heading: 215,
          sail: '2486',
          track: [
            [34.6, 128.9],
            [34.3, 128.8],
            [34.2, 128.7]
          ]
        }
      },
      content: {
        json: [{ name: 'Dirk', age: 1234 }, { name: 'Jason' }]
      }
    }
  },
  mounted() {
    this.getMapData()
  },
  methods: {
    test() {
      this.mapData = {
        '2486': {
          heading: 215,
          sail: '2486',
          track: [
            [34, 128.7],
            [34, 128.5],
            [34, 128.3]
          ]
        }
      }
    },
    getMapData() {
      this.mapData = {
        '2486': {
          heading: 215,
          sail: '2486',
          track: [
            [34.6, 128.9],
            [34.3, 128.8],
            [34.2, 128.7]
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
