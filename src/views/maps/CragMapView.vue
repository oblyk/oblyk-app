<template>
  <Map
    map-style-type="outdoor"
    geo-json-type="Crags"
  />
</template>

<script>
import Map from '@/components/Map'

export default {
  name: 'CragMapView',
  components: { Map }
}
</script>
