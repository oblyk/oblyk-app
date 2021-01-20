<template>
  <mapbox-map
    map-style-type="street"
    geo-json-type="Gyms"
  />
</template>

<script>
import MapboxMap from '@/components/maps/MapboxMap'

export default {
  name: 'GymMapboxView',
  components: { MapboxMap }
}
</script>
