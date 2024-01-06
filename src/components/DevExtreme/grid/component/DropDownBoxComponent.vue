<template>
  <DxDropDownBox
    :ref="dropDownBoxRefName"
    :drop-down-options="dropDownOptions"
    :data-source="datas"
    :value.sync="currentValue"
    :read-only="readOnly"
    display-expr="cdNm"
    value-expr="cd"
    content-template="contentTemplate"
  >
    <template #contentTemplate="{}">
      <DxDataGrid
        :data-source="datas"
        :remote-operations="true"
        :selected-row-keys="[currentValue]"
        :hover-state-enabled="true"
        :on-selection-changed="onSelectionChanged"
        :focused-row-enabled="true"
        :focused-row-key="currentValue"
        key-expr="cd"
      >
        <DxColumn data-field="cd" caption="코드" />
        <DxColumn data-field="cdNm" caption="코드명"/>
        <DxPaging
          :enabled="true"
          :page-size="10"
        />
        <DxScrolling mode="virtual"/>
        <DxSelection mode="single"/>
      </DxDataGrid>
    </template>
  </DxDropDownBox>
</template>
<script>

import {
  DxDataGrid,
  DxPaging,
  DxSelection,
  DxScrolling,
  DxColumn
} from 'devextreme-vue/data-grid';
import DxDropDownBox from 'devextreme-vue/drop-down-box';

const dropDownBoxRefName = 'dropDownBoxRef';

export default {
  components: {
    DxDataGrid,
    DxPaging,
    DxSelection,
    DxScrolling,
    DxColumn,
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
      //default: () => {}
    },
    readOnly : {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      currentValue: this.value,
      dropDownOptions: { width: 500 },
      dropDownBoxRefName,
      datas : this.dataSource
    };
  },
  methods: {
    onSelectionChanged(selectionChangedArgs) {
      this.currentValue = selectionChangedArgs.selectedRowKeys[0];
      this.onValueChanged(this.currentValue);
      if(selectionChangedArgs.selectedRowKeys.length > 0) {
        this.$refs[dropDownBoxRefName].instance.close();
      }
    }
  }
};
</script>
