<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-tabs :user="currentUser" />
      <current-user-media-tabs :user="currentUser" />
      <v-container>
        <router-view :user="currentUser" />
      </v-container>
    </div>
  </div>
</template>

<script>
import CurrentUserMediaTabs from '@/components/users/layouts/CurrentUserMediaTabs'
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserTabs from '@/components/users/layouts/UserTabs'

export default {
  name: 'CurrentUserMediaView',
  components: { UserTabs, Spinner, CurrentUserMediaTabs },
  mixins: [CurrentUserConcern],

  props: {
    user: Object
  }
}
</script>
