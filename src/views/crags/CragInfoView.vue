<template>
  <div>
    <spinner v-if="load" />

    <v-container v-if="!load">
      <v-row>
        <v-col class="pa-2" md="7">
          <v-card>
            <v-card-title>Info sur {{ crag.name }}</v-card-title>
            <v-card-text>
              {{ crag.name }} est un site d'escalade de [climbing_type] de [roche], situé à
              {{ crag.localization.city }} dans le département {{ crag.localization.region }}
              ({{ crag.localization.code_country }})<br>
              On y trouve {{ crag.routes_figures.route_count }} lignes allant de {{ crag.routes_figures.grade.min_text }}
              à {{ crag.routes_figures.grade.max_text }}
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="pa-2" md="5">
          <v-card>
            <v-card-title>Orientation</v-card-title>
            <v-card-text>
              balbla orientation
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import CragApi from '@/services/oblyk-api/crag'
import CragModel from '@/models/CragModel'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'CragInfoView',
  components: { Spinner },
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
        .find(this.$route.params.cragId)
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
