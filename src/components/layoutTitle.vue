<template>
  <div class="content-header " style="display: flex;justify-content: space-between;">
    <div>
      <h3 class="layoutTitle-text text-sm ml-1 flex" v-if="titleVisible">
        {{ this.$t(this.$route.meta.menu_id) }}
      </h3>
    </div>
    <div>
      <template v-if="buttonKind == 'button'">
        <buttonList :useBtnList="useButtonList.list" @btnClick="clickButton" />
      </template>
      <template v-if="buttonKind == 'dxButton'">
        <dxButtonList :useBtnList="useButtonList" @btnClick="clickButton" />
      </template>
    </div>
  </div>
</template>

<script>
import buttonList from '@/components/buttonList' // 버튼 리스트 component
import dxButtonList from '@/components/DevExtreme/editors/dxButtonList' // dx 버튼 리스트 component

export default {
  name: 'layoutTitle',
  components: {
    buttonList,
    dxButtonList
  },
  props: {
    useButtonList: {
      // 버튼 리스트
      type: Object,
      required: true
    },
    buttonKind: {
      // 버튼 종류
      type: String,
      required: true,
      default: 'dxButton' // button / dxButton
    },
    menuCd: {
      type: String,
      default: 'Title'
    },
    titleVisible: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    clickButton(data) {
      this.$emit(data.id)
    }
  }
}
</script>
