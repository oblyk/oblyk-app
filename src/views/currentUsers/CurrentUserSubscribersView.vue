<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-tabs :user="currentUser" />
      <v-container>
        <v-row>
          <v-col>
            ...
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserTabs from '@/components/users/layouts/UserTabs'

export default {
  name: 'CurrentUserSubscribersView',
  components: { UserTabs, Spinner },
  mixins: [CurrentUserConcern]
}
</script>
