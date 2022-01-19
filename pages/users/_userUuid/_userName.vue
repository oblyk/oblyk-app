<template>
  <div v-if="user">
    <user-head :user="user" />
    <user-tabs :user="user" />
    <nuxt-child :key="$route.params.userUuid" :user="user" />
  </div>
</template>

<script>
import { UserConcern } from '@/concerns/UserConcern'
import UserHead from '@/components/users/layouts/UserHead'
import UserTabs from '@/components/users/layouts/UserTabs'

export default {
  components: { UserTabs, UserHead },
  mixins: [UserConcern],

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', false)
  }
}
</script>
