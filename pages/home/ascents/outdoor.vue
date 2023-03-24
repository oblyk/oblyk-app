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
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'
import Spinner from '~/components/layouts/Spiner.vue'
import UserAccentsTabs from '~/components/users/layouts/UserAscentsTabs.vue'

export default {
  components: { UserAccentsTabs, Spinner },
  mixins: [CurrentUserConcern],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Mes croix outdoor'
      },
      en: {
        metaTitle: 'My outdoor ascents'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
