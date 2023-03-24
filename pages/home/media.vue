<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <current-user-media-tabs :user="currentUser" />
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

  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
