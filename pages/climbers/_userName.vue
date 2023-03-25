<template>
  <div>
    <v-container
      v-if="$fetchState.pending"
      class-name="dashboard-container"
    >
      <skeleton-loader-head />
    </v-container>
    <v-container
      v-else
      class-name="dashboard-container"
    >
      <user-head :user="user" />
      <user-tabs :user="user" />
      <nuxt-child :key="$route.params.userUuid" :user="user" />
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { UserConcern } from '~/concerns/UserConcern'
import UserHead from '~/components/users/layouts/UserHead.vue'
import UserTabs from '~/components/users/layouts/UserTabs.vue'
import SkeletonLoaderHead from '~/components/layouts/SkeletonLoaderHead.vue'
import AppFooter from '~/components/layouts/AppFooter.vue'

export default {
  components: { AppFooter, SkeletonLoaderHead, UserTabs, UserHead },
  mixins: [UserConcern]
}
</script>
