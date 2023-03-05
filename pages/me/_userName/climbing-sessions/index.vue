<template>
  <v-container fluid>
    <v-row class="mt-4">
      <v-col cols="12" lg="9" offset-lg="1">
        <climbing-session
          v-if="paramsAreRetrieved"
          :filters="filters"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClimbingSession from '~/components/climbingSessions/ClimbingSession.vue'

export default {
  components: { ClimbingSession },

  data () {
    return {
      paramsAreRetrieved: false,
      filters: {}
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes sessions de grimpes',
        metaDescription: 'La liste de toutes mes sessions de grimpes'
      },
      en: {
        metaTitle: 'My climbing sessions',
        metaDescription: 'The list of all my climbing sessions'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('only-indoor') === 'true') { this.filters.only_gym = 'true' }
    if (urlParams.get('only-outdoor') === 'true') { this.filters.only_crag = 'true' }
    this.paramsAreRetrieved = true
  }
}
</script>
