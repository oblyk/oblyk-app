<template>
  <div>
    <div v-if="!loadingCrag">
      <crag-head :crag="crag" />
      <v-tabs
        show-arrows
      >
        <v-tab to="infos">
          Info
        </v-tab>
        <v-tab to="routes">
          <v-badge
            color="primary"
            inline
            :content="crag.routes_figures.route_count"
          >
            Voies
          </v-badge>
        </v-tab>
        <v-tab to="photos">
          <v-badge
            color="primary"
            inline
            :content="crag.photo_count + crag.video_count"
          >
            Photos & Vidéos
          </v-badge>
        </v-tab>
        <v-tab to="guide-books">
          <v-badge
            color="primary"
            inline
            :content="crag.guide_books.paper_count + crag.guide_books.web_count + crag.guide_books.pdf_count"
          >
            Topos
          </v-badge>
        </v-tab>
        <v-tab to="maps">
          Carte
        </v-tab>
      </v-tabs>

      <router-view></router-view>
    </div>
    <spinner v-if="loadingCrag" />
  </div>
</template>
<script>
import { Cragable } from '@/concerns/Cragable'
import CragHead from '@/components/crags/layouts/CragHead'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'CragView',
  components: { Spinner, CragHead },
  mixins: [Cragable],
  props: {
    cragId: null,
    slug: null
  }
}
</script>
