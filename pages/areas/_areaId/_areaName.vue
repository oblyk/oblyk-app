<template>
  <div v-if="area">
    <area-head :area="area" />
    <area-tabs :area="area" />
    <nuxt-child :area="area" />
  </div>
</template>

<script>
import { AreaConcern } from '@/concerns/AreaConcern'
import AreaHead from '@/components/areas/layouts/AreaHead'
import AreaTabs from '@/components/areas/layouts/AreaTabs'

export default {
  components: { AreaTabs, AreaHead },
  mixins: [AreaConcern],

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', false)
  }
}
</script>
