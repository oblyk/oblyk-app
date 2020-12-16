<template>
  <v-container>
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
</template>
<script>
import OblykApi from '@/services/oblyk-api'

export default {
  name: 'CragInfoPage',
  data () {
    return {
      crag: null
    }
  },

  created () {
    this.getCrag()
  },

  methods: {
    getCrag: function () {
      OblykApi
        .getCrag(this.$route.params.cragId)
        .then(resp => {
          this.crag = resp.data
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
