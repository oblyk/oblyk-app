<template>
  <v-container style="max-width: 430px">
    <v-skeleton-loader
      v-if="$fetchState.pending"
      type="article"
    />
    <publication-card
      v-else
      :publication="publication"
    />
  </v-container>
</template>
<script>
import PublicationCard from '~/components/publications/PublicationCard'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  components: { PublicationCard },
  data () {
    return {
      publication: null
    }
  },

  async fetch () {
    await new OblykApi(this.$axios, this.$auth)
      .get(`/publications/${this.$route.params.publicationId}`)
      .then((resp) => {
        this.publication = resp.data
      })
  }
}
</script>
