<template>
  <page-header
    :title="user.full_name"
    :back-to="backTo || '/community'"
    :links="headerLinks"
  />
</template>
<script>
import PageHeader from '~/components/layouts/PageHeader'

export default {
  name: 'UserPageHeader',
  components: { PageHeader },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    headerLinks () {
      const mediaCount = this.user.photos_count + this.user.videos_count
      return [
        {
          to: this.user.userPath,
          title: this.$t('components.user.tabs.profile')
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
  }
}

</script>
