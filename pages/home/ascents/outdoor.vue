<template>
  <div>
    <page-header
      :title="$t('components.layout.appDrawer.user.ascents.outdoor')"
      back-to="/home"
      :links="headerLinks"
    />

    <spinner v-if="!currentUser" />
    <div v-else>
      <nuxt-child :user="currentUser" />
    </div>
  </div>
</template>

<script>
import { mdiImageAlbum, mdiChartBar, mdiFormatListCheckbox, mdiCropFree } from '@mdi/js'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  components: { PageHeader, Spinner },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes croix outdoor'
      },
      en: {
        metaTitle: 'My outdoor ascents'
      }
    }
  },

  data () {
    return {
      headerLinks: [
        {
          to: '/home/ascents/outdoor',
          title: this.$t('components.user.ascentTabs.sendList'),
          icon: mdiImageAlbum
        },
        {
          to: '/home/ascents/outdoor/analytiks',
          title: this.$t('components.user.ascentTabs.analytiks'),
          icon: mdiChartBar
        },
        {
          to: '/home/ascents/outdoor/tick-list',
          title: this.$t('components.user.ascentTabs.tickList'),
          icon: mdiFormatListCheckbox
        },
        {
          to: '/home/ascents/outdoor/projects',
          title: this.$t('components.user.ascentTabs.projects'),
          icon: mdiCropFree
        }
      ]
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
