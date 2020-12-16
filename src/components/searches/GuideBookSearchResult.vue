<template>
  <div>
    <v-card
      link
      flat
      :to="guideBookUrl()"
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
            {{ guideBook.name }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0"
            >
              TOPO
            </v-alert>
            {{ guideBook.publication_year }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'GuideBookSearchResult',
  props: {
    guideBook: null
  },

  methods: {
    guideBookUrl: function () {
      return `/guide-books/${this.guideBook.id}/${this.guideBook.slug_name}/infos`
    },

    guideBookPhoto: function () {
      return `${process.env.VUE_APP_OBLYK_API_URL}${this.guideBook.logo.url}`
    }
  }
}
</script>
