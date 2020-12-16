<template>
  <div>
    <v-card
      link
      flat
      :to="cragSectorUrl()"
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
            {{ cragSector.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0"
            >
              SECTEUR
            </v-alert>
            {{ cragSector.name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'CragSectorSearchResult',
  props: {
    cragSector: null
  },

  methods: {
    cragSectorUrl: function () {
      return '/crags'
    },

    cragSectorPhoto: function () {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.cragSector.photo.url}`
    }
  }
}
</script>
