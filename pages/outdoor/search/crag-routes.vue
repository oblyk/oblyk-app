<template>
  <div>
    <outdoor-search-page-header :title="$t('components.cragRoute.searchRoute')" />
    <outdoor-search-crag-route-overview />
  </div>
</template>
<script>
import OutdoorSearchPageHeader from '~/components/outdoor/OutdoorSearchPageHeader'
import OutdoorSearchCragRouteOverview from '~/components/outdoor/OutdoorSearchCragRouteOverview'

export default {
  components: { OutdoorSearchCragRouteOverview, OutdoorSearchPageHeader },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Chercher une voie, un bloc, une via ferrata',
        metaDescription: "Chercher une voie, un bloc, une via ferrata dans la base d'Oblyk"
      },
      en: {
        metaTitle: 'Search for a route, a boulder, a via ferrata',
        metaDescription: 'Search for a route, a boulder, or a via ferrata in the Oblyk database.'
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
  }
}
</script>
