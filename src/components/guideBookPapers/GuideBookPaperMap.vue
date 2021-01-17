<template>
  <div>
    <Map
      map-style-type="outdoor"
      geo-json-type="Crags"
    />
  </div>
</template>

<script>
import Map from '@/components/maps/Map'
export default {
  name: 'GuideBookPaperMap',
  components: { Map },
  props: {
    guideBookPaper: Object
  }
}
</script>
