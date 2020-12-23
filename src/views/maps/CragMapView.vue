<template>
  <Map map-style-type="outdoor" :crags="crags" />
</template>
<script>
import Map from '@/components/Map'
import CragApi from '@/services/oblyk-api/cragApi'

export default {
  name: 'CragMapView',
  components: { Map },

  data () {
    return {
      crags: []
    }
  },

  beforeMount () {
    this.getCrags()
  },

  methods: {
    getCrags: function () {
      CragApi
        .all()
        .then(resp => {
          this.crags = resp.data
        })
    }
  }
}
</script>
