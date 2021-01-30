<template>
  <div class="photo-map">
    <leaflet-map
      :track-location="false"
      :zoom-force="16"
      :latitude-force="parseFloat(photo.latitude)"
      :longitude-force="parseFloat(photo.longitude)"
      map-style="outdoor"
    />
  </div>
</template>
<script>
import LeafletMap from '@/components/maps/LeafletMap'

export default {
  name: 'PhotoMap',
  components: { LeafletMap },
  props: {
    photo: Object
  }
}
</script>

<style>
.photo-map {
  height: 350px;
  width: 350px;
}
</style>
