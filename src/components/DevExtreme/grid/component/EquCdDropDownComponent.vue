<template>
  <DxDropDownBox
    :ref="LocNoDropDownBoxRefName"
    :drop-down-options="dropDownOptions"
    :data-source="dataSource"
    :value.sync="this.currentValue"
    :readOnly="readOnly"
    display-expr="equNm"
    value-expr="equCd"
    content-template="contentTemplate"
  >
    <template #contentTemplate="{}">
      <DxDataGrid
        :data-source="dataSource"
        :remote-operations="true"
        :selected-row-keys="[currentValue]"
        :hover-state-enabled="true"
        :on-selection-changed="onSelectionChanged"
        :focused-row-enabled="true"
        :focused-row-key="currentValue"
        key-expr="equCd"
      >
        <DxColumn data-field="plntId" alignment="left" :caption="getCaption('COM0308')" :visible="false"/>
        <DxColumn data-field="plntNm" alignment="left" :caption="getCaption('COM0308')" width="100px"/>
        <DxColumn data-field="equCd" alignment="left" :caption="getCaption('COM0083')" width="110px" />
        <DxColumn data-field="equNm" alignment="left" :caption="getCaption('COM0084')" width="75px" />
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
    }
  },
  data() {
    return {
      routeName : this.$route.name,
      currentValue: this.value,
      dropDownOptions: { width: 400 },
      LocNoDropDownBoxRefName,
    };
  },
  beforeMount() {
  },
  created()  {
  },
  computed: {
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
