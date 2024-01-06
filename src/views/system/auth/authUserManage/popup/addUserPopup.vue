<template>
  <DxPopup
    :title="getTitle(optionData.title)"
    :show-title="true"
    :visible.sync="popupVisible"
    :close-on-outside-click="false"
    :scrollingEnabled="true"
    :width="optionData.width"
    :height="optionData.height"
    @hidden="onClose"
  >
    <div class="w-full h-full">
      <div style="margin-bottom:10px;">
        <!-- 판넬 버튼 -->
        <template v-if="optionData.panelButton">
          <dxButtonList :useBtnList="optionData.panelButton" @btnClick="onClick($event.options)"></dxButtonList>
        </template>
      </div>
      <!-- 조회조건 -->
      <el-row v-if="optionData.editorList[radio]">
        <el-card shadow="hover" style="width:100%;height:78px;">
          <editorsLayout
            ref="select"
            :layoutData="optionData.editorList[radio]"
            @onValueChanged="onValueChanged"
            @onBtnClick="onBtnClick"
          ></editorsLayout>
        </el-card>
      </el-row>
      <!-- 그리드, 버튼 리스트 -->
      <template v-if="optionData.gridList[radio]">
        <el-row :gutter="10">
          <el-col
            v-for="(item, index) in optionData.gridList[radio]"
            :key="index"
            :lg="item.width[0]"
            :xl="item.width[1]"
            :style="item.style"
          >
            <!-- 그리드 이름 -->
            <div v-if="item.title" class="col-sm-6 text-white m-1">
              <i class="fas fa-info-circle mr-1" />
              {{ $t(item.title) }}
            </div>
            <!-- 그리드 리스트 -->
            <div v-if="item.properties">
              <dxTreeList
                v-if="item.properties.treeName"
                :height="item.height"
                :treeInfo="item.properties"
                :dataSource="item.rowData"
                :ref="item.properties.treeName"
                :selectedRowKeys="item.selectedRowKeys"
              ></dxTreeList>
              <devDataGrid
                v-if="item.properties.gridName"
                :height="item.height"
                :gridInfo="item.properties"
                :dataSource="item.rowData"
                :ref="item.properties.gridName"
              ></devDataGrid>
            </div>
            <!-- 버튼 리스트 -->
            <template v-show="item.editorList">
              <editorsLayout :layoutData="item" @onBtnClick="btnClick"></editorsLayout>
            </template>
          </el-col>
        </el-row>
      </template>
      <div class="absolute bottom-5 right-7">
        <DxButton
          class="mr-1"
          :text="getTitle(optionData.okButtonLabel)"
          type="success"
          width="90px"
          @click="onSuccess"
        />
        <DxButton
          class="ml-1"
          :text="getTitle('btnClose')"
          type="success"
          width="90px"
          @click="onClose"
        />
      </div>
    </div>
  </DxPopup>
</template>

<script>
import { DxPopup } from 'devextreme-vue/popup'
import { DxButton } from 'devextreme-vue/button'
import { devDataGrid, dxTreeList } from '@/components/DevExtreme/grid' // 그리드 컴포넌트
import { dxButtonList } from '@/components/DevExtreme/editors' // 에디터 컴포넌트
import editorsLayout from '@/components/editorsLayout/EditorsLayout' // 에디터 레이아웃 컴포넌트

export default {
  name: 'addUserPopup',
  components: {
    devDataGrid,
    dxTreeList,
    DxPopup,
    DxButton,
    dxButtonList,
    editorsLayout
  },
  props: {
    option: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
      routeName: this.$route.name,
      popupVisible: false,
      selectRadio: '',
      radio: '', // panel 구분
      optionData: [], // 옵션 전체 데이터
      gridData: [] // 그리드 데이터
    }
  },
  watch: {
    option: {
      deep: true,
      handler() {
        console.log('watch', this.optionData)
        this.optionData = this.option // 옵션 데이터 추가
      }
    }
  },
  created() {
    this.radio = this.option.panelButton.list[0].id
    this.optionData = this.option // 옵션 데이터 추가
  },
  methods: {
    ///////////////////////////////////////
    /*            Popup Event            */
    ///////////////////////////////////////
    // 팝업 오픈
    open() {
      this.popupVisible = true // 팝업 오픈
      console.log('open', this.popupVisible)
    },
    // 팝업 닫기
    onClose(e) {
      this.$emit('onClose', e, this.$refs) // ref값 넘김
      this.popupVisible = false // 팝업 닫기
    },
    onSuccess() {
      this.$emit('onSuccess', this.radio, this.$refs) // ref값 넘김
      if (this.option.valiData) this.popupVisible = false // 팝업 닫기
    },

    ///////////////////////////////////////
    /*             Fuction               */
    ///////////////////////////////////////
    getTitle(id) {
      return this.$t(id)
    },
    // editor box 데이터 변경
    onValueChanged(...arg) {
      this.$emit('onValueChanged', arg, this.$refs)
    },
    // panel 구분 버튼 변경
    onClick(e) {
      console.log('panelChange', this.optionData.gridList)
      this.radio = e.id
      this.$emit('onPanelButton', e, this.radio)
    },
    onBtnClick(...arg) {
      this.$emit('onBtnClick', arg)
    },
    // editor layout 버튼
    btnClick(...arg) {
      arg.radio = this.radio
      this.$emit('btnClick', arg, this.$refs) // ref값 넘김
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/styles/themeB/variables.scss';
</style>
