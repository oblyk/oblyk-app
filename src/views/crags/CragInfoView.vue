<template>
  <div>
    <spinner v-if="loadingCrag" />

    <v-container v-if="!loadingCrag">
      <v-row>
        <v-col class="pa-2 col-12 col-md-4">
          <crag-info :crag="crag" />
        </v-col>
        <v-col class="pa-2 col-12 col-md-4">
          <crag-localization :crag="crag" />
        </v-col>
        <v-col class="pa-2 col-12 col-md-4">
          <crag-guides-card :crag="crag" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <crag-routes :crag="crag" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { CragConcern } from '@/concerns/CragConcern'
import Spinner from '@/components/layouts/Spiner'
import CragInfo from '@/components/crags/CragDescription'
import CragRoutes from '@/components/cragRoutes/CragRoutes'
import CragLocalization from '@/components/crags/CragLocalization'
import CragGuidesCard from '@/components/crags/CragGuidesCard'

export default {
  name: 'CragInfoView',
  components: { CragGuidesCard, CragLocalization, CragRoutes, CragInfo, Spinner },
  mixins: [CragConcern]
}
</script>
