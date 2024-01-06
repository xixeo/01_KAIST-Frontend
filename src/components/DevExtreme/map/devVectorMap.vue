<template>

  <DxVectorMap
    id="vector-map"
  >
    <DxLayer
      :data-source="mapsWorld"
    />
    <DxLayer
      :data-source="items.layerData"
      type="line"
    />
    <DxExport :enabled="true"/>
  </DxVectorMap>

    
</template>

<script>

import {
  DxVectorMap,
  DxExport,
  DxLayer,
  DxLegend,
  DxSource,
  DxFont,
} from 'devextreme-vue/vector-map';
import DxGallery from 'devextreme-vue/gallery';
import {
  DxBackground,
  DxImage
} from 'devextreme-vue/range-selector';

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';

export default {
  components: {
    DxVectorMap,
    DxExport,
    DxLayer,
    DxLegend,
    DxSource,
    DxFont,
    DxBackground,
    DxImage,
    DxGallery
  },
  props: {
    items: {
      type: Object,
      default: function() {
        return { }
      }
    }
  },
  data() {
    return {
      mapsWorld: mapsData.world,
      cameraImage: require(`@/assets/images/camera/20210611_110247.jpg`),
    };
  },
  methods: {

  }
};
</script>
<style>
#vector-map {
    height: 550px;
}
</style>
