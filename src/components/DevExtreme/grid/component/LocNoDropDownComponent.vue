<template>
  <DxDropDownBox
    :ref="LocNoDropDownBoxRefName"
    :drop-down-options="dropDownOptions"
    :data-source="gridDataSource"
    :value.sync="currentValue"
    :readOnly="readOnly"
    display-expr="slNm"
    value-expr="slCd"
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
        key-expr="slCd"
      >
        <DxColumn data-field="plntId" alignment="left" :caption="getCaption('COM0308')" :visible="false"/>
        <DxColumn data-field="plntNm" alignment="left" :caption="getCaption('COM0308')" width="100px"/>
        <DxColumn data-field="slType" alignment="left" :caption="getCaption('COM0082')" width="100px" />
        <DxColumn data-field="slCd" alignment="left" :caption="getCaption('MPA1010002')" width="75px" />
        <DxColumn data-field="slNm" alignment="left" :caption="getCaption('MPA1010004')" width="130px"/>
        <!-- <DxColumn data-field="id" :visible="false" /> -->
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
import EventBus from '@/components/event-bus';

const LocNoDropDownBoxRefName = 'LocNoDropBoxRef';

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
    }
  },
  data() {
    return {
      routeName : this.$route.name,
      currentValue: this.value,
      dropDownOptions: { width: 460 },
      LocNoDropDownBoxRefName
    };
  },
  beforeMount() {
  },
  created()  {
  },
  computed: {
    gridDataSource: function() {
      var gridMaindata = [] 
      if(this.plntId !== null && this.plntId !== '') {
        gridMaindata = this.dataSource.filter(element => element.plntId === this.plntId );
      } else {
        gridMaindata = this.dataSource;
      }
      return gridMaindata
    }

  },
  methods: {
    onSelectionChanged(selectionChangedArgs) {
      this.currentValue = selectionChangedArgs.selectedRowKeys[0];
      if(selectionChangedArgs.selectedRowKeys.length > 0) {
        this.onValueChanged(this.currentValue);
        this.$refs[LocNoDropDownBoxRefName].instance.close();
      }
    },
    getCaption(id) {
      return this.$t(id)
    }
  }
};
</script>
