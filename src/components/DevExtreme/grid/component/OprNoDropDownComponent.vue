<template>
  <DxDropDownBox
    :ref="OprNoDropDownBoxRefName"
    :drop-down-options="dropDownOptions"
    :data-source="dataSource"
    :value.sync="currentValue"
    :readOnly="readOnly"
    display-expr="oprNm"
    value-expr="oprNo"
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
        key-expr="oprNo"
      >
        <DxColumn data-field="oprNo" alignment="left" :caption="getCaption('COM0310')" width="90px" />
        <DxColumn data-field="oprNm" alignment="left" :caption="getCaption('COM0311')" width="130px"/>
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

const OprNoDropDownBoxRefName = 'oprNoDropBoxRef';

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
      dropDownOptions: { width: 300 },
      OprNoDropDownBoxRefName,
      plntId : ''
    };
  },
  beforeMount() {
  },
  created()  {
    
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
        this.$refs[OprNoDropDownBoxRefName].instance.close();
      }
    },
    getCaption(id) {
      return this.$t(id)
    }
  }
};
</script>
