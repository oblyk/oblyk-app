<template>
  <div>
    <spinner v-if="loadingUserCurrent" />

    <div v-else>
      <user-head :user="userCurrent" />
      <user-tabs :user="userCurrent" />
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import { UserCurrentConcern } from '@/concerns/UserCurrentConcern'
import UserHead from '@/components/users/layouts/UserHead'
import UserTabs from '@/components/users/layouts/UserTabs'
export default {
  name: 'Dashboard',
  mixins: [UserCurrentConcern],
  components: { UserTabs, UserHead, Spinner }
}
</script>
