<template>
  <div>
    <skeleton-loader-page-head v-if="$fetchState.pending" />
    <div v-else>
      <user-page-header :user="user" />
      <v-container class="dashboard-container">
        <nuxt-child :key="$route.params.userUuid" :user="user" />
      </v-container>
      <app-footer />
    </div>
  </div>
</template>

<script>
import { UserConcern } from '~/concerns/UserConcern'
import AppFooter from '~/components/layouts/AppFooter'
import SkeletonLoaderPageHead from '~/components/layouts/SkeletonLoaderPageHead'
import UserPageHeader from '~/components/users/layouts/UserPageHeader'

export default {
  components: { UserPageHeader, SkeletonLoaderPageHead, AppFooter },
  mixins: [UserConcern]
}
</script>
