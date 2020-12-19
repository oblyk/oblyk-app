<template>
  <div>
    <div v-if="!load">
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
    <spinner v-if="load" />
  </div>
</template>
<script>
import CragApi from '@/services/oblyk-api/crag'
import CragHead from '@/components/crags/layouts/CragHead'
import Spinner from '@/components/layouts/Spiner'
import CragModel from '@/models/CragModel'

export default {
  name: 'CragView',
  components: { Spinner, CragHead },
  props: {
    cragId: null,
    slug: null
  },

  data () {
    return {
      crag: null,
      load: true
    }
  },

  created () {
    this.getCrag()
  },

  methods: {
    getCrag: function () {
      CragApi
        .find(this.cragId)
        .then(resp => {
          this.crag = new CragModel(resp.data)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.load = false
        })
    }
  }
}
</script>
