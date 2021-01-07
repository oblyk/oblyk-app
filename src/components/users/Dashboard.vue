<template>
  <div>
    <spinner v-if="loadingMeUser" />

    <div v-else>
      <user-head :user="meUser" />
      <user-tabs :user="meUser" />
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import { MeUserConcern } from '@/concerns/MeUserConcern'
import UserHead from '@/components/users/layouts/UserHead'
import UserTabs from '@/components/users/layouts/UserTabs'
export default {
  name: 'Dashboard',
  mixins: [MeUserConcern],
  components: { UserTabs, UserHead, Spinner }
}
</script>
