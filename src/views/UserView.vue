<template>
  <div v-if="user">
    <user-head :user="user" />
    <user-tabs :user="user" />
    <router-view :user="user" />
  </div>
</template>

<script>
import { UserConcern } from '@/concerns/UserConcern'
import UserHead from '@/components/users/layouts/UserHead'
import UserTabs from '@/components/users/layouts/UserTabs'

export default {
  name: 'UserView',
  mixins: [UserConcern],
  components: { UserTabs, UserHead }
}
</script>
