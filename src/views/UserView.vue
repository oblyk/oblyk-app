<template>
  <div v-if="user">
    <user-head :user="user" />
    <user-tabs :user="user" />
    <v-container>
      <router-view :user="user" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
import { UserConcern } from '@/concerns/UserConcern'
import UserHead from '@/components/users/layouts/UserHead'
import UserTabs from '@/components/users/layouts/UserTabs'

export default {
  name: 'UserView',
  mixins: [UserConcern],
  components: { UserTabs, UserHead, AppFooter }
}
</script>
