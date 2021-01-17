<template>
  <div class="guide-book-paper-map">
    <Map
      map-style-type="outdoor"
      geo-json-type="GuideBookPaper"
      :geo-json-id="guideBookPaper.id"
    />
  </div>
</template>

<script>
import Map from '@/components/maps/Map'

export default {
  name: 'GuideBookPaperMapView',
  components: { Map },
  props: {
    guideBookPaper: Object
  }
}
</script>

<style scoped>
.guide-book-paper-map {
  height: calc(100vh - 113px);
  width: 100%;
}
</style>
