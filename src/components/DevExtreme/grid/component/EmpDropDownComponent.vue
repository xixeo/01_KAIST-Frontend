<template>
  <DxDropDownBox
    :ref="empDropDownBoxRefName"
    :drop-down-options="dropDownOptions"
    :data-source="dataSource"
    :value.sync="currentValue"
    :readOnly="readOnly"
    display-expr="korNm"
    value-expr="empNo"
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
        key-expr="empNo"
      >
        <DxColumn data-field="ldeptNm" alignment="left" :caption="getCaption('COM0033')" width="140px"/>
        <DxColumn data-field="empNo" alignment="left" :caption="getCaption('COM0038')" width="90px"/>
        <DxColumn data-field="korNm" alignment="left" :caption="getCaption('COM0035')" width="90px"/>
        <DxColumn data-field="jblNm" alignment="left" :caption="getCaption('COM0041')" width="80px"/>
        <DxColumn data-field="telNo" alignment="left" :caption="getCaption('COM0304')" :visible="false"/>
        <DxColumn data-field="handPhone" alignment="left" :caption="getCaption('FLC1030006')" width="90px"/>
        <DxColumn data-field="jbrpNm" alignment="center" :caption="getCaption('COM0040')" :visible="false"/>
        <DxColumn data-field="deptCd" alignment="center" caption="부서코드" :visible="false"/>
        <DxColumn data-field="jbl" alignment="center" caption="직위" :visible="false" />
        <DxColumn data-field="jbrp" alignment="center" caption="직책" :visible="false"/>
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

const empDropDownBoxRefName = 'empDropBoxRef';

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
    }
  },
  data() {
    return {
      currentValue: this.value,
      dropDownOptions: { width: 560 },
      empDropDownBoxRefName,
    };
  },
  computed: {
      gridDataSource: function() {
        return this.dataSource.filter(element => element.useYn == 'Y');
      }
  },
  methods: {
    onSelectionChanged(selectionChangedArgs) {
      this.currentValue = selectionChangedArgs.selectedRowKeys[0];
      if(selectionChangedArgs.selectedRowKeys.length > 0) {
        this.onValueChanged(this.currentValue);
        this.$refs[empDropDownBoxRefName].instance.close();
      }
    },
    getCaption(id) {
      return this.$t(id)
    }
  }
};
</script>
