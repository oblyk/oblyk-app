<template>
  <v-container>
    <v-row class="mt-4">
      <v-col cols="12" lg="8" offset-lg="1">
        <climbing-session />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ClimbingSession from '~/components/climbingSessions/ClimbingSession.vue'

export default {
  components: { ClimbingSession },

  head () {
    return {
      title: this.$t('meta.climbingSessions.title'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' },
        { hid: 'description', name: 'description', content: this.$t('meta.climbingSessions.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.climbingSessions.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.climbingSessions.description') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
