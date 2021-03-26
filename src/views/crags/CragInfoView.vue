<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col class="pa-2 col-12 col-md-4">
          <crag-info :crag="crag" />
        </v-col>
        <v-col class="pa-2 col-12 col-md-4 d-flex flex-column">
          <div class="flex-grow-1">
            <crag-comment :crag="crag" />
          </div>
          <div
            v-if="crag.haveArticles"
            class="flex-grow-1 pt-4"
          >
            <crag-articles :crag="crag" />
          </div>
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
    <crag-route-drawer />
  </div>
</template>

<script>
import CragInfo from '@/components/crags/CragDescription'
import CragRoutes from '@/components/cragRoutes/CragRoutes'
import CragGuidesCard from '@/components/crags/CragGuidesCard'
import CragComment from '@/components/crags/CragComment'
import CragRouteDrawer from '@/components/cragRoutes/CragRouteDrawer'
import CragArticles from '@/components/crags/CragArticles'

export default {
  name: 'CragInfoView',
  components: {
    CragArticles,
    CragRouteDrawer,
    CragComment,
    CragGuidesCard,
    CragRoutes,
    CragInfo
  },
  props: {
    crag: Object
  },

  data () {
    return {
      drawer: false
    }
  }
}
</script>
