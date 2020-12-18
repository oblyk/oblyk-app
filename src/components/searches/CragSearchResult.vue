<template>
  <div>
    <v-card
      link
      flat
      :to="crag.url()"
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
            <v-img :src="crag.cover()"></v-img>
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
import CragModel from '@/models/CragModel'

export default {
  name: 'CragSearchResult',
  props: {
    cragData: null
  },

  data () {
    return {
      crag: new CragModel(this.cragData)
    }
  }
}
</script>
