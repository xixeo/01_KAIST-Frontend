<template>
  <DxDropDownBox
    :ref="dropDownBoxRefName"
    :drop-down-options="dropDownOptions"
    :data-source="dataSource"
    :value.sync="currentValue"
    :readOnly="readOnly"
    display-expr="oprNm"
    value-expr="routOrd"
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
        key-expr="routOrd"
      >
        <DxColumn data-field="itemCd" alignment="left" :caption="getCaption('COM0421')" :visible="false" />
        <DxColumn data-field="plntId" alignment="left" :caption="getCaption('COM0302')" :visible="false" />
        <DxColumn data-field="routOrd" alignment="left" :caption="getCaption('COM0422')" width="80px" />
        <DxColumn data-field="oprNo" alignment="left" :caption="getCaption('COM0310')" :visible="false" />
        <DxColumn data-field="oprNm" alignment="left" :caption="getCaption('COM0409')" width="150px" />
        <DxColumn data-field="insideFlg" alignment="left" :caption="getCaption('COM0079')" width="90px" />
        <DxColumn data-field="wcCd" alignment="left" :caption="getCaption('COM0423')" :visible="false" />

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

const dropDownBoxRefName = 'routOrdDropBoxRef';

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
    itemCd : {
      type: String,
      default : null
    },
    plntId : {
      type: String,
      default : null
    },
    readOnly : {
      type: Boolean,
      default: () => { return false }
    }
  },
  data() {
    return {
      currentValue: this.value,
      dropDownOptions: { width: 370 },
      dropDownBoxRefName,
    };
  },
  computed: {
      gridDataSource: function() {
        return (this.plntId == null || this.plntId == '') ? this.dataSource.filter(element => element.itemCd==this.itemCd ) : this.dataSource.filter(element => (element.plntId==this.plntId) && (element.itemCd==this.itemCd))
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
    getCaption (id) {
      return this.$t(id)
    }  
  }
};
</script>
