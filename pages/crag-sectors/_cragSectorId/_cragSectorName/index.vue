<template>
  <div>
    <v-container>
      <crag-sector-description :crag-sector="cragSector" />
    </v-container>
  </div>
</template>

<script>
import CragSectorDescription from '~/components/cragSectors/CragSectorDescription'

export default {
  components: { CragSectorDescription },
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
