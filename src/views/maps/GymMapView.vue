<template>
  <Map map-style-type="street" :gyms="gyms" />
</template>
<script>
import Map from '@/components/Map'
import GymApi from '@/services/oblyk-api/gymApi'

export default {
  name: 'GymMapView',
  components: { Map },

  data () {
    return {
      gyms: []
    }
  },

  beforeMount () {
    this.getGyms()
  },

  methods: {
    getGyms: function () {
      GymApi
        .all()
        .then(resp => {
          this.gyms = resp.data
        })
    }
  }
}
</script>
