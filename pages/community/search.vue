<template>
  <div>
    <page-header :title="$t('components.community.search')" back-to="/community" />
    <community-search-overview />
  </div>
</template>

<script>
import PageHeader from '~/components/layouts/PageHeader'
import CommunitySearchOverview from '~/components/community/CommunitySearchOverview'

export default {
  components: { CommunitySearchOverview, PageHeader },
  i18n: {
    messages: {
      fr: {
        metaTitle: 'Chercher un grimpeur, une grimpeuse',
        metaDescription: 'Retrouver vos amis ou des gens avec qui aller grimper'
      },
      en: {
        metaTitle: 'Looking for a climber',
        metaDescription: 'Find friends or people to go climbing with'
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
