<template>
  <DxDropDownBox
    :ref="dropDownBoxRefName"
    :drop-down-options="dropDownOptions"
    :data-source="dataSource"
    :value.sync="currentValue"
    :readOnly="readOnly"
    display-expr="bpNm"
    value-expr="bpCd"
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
        key-expr="bpCd"
      >
        <DxColumn data-field="bpTypeNm" alignment="left" :caption="getCaption('COM0072')" width="90px" />
        <DxColumn data-field="bpType" alignment="left" :caption="getCaption('COM0072')" :visible="false" />
        <DxColumn data-field="bpCd" alignment="center" :caption="getCaption('COM0403')" width="90px"/>
        <DxColumn data-field="bpNm" alignment="left" :caption="getCaption('COM0404')"  width="150px"/>
        <DxColumn data-field="id" :visible="false" />
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

const dropDownBoxRefName = 'partnerDropBoxRef';

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
    bpType : {
      type : String,
      default: null
    }
  },
  data() {
    return {
      currentValue: this.value,
      dropDownOptions: { width: 380 },
      dropDownBoxRefName,
    };
  },
  computed: {
      gridDataSource: function() {
        return this.bpType === '' || this.bpType === null ? this.dataSource.filter(element => element.useYn == 'Y') : this.dataSource.filter(element => element.useYn == 'Y' && element.bpType.indexOf(this.bpType) !== -1 )
      }
  },
  methods: {
    onSelectionChanged(selectionChangedArgs) {
      this.currentValue = selectionChangedArgs.selectedRowKeys[0];
      if(selectionChangedArgs.selectedRowKeys.length > 0) {
        this.onValueChanged(this.currentValue);
        this.$refs[dropDownBoxRefName].instance.close();
      }
    },
    getCaption(id) {
      return this.$t(id)
    }   
  }
};
</script>
