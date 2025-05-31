<template>
  <div>
    <page-header
      :title="$t('components.user.tabs.media')"
      back-to="/home"
      :links="headerLinks"
    />

    <spinner v-if="!currentUser" />
    <div v-else>
      <v-container>
        <nuxt-child :user="currentUser" />
      </v-container>
    </div>
  </div>
</template>

<script>
import { mdiImage, mdiVideo } from '@mdi/js'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner'
import PageHeader from '~/components/layouts/PageHeader'

export default {
  name: 'CurrentUserMediaView',
  components: { PageHeader, Spinner },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      headerLinks: [
        {
          to: '/home/media/photos',
          title: this.$t('components.user.tabs.photos'),
          icon: mdiImage
        },
        {
          to: '/home/media/videos',
          title: this.$t('components.user.tabs.videos'),
          icon: mdiVideo
        }
      ]
    }
  }
}
</script>
