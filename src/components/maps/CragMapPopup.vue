<template>
  <v-card
    light
  >
    <v-img
      :src="crag.coverUrl()"
      height="150px"
    ></v-img>
    <v-card-title>
      {{ crag.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ crag.localization.country }}, {{ crag.localization.region }}, {{ crag.localization.city }}
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary lighten-2"
        text
        :to="crag.url()"
      >
        Voir le site
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import Crag from '@/models/Crag'

export default {
  name: 'CragMapPopup',
  props: {
    cragData: null
  },

  data () {
    return {
      crag: new Crag(this.cragData)
    }
  }
}
</script>
