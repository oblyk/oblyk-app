<template>
  <div>
    <user-media-tabs :user="user" />
    <div>
      <div
        v-if="!currentUserCanSeeMedias()"
        class="text-center mt-10 mb-10"
      >
        <p>
          <v-icon large>
            {{ mdiLock }}
          </v-icon>
        </p>
        <p>
          {{ $t('components.user.privateMedia', { name: user.first_name }) }}<br>
          {{ $t('components.user.subscribeToSee') }}
        </p>
      </div>
      <div v-else>
        <nuxt-child :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { mdiLock } from '@mdi/js'
import { SubscribeConcern } from '~/concerns/SubscribeConcern'
import UserMediaTabs from '~/components/users/layouts/UserMediaTabs'

export default {
  components: { UserMediaTabs },
  mixins: [SubscribeConcern],
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiLock
    }
  },

  methods: {
    currentUserCanSeeMedias () {
      // If user have public profil
      if (this.user.public_profile) { return true }

      // If current user is subscribed to user
      return (this.$auth.loggedIn && this.iAmSubscribedToThis('User', this.user.id) === 'subscribe')
    }
  }
}
</script>
