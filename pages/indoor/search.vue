<template>
  <div>
    <page-header :title="$t('components.gym.searchGym')" back-to="/indoor" />
    <indoor-search-overview />
  </div>
</template>

<script>
import PageHeader from '~/components/layouts/PageHeader'
import IndoorSearchOverview from '~/components/indoor/IndoorSearchOverview'

export default {
  components: { IndoorSearchOverview, PageHeader },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Chercher une salle',
        metaDescription: 'Chercher et consulter le topo des salles'
      },
      en: {
        metaTitle: 'Search for climbing gym',
        metaDescription: 'Search and view the guide book of climbing gyms'
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
