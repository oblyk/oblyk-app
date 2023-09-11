<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>

    <!-- Display alert -->
    <client-only>
      <app-alert />
    </client-only>

    <!-- About cookies -->
    <v-snackbar
      v-model="cookiesMessage"
      timeout="-1"
    >
      <v-icon
        left
        color="#b77121"
      >
        {{ mdiCookie }}
      </v-icon>
      {{ $t('common.pages.cookies') }}
      <template #action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="acceptedCookies()"
        >
          {{ $t('actions.ok') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mdiCookie } from '@mdi/js'
import { Cable } from '~/channels/Cable'
import { Channels } from '~/channels/Channels'
import AppAlert from '~/components/layouts/AppAlert.vue'

export default {
  components: { AppAlert },
  mixins: [
    Cable,
    Channels
  ],

  data () {
    return {
      cookiesMessage: false,

      mdiCookie
    }
  },

  watch: {
    '$store.state.cookie.okCookie' () {
      this.cookiesMessage = this.$store.getters['cookie/showCookiePopup']
    },

    '$store.state.theme.theme' () {
      this.$vuetify.theme.dark = this.$store.getters['theme/getTheme'] === 'dark'
    }
  },

  created () {
    if (process.client) {
      this.connectCable()
    }
  },

  mounted () {
    this.$vuetify.theme.dark = this.$store.getters['theme/getTheme'] === 'dark'
    this.cookiesMessage = this.$store.getters['cookie/showCookiePopup']
    if (this.$auth.loggedIn) {
      this.$auth.fetchUser()
      this.connectChannel()
    }
  },

  beforeDestroy () {
    this.disconnectChannel()
  },

  methods: {
    acceptedCookies () {
      this.$store.dispatch('cookie/acceptCookies')
    },

    connectChannel () {
      this.$cable.subscribe({ channel: 'NotificationChannel' })
      this.$cable.subscribe({ channel: 'FetchUserChannel' })
    },

    disconnectChannel () {
      this.$cable.unsubscribe('NotificationChannel')
      this.$cable.unsubscribe('FetchUserChannel')
    }
  }
}
</script>
