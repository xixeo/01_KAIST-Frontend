<template>
  <div class="bg-gray-0">
    <weatherSummary :items="items.weatherInfos" :imgHeight="items.imgHeight" :useRotate="items.useRotate" :style="items.style" />
    <div class="w-full bg-gray-300" style="overflow:auto; height: 500px;">
      <jsonEditor :value="items" :mode="'code'" @json-save="onSaveClick($event)" class="h-full" id="jeditor" />
    </div>
  </div>
</template>
<script>
import weatherSummary from '@/components/weather/weatherSummary'
import jsonEditor from '@/components/editor/jsonEditor' // json 편집기
import data from './data/data'
export default {
  name: 'WeahterTeamplate',
  components: {
    weatherSummary,
    jsonEditor
  },
  mounted() {},
  beforeDestroy() {},
  data() {
    return {
      roateIndex: 0,
      items: data
    }
  },
  methods: {
    onSaveClick(event) {
      this.items = {}
      this.items = event
    }
  }
}
</script>
<style scoped></style>
