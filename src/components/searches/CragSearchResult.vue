<template>
  <div>
    <v-card
      link
      flat
      :to="cragUrl()"
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
            <v-img :src="cragPhoto()"></v-img>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ crag.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0"
            >
              SITE
            </v-alert>
            {{ crag.localization.country }}, {{ crag.localization.region }}, {{ crag.localization.city }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'CragSearchResult',
  props: {
    crag: null
  },

  methods: {
    cragUrl: function () {
      return `/crags/${this.crag.id}/${this.crag.slug_name}/infos`
    },

    cragPhoto: function () {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.photo.url}`
    }
  }
}
</script>
