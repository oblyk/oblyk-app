<template>
  <div>
    <div v-if="$fetchState.pending">
      <v-container>
        <v-skeleton-loader
          class="mx-auto"
          type="image, table-heading, divider, list-item-three-line, actions"
        />
      </v-container>
    </div>
    <div v-else>
      <div class="crag-sector-card mt-0 mt-md-7">
        <v-card>
          <crag-sector-head :crag-sector="cragSector" />
          <crag-sector-tabs :crag-sector="cragSector" />
          <nuxt-child :crag-sector="cragSector" />
        </v-card>
      </div>
      <app-footer />
    </div>
  </div>
</template>

<script>
import { CragSectorConcern } from '~/concerns/CragSectorConcern'
import CragSectorHead from '~/components/cragSectors/layout/CragSectorHead'
import CragSectorTabs from '~/components/cragSectors/layout/CragSectorTabs'
import AppFooter from '~/components/layouts/AppFooter'

export default {
  components: {
    AppFooter,
    CragSectorTabs,
    CragSectorHead
  },
  mixins: [CragSectorConcern]
}
</script>

<style lang="scss" scoped>
.crag-sector-card {
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
}
</style>
