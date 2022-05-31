<template>
  <div>
    <spinner v-if="loadingCurrentUser" />

    <div v-if="!loadingCurrentUser">
      <user-accents-tabs :user="currentUser" />
      <nuxt-child :user="currentUser" />
    </div>
  </div>
</template>

<script>
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import Spinner from '@/components/layouts/Spiner'
import UserAccentsTabs from '@/components/users/layouts/UserAscentsTabs'

export default {
  components: { UserAccentsTabs, Spinner },
  mixins: [CurrentUserConcern],

  head () {
    return {
      title: this.$t('meta.currentUser.ascents')
    }
  }
}
</script>
