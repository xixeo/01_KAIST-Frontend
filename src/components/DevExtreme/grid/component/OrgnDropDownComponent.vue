<template>
  <DxDropDownBox
    :ref="orgnDropBoxRefName"
    :drop-down-options="dropDownOptions"
    :data-source="dataSource"
    :value.sync="currentValue"
    :read-only="readOnly"
    display-expr="display"
    value-expr="deptCd"
    content-template="contentTemplate"
  >
    <template #contentTemplate="{}">

      <div class = "treeView">

        <DxTreeView
          data-structure="plain"
          :data-source="treeDataSource"
          expanded-expr="false"
          key-expr="deptCd"
          display-expr="display"
          parent-id-expr="highDept"
          @item-click="itemClick"
          @item-expanded="onItemExpanded"
          @item-collapsed="onItemCollapsed" 
          @selection-changed="selectionChanged"
          >
          <template #item="item">
              <div><i :class="item.data.isDirectory ? 'dx-icon dx-icon-activefolder' : 'dx-icon dx-icon-file'"/><span>{{ item.data.display }}</span></div>
          </template>
        </DxTreeView>   
      </div>

    </template>
  </DxDropDownBox>
</template>
<script>

import DxDropDownBox from 'devextreme-vue/drop-down-box';
import { DxTreeView } from 'devextreme-vue/tree-view';

const orgnDropBoxRefName = 'orgnDropBoxRef';

export default {
  components: {
    DxDropDownBox,
    DxTreeView
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
      dropDownOptions: { width: 350 },
      orgnDropBoxRefName,
    };
  },
  computed: {
      treeDataSource: function() {
        var treeMaindata = [] 
        treeMaindata = this.dataSource.filter(element => element.useYn == 'Y');
        return treeMaindata
        // this.dataSource.forEach( element => {      
        //   treeMaindata.push({element })
        // })  
      }
  },
  methods: {
    getCaption(id) {
      return this.$t(id)
    },
    itemClick(e) {
      this.currentValue = e.itemData.deptCd
      this.onValueChanged(this.currentValue);
      this.$refs[this.orgnDropBoxRefName].instance.close();
    },
    selectionChanged(e) {
      
    },
    onItemExpanded(e) {
     
    },
    onItemCollapsed(e) {
    }
  }
};
</script>
