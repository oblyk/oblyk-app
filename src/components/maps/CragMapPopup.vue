<template>
  <v-card
    light
  >
    <v-img
      :src="cragPhoto()"
      height="150px"
    ></v-img>
    <v-card-title>
      {{ crag.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ crag.localization.country }}, {{ crag.localization.region }}, {{ crag.localization.city }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        color="primary lighten-2"
        text
        :to="cragRoute()"
      >
        Voir le site
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'CragMapPopup',
  props: {
    crag: null
  },

  methods: {
    cragPhoto: function () {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.crag.photo.url}`
    },

    cragRoute: function () {
      return `/crags/${this.crag.id}/${this.crag.slug_name}/infos`
    }
  }
}
</script>
