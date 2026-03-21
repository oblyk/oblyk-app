<template>
  <page-header
    :title="user.full_name"
    :back-to="backTo || '/community'"
    :links="headerLinks"
  />
</template>
<script>
import { mdiInformation } from '@mdi/js'
import { oblykOutdoorPanel } from '~/assets/oblyk-icons'
import PageHeader from '~/components/layouts/PageHeader'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'UserPageHeader',
  components: { PageHeader },
  props: {
    user: {
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
      const mediaCount = this.user.photos_count + this.user.videos_count
      return [
        {
          to: this.user.userPath,
          title: null,
          icon: mdiInformation
        },
        {
          to: `${this.user.app_path}/publications`,
          title: null,
          badge: this.unreadPublicationCount,
          icon: oblykOutdoorPanel
        },
        {
          to: `${this.user.userPath}/ascents/outdoor`,
          title: this.$t('components.user.ascentTabs.sendList')
        },
        {
          to: `${this.user.userPath}/media/photos`,
          title: this.$t('components.user.tabs.photos'),
          badge: mediaCount > 0 ? mediaCount : null
        },
        {
          to: `${this.user.userPath}/subscribes`,
          title: this.$t('components.user.tabs.subscribes'),
          badge: this.user.subscribes_count > 0 ? this.user.subscribes_count : null
        },
        {
          to: `${this.user.userPath}/followers`,
          title: this.$t('components.user.tabs.followers'),
          badge: this.user.followers_count > 0 ? this.user.followers_count : null
        }
      ]
    },

    backTo () {
      return this.$store.getters['oblykEnvironment/getPreviousHubs'](this.$route.path, this.user.userPath)
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
        .get('/publication_views/unread_count', { publishable_type: 'User', publishable_id: this.user.id })
        .then((resp) => {
          this.unreadPublicationCount = resp.data
        })
    }
  }
}

</script>
