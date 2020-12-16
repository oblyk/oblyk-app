<template>
  <div>
    <v-card
      link
      flat
      :to="cragRouteUrl()"
    >
      <v-list-item three-line>
        <v-list-item-avatar
          size="70"
        >
          <v-avatar
            color="grey"
            size="70"
            tile
          >
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ cragRoute.grade_gap.min_grade_text }} {{ cragRoute.grade_gap.max_grade_text }}
            {{ cragRoute.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0"
            >
              LIGNE
            </v-alert>
            {{ cragRoute.name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'CragRouteSearchResult',
  props: {
    cragRoute: null
  },

  methods: {
    cragRouteUrl: function () {
      return '/crags'
    },

    cragRoutePhoto: function () {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cragRoute.photo.url}`
    }
  }
}
</script>
