<template>
  <div>
    <page-header
      :title="$t('components.user.tabs.community')"
      back-to="/home"
      :links="headerLinks"
    />

    <spinner v-if="!currentUser" />
    <div v-else>
      <v-container>
        <router-view :user="currentUser" />
      </v-container>
    </div>
  </div>
</template>
<script>
import { mdiAccountMultiple, mdiAccountHeart } from '@mdi/js'
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
        metaTitle: 'Ma communauté'
      },
      en: {
        metaTitle: 'My community'
      }
    }
  },

  data () {
    return {
      headerLinks: [
        {
          to: '/home/community/followers',
          title: this.$t('components.user.tabs.followers'),
          icon: mdiAccountMultiple
        },
        {
          to: '/home/community/subscribes',
          title: this.$t('components.user.tabs.subscribes'),
          icon: mdiAccountHeart
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
