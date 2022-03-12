<template>
  <div>
    <user-media-tabs :user="user" />
    <v-container>
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
    </v-container>
  </div>
</template>

<script>
import { mdiLock } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import UserMediaTabs from '@/components/users/layouts/UserMediaTabs'

export default {
  components: { UserMediaTabs },
  mixins: [SessionConcern],
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

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', false)
  },

  methods: {
    currentUserCanSeeMedias () {
      // If user have public profil
      if (this.user.public_profile) { return true }

      // If current user is subscribed to user
      return (this.isLoggedIn && this.iAmSubscribedToThis('User', this.user.id) === 'subscribe')
    }
  }
}
</script>
