<template>
  <div>
    <current-user-media-tabs />

    <spinner v-if="!currentUser" />
    <div v-else>
      <v-container>
        <nuxt-child :user="currentUser" />
      </v-container>
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import CurrentUserMediaTabs from '~/components/users/layouts/CurrentUserMediaTabs.vue'
import Spinner from '~/components/layouts/Spiner.vue'

export default {
  name: 'CurrentUserMediaView',
  components: { Spinner, CurrentUserMediaTabs },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
