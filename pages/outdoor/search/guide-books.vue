<template>
  <div>
    <outdoor-search-page-header :title="$t('components.guideBookPaper.searchGuideBookPaper')" />
    <outdoor-search-guide-book-overview />
  </div>
</template>

<script>
import OutdoorSearchPageHeader from '~/components/outdoor/OutdoorSearchPageHeader'
import OutdoorSearchGuideBookOverview from '~/components/outdoor/OutdoorSearchGuideBookOverview'

export default {
  components: { OutdoorSearchGuideBookOverview, OutdoorSearchPageHeader },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Chercher un topo d'escalade",
        metaDescription: "Chercher un topo d'escalade dans la base de donnée d'Oblyk"
      },
      en: {
        metaTitle: 'Search for a climbing guidebook',
        metaDescription: 'Search for a climbing guide in the Oblyk database'
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
