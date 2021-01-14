<template>
  <Map
    map-style-type="street"
    geo-json-type="Gyms"
  />
</template>

<script>
import Map from '@/components/Map'

export default {
  name: 'GymMapView',
  components: { Map }
}
</script>
