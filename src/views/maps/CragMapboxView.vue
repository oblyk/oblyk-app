<template>
  <mapbox-map
    map-style-type="outdoor"
    geo-json-type="Crags"
  />
</template>

<script>
import MapboxMap from '@/components/maps/MapboxMap'

export default {
  name: 'CragMapboxView',
  components: { MapboxMap }
}
</script>
