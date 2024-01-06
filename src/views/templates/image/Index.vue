<template>
    <!-- HTML 정의하는 부분 -->
    <div class="lg:w-3/5" style="padding-left:0.5rem;">
        <div style="display: flex;justify-content: space-between;">
            <div style="height:36px; " class="col-sm-10 text-white m-1">
                <i class="fas fa-info-circle mr-1" />
                물품배치
            </div>
        </div>
        <itemPlace :items="items" :positions="items.positions" :resolution="items.resolution"/>
        <!-- json 에디터 -->
        <div style="width:100% height:200%">
        <div
            :title="'에디터'"
            class="json_editor"
            :draggable="{ stopDragging: false, isStorePosition: true, resetInitialPos: true, useFixDragIcon: true }"
            :popupID="'polarRadarChartEditor'"
        >
            <JsonEditor :value="this.items" @json-save="onClick($event)"></JsonEditor>
        </div>
        </div>
    </div>
    
</template>

<script>
import itemPlace from '@/components/image/itemPlace' // boxOverImage 컴포넌트
import EventBus from '@/components/event-bus' // 박스 클릭 이벤트버스
import imageData from './data/data.js' // 데이터
import JsonEditor from '@/components/editor/jsonEditor' // json 편집기

export default {
  name: 'itemSetManageView',
  components: {
      itemPlace,
      JsonEditor
  },
  // .vue 내부에서 사용되는 model
  data() {
    return {
      items: imageData.items
    }
  },
  watch: {
      
  },
  computed: {
  },
  async created() {
        // 배치박스 클릭
        EventBus.$on(this.$route.name + '_itemPlace', e => {
            this.boxClick(e)
        })
  },
  beforeMount() {
  },
  mounted() {
  },
  methods: {
    boxClick(e) {
        console.log('EventBus.$on -> ' + JSON.stringify(e))
    },
    onClick(e) {
        this.items = e
    }
  }
}
</script>

<style lang="less" scoped>
/* css 혹은 less로 스타일 정의하는 부분 */
</style>

