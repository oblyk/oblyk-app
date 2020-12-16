<template>
  <Map map-style-type="outdoor" :crags="crags" />
</template>
<script>
import Map from '@/components/Map'
import OblykApi from '@/services/oblyk-api'

export default {
  name: 'CragMapPage',
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
      OblykApi
        .getAllCrags()
        .then(resp => {
          this.crags = resp.data
        })
    }
  }
}
</script>
