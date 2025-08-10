<template>
  <page-header
    :title="guideBookPaper.name"
    :back-to="backTo || '/outdoor'"
    :links="headerLinks"
  />
</template>
<script>
import PageHeader from '~/components/layouts/PageHeader'

export default {
  name: 'GuideBookPaperPageHeader',
  components: { PageHeader },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  computed: {
    headerLinks () {
      return [
        {
          to: this.guideBookPaper.path,
          title: this.$t('components.guideBookPaper.tabs.info')
        },
        {
          to: `${this.guideBookPaper.path}/points-of-sale`,
          title: this.$t('components.guideBookPaper.tabs.pointsOfSale'),
          badge: this.guideBookPaper.place_of_sales_count > 0 ? this.guideBookPaper.place_of_sales_count : null
        },
        {
          to: `${this.guideBookPaper.path}/photos`,
          title: this.$t('components.guideBookPaper.tabs.photos'),
          badge: this.guideBookPaper.photos_count > 0 ? this.guideBookPaper.photos_count : null
        },
        {
          to: `${this.guideBookPaper.path}/links`,
          title: this.$t('components.guideBookPaper.tabs.links'),
          badge: this.guideBookPaper.links_count > 0 ? this.guideBookPaper.links_count : null
        },
        {
          to: `${this.guideBookPaper.path}/map`,
          title: this.$t('components.guideBookPaper.tabs.map')
        },
        {
          to: `${this.guideBookPaper.path}/alternatives`,
          title: this.$t('components.guideBookPaper.tabs.alternatives')
        }
      ]
    },

    backTo () {
      return this.$store.getters['oblykEnvironment/getPreviousHubs'](this.$route.path, this.guideBookPaper.path)
    }
  }
}

</script>
