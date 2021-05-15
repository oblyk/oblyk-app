<template>
  <div>
    <user-media-tabs :user="user" />
    <v-container>
      <div
        class="text-center mt-10 mb-10"
        v-if="!currentUserCanSeeMedias()"
      >
        <p><v-icon large>mdi-lock</v-icon></p>
        <p>
          {{ $t('components.user.privateMedia', { name: user.first_name }) }}<br>
          {{ $t('components.user.subscribeToSee') }}
        </p>
      </div>
      <div v-else>
        <router-view :user="user" />
      </div>
    </v-container>
  </div>
</template>

<script>
import UserMediaTabs from '@/components/users/layouts/UserMediaTabs'
import { SessionConcern } from '@/concerns/SessionConcern'
export default {
  name: 'UserMediaView',
  components: { UserMediaTabs },
  mixins: [SessionConcern],
  props: {
    user: Object
  },

  methods: {
    currentUserCanSeeMedias: function () {
      // If user have public profil
      if (this.user.public_profile) return true

      // If current user is subscribe to user
      return (this.isLoggedIn && this.iAmSubscribedToThis('User', this.user.id) === 'subscribe')
    }
  }
}
</script>
