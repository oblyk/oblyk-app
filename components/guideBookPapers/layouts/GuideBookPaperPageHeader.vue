<template>
  <page-header
    :title="guideBookPaper.name"
    :back-to="backTo || '/outdoor'"
    :links="headerLinks"
  />
</template>
<script>
import { mdiInformation } from '@mdi/js'
import { oblykOutdoorPanel } from '~/assets/oblyk-icons'
import PageHeader from '~/components/layouts/PageHeader'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'GuideBookPaperPageHeader',
  components: { PageHeader },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      unreadPublicationCount: 0
    }
  },

  computed: {
    headerLinks () {
      return [
        {
          to: this.guideBookPaper.path,
          title: null,
          icon: mdiInformation
        },
        {
          to: `${this.guideBookPaper.path}/publications`,
          title: null,
          badge: this.unreadPublicationCount,
          icon: oblykOutdoorPanel
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
  },

  mounted () {
    if (this.$auth.loggedIn) {
      this.getUnreadPublication()
    }
  },

  methods: {
    getUnreadPublication () {
      new OblykApi(this.$axios, this.$auth)
        .get('/publication_views/unread_count', { publishable_type: 'GuideBookPaper', publishable_id: this.guideBookPaper.id })
        .then((resp) => {
          this.unreadPublicationCount = resp.data
        })
    }
  }
}

</script>
