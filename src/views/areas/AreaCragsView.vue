<template>
  <v-container>
    <spinner v-if="loadingCrags" />
    <area-crags
      v-if="!loadingCrags"
      :crags="crags"
      :area="area"
    />
  </v-container>
</template>

<script>
import AreaApi from '@/services/oblyk-api/AreaApi'
import Crag from '@/models/Crag'
import Spinner from '@/components/layouts/Spiner'
import AreaCrags from '@/components/areas/AreaCrags'

export default {
  name: 'AreaCragsView',
  components: { AreaCrags, Spinner },
  props: {
    area: Object
  },

  data () {
    return {
      crags: [],
      loadingCrags: true
    }
  },

  mounted () {
    this.getCrags()
  },

  methods: {
    getCrags: function () {
      this.crags = []
      this.loadingCrags = true
      AreaApi
        .crags(this.area.id)
        .then(resp => {
          for (const crag of resp.data) {
            this.crags.push(new Crag(crag))
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'area')
        })
        .finally(() => {
          this.loadingCrags = false
        })
    }
  }
}
</script>
