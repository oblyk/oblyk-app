<template>
  <div>
    <outdoor-search-page-header :title="$t('components.crag.searchCrag')" />
    <outdoor-search-crag-overview />
  </div>
</template>

<script>
import OutdoorSearchPageHeader from '~/components/outdoor/OutdoorSearchPageHeader'
import OutdoorSearchCragOverview from '~/components/outdoor/OutdoorSearchCragOverview'

export default {
  components: { OutdoorSearchCragOverview, OutdoorSearchPageHeader },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Chercher une falaise, une topo, une voie',
        metaDescription: "Chercher une falaise, une topo, une voie sur dans la base de donnée d'Oblyk"
      },
      en: {
        metaTitle: 'Search for a crag, a climbing guidebook, a route',
        metaDescription: 'Search for a crag, a climbing guidebook, or a route in the Oblyk database.'
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
