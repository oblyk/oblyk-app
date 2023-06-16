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
          :label="$t('components.map.layers.relief')"
          :value="0"
        />
        <v-radio
          :label="$t('components.map.layers.satellite')"
          :value="1"
        />
        <v-radio
          :label="$t('components.map.layers.detailedRelief')"
          :value="2"
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
    mapStyle: {
      type: String,
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
    this.$root.$on('hideLeafletMapLayerSelector', () => { this.showLayersSelector = false })
  },

  beforeDestroy () {
    this.$root.$off('hideLeafletMapLayerSelector')
  },

  methods: {
    onChange () {
      this.$emit('input', this.layerIndex)
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
