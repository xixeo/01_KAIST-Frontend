<template>
  <DxDropDownBox
    :ref="dropDownBoxRefName"
    :drop-down-options="dropDownOptions"
    :data-source="dataSource"
    :value.sync="currentValue"
    :readOnly="readOnly"
    display-expr="itemFullNm"
    value-expr="itemCd"
    content-template="contentTemplate"
  >
    <template #contentTemplate="{}">
      <DxDataGrid
        :data-source="gridDataSource"
        :remote-operations="true"
        :selected-row-keys="[currentValue]"
        :hover-state-enabled="true"
        :on-selection-changed="onSelectionChanged"
        :focused-row-enabled="true"
        :focused-row-key="currentValue"
        key-expr="itemCd"
      >
        <DxColumn data-field="plntId" alignment="left" :caption="getCaption('COM0047')" width="100px" :visible="false" />
        <DxColumn data-field="itemCd" alignment="left" :caption="getCaption('COM0421')" width="110px"/>
        <DxColumn data-field="itemFullNm" alignment="left" :caption="getCaption('COM0411')" width="180px" />
        <DxColumn data-field="spec" alignment="left" :caption="getCaption('COM0065')" width="90px" />
        <DxColumn data-field="qltyCd" alignment="left" :caption="getCaption('COM0064')" width="90px" />
        <DxColumn data-field="plntNm" alignment="left" :caption="getCaption('COM0308')" width="100px"/>
        <DxColumn data-field="itemNm" alignment="left" :caption="getCaption('COM0424')" width="130px" :visible="itemInfoList" />
        <DxColumn data-field="itemDiv" alignment="left" :caption="getCaption('COM0063')" width="130px" :visible="itemInfoList"/>
        <DxColumn data-field="unitWt" alignment="left" :caption="getCaption('COM0067')" width="90px" :visible="itemInfoList" />
        <DxColumn data-field="unitOfWt" alignment="left" :caption="getCaption('COM0068')" width="120px" :visible="itemInfoList" />
        <DxColumn data-field="basicUnit" alignment="left" :caption="getCaption('COM0069')" width="120px" :visible="itemInfoList" />
        <DxColumn data-field="lotSize" alignment="left" :caption="getCaption('COM0434')" width="120px" :visible="itemInfoList" />
        <DxColumn data-field="stockYn" alignment="left" :caption="getCaption('COM0066')" width="130px" :visible="itemInfoList" />
        <DxColumn data-field="dwNo" alignment="left" :caption="getCaption('COM0070')" width="120px" :visible="itemInfoList" />
        <DxColumn data-field="useYn" alignment="left" :caption="getCaption('COM0048')" width="120px" :visible="itemInfoList" />
        <DxColumn data-field="bpCd" alignment="left" :caption="getCaption('COM0403')" width="130px" :visible="false" />
        <DxColumn data-field="aplyStdt" alignment="left" :caption="getCaption('COM0049')" width="130px" :visible="itemInfoList" />
        <DxColumn data-field="aplyFndt" alignment="left" :caption="getCaption('COM0050')" width="130px" :visible="itemInfoList" />
        <DxColumn data-field="photo" alignment="left" :caption="getCaption('COM0425')" width="130px" :visible="itemInfoList" />
        <DxColumn data-field="id" alignment="left" :caption="getCaption('id')" width="90px" :visible="false" />

    
        <DxPaging
          :enabled="true"
          :page-size="10"
        />
        <DxScrolling mode="virtual"/>
        <DxSelection mode="single"/>
        <DxFilterRow :visible="true"/>
      </DxDataGrid>
    </template>
  </DxDropDownBox>
</template>
<script>

import { DxDataGrid, DxPaging, DxSelection, DxScrolling, DxColumn, DxFilterRow} from 'devextreme-vue/data-grid';
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import {getCurrentDate} from '@/utils/common'
import EventBus from '@/components/event-bus';

const dropDownBoxRefName = 'itemCdDropBoxRef';

export default {
  components: {
    DxDataGrid,
    DxPaging,
    DxSelection,
    DxScrolling,
    DxColumn,
    DxFilterRow,
    DxDropDownBox
  },
  props: {
    value: {
      type: String,
      default: null
    },
    onValueChanged: {
      type: Function,
      default: () => function() {}
    },
    dataSource: {
      type: Array,
       default: () => []
    },
    readOnly : {
      type: Boolean,
      default: () => { return false }
    },
    plntId : {
      type: String,
      default : null
    },
    itemInfoList : {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      routeName : this.$route.name,
      currentValue: this.value,
      dropDownBoxRefName,
    };
  },
  beforeMount() {
  },
  created()  {
    
  },
  computed: {
    gridDataSource: function() {
      let date = getCurrentDate().replace(/[^0-9]/g,'');
      return (this.plntId == null || this.plntId == '') ? this.dataSource.filter(element => element.useYn == 'Y' && element.aplyStdt <= date && element.aplyFndt >= date) : this.dataSource.filter(element => element.useYn == 'Y' && element.plntId==this.plntId && element.aplyStdt <= date && element.aplyFndt >= date)
    },
    dropDownOptions: function() {
      return this.itemInfoList ? {width: 1500 } : { width: 620 }
    }

  },
  methods: {
    onSelectionChanged(selectionChangedArgs) {
      this.currentValue = selectionChangedArgs.selectedRowKeys[0];
      if(selectionChangedArgs.selectedRowKeys.length > 0) {
        this.onValueChanged(selectionChangedArgs);
      }
    },
    getCaption(id) {
      return this.$t(id)
    }
  }
};
</script>
