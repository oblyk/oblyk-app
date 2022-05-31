<template>
  <div v-if="$fetchState.pending">
    <skeleton-loader-head />
  </div>
  <div v-else>
    <user-head :user="user" />
    <user-tabs :user="user" />
    <nuxt-child :key="$route.params.userUuid" :user="user" />
  </div>
</template>

<script>
import { UserConcern } from '@/concerns/UserConcern'
import UserHead from '@/components/users/layouts/UserHead'
import UserTabs from '@/components/users/layouts/UserTabs'
import SkeletonLoaderHead from '~/components/layouts/SkeletonLoaderHead'

export default {
  components: { SkeletonLoaderHead, UserTabs, UserHead },
  mixins: [UserConcern]
}
</script>
