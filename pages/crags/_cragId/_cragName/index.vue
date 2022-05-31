<template>
  <div v-if="crag">
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
      <v-row v-intersect="loadRouteList">
        <v-col>
          <crag-routes
            v-if="routeListe"
            :crag="crag"
          />
        </v-col>
      </v-row>
    </v-container>
    <client-only>
      <crag-route-drawer />
    </client-only>
  </div>
</template>

<script>
import CragInfo from '@/components/crags/CragDescription'
import CragGuidesCard from '@/components/crags/CragGuidesCard'
import CragComment from '@/components/crags/CragComment'
import CragArticles from '@/components/crags/CragArticles'
const CragRoutes = () => import('@/components/cragRoutes/CragRoutes')
const CragRouteDrawer = () => import('@/components/cragRoutes/CragRouteDrawer')

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
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      routeListe: false
    }
  },

  methods: {
    loadRouteList (entries, observer) {
      if (entries[0].isIntersecting) {
        this.routeListe = true
      }
    }
  }
}
</script>
