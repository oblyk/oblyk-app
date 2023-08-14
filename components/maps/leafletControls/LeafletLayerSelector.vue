<template>
  <div class="leaflet-bar">
    <a v-if="!showLayersSelector" @click.prevent="showLayersSelector = true">
      <v-icon light small>{{ mdiLayers }}</v-icon>
    </a>
    <div
      v-if="showLayersSelector"
      class="leaflet-customer-control"
    >
      <v-radio-group
        v-model="layerIndex"
        hide-details
        light
        @change="onChange"
      >
        <v-radio
          v-for="(layer, layerForIndex) in layers"
          :key="`layer-index${layerForIndex}`"
          :label="$t(`components.map.layers.${layer.title}`)"
          :value="layerForIndex"
        />
      </v-radio-group>
    </div>
  </div>
</template>

<script>
import { mdiLayers } from '@mdi/js'
export default {
  name: 'LeafletLayerSelector',

  props: {
    value: {
      type: Number,
      default: null
    },
    layers: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      layerIndex: this.value,
      showLayersSelector: false,

      mdiLayers
    }
  },

  mounted () {
    let localLayer = localStorage.getItem('MapLayerTitle')
    if (localLayer) {
      try {
        localLayer = JSON.parse(localLayer)
        const lastSaveAt = Math.abs(new Date().getTime() - localLayer.timestamp) / 1000 / 3600
        let layerFound = false
        if (lastSaveAt <= 24) {
          for (const layer in this.layers) {
            const index = parseInt(layer)
            if (this.layers[index].title === localLayer.title) {
              this.layerIndex = index
              this.$emit('input', this.layerIndex)
              layerFound = true
              break
            }
          }
        }
        if (!layerFound) { localStorage.removeItem('MapLayerTitle') }
      } catch {
        localStorage.removeItem('MapLayerTitle')
      }
    }
  },

  methods: {
    onChange () {
      localStorage.setItem(
        'MapLayerTitle',
        JSON.stringify({ title: this.layers[this.layerIndex].title, timestamp: new Date().getTime() })
      )
      this.$emit('input', this.layerIndex)
      this.showLayersSelector = false
    },

    hideLeafletMapLayerSelector () {
      this.showLayersSelector = false
    }
  }
}
</script>

<style lang="scss" scoped>
.leaflet-customer-control {
  background-color: white;
  padding: 10px;
  color: black;

  .v-input {
    margin-top: 0;
    padding-top: 0;
  }
}
</style>
