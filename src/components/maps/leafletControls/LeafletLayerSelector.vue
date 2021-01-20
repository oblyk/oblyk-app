<template>
  <div class="leaflet-bar">
    <a v-if="!showLayersSelector" @click.prevent="showLayersSelector = true">
      <v-icon light small>mdi-layers</v-icon>
    </a>
    <div class="leaflet-customer-control" v-if="showLayersSelector">
      <v-radio-group
        hide-details
        light
        @change="onChange"
        v-model="layerIndex"
      >
        <v-radio
          v-if="mapStyle === 'outdoor'"
          :label="$t('components.map.layers.relief')"
          :value="0"
        />
        <v-radio
          v-if="mapStyle === 'indoor'"
          :label="$t('components.map.layers.street')"
          :value="1"
        />
        <v-radio
          :label="$t('components.map.layers.satellite')"
          :value="2"
        />
      </v-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeafletLayerSelector',

  props: {
    value: Number,
    mapStyle: String
  },

  data () {
    return {
      layerIndex: this.value,
      showLayersSelector: false
    }
  },

  mounted () {
    this.$root.$on('hideLeafletMapLayerSelector', () => { this.showLayersSelector = false })
  },

  methods: {
    onChange: function () {
      this.$emit('input', this.layerIndex)
    }
  }
}
</script>
