<template>
  <v-app>
    <v-main>
      <Nuxt />
    </v-main>

    <!-- Display alert -->
    <client-only>
      <app-alert />
    </client-only>
  </v-app>
</template>

<script>
import { Cable } from '~/channels/Cable'
import { Channels } from '~/channels/Channels'
import { ThemeColorMixin } from '~/mixins/ThemeColorMixin'
import AppAlert from '~/components/layouts/AppAlert'

export default {
  components: { AppAlert },
  mixins: [
    Cable,
    Channels,
    ThemeColorMixin
  ],

  watch: {
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
    if (this.$auth.loggedIn) {
      this.$auth.fetchUser()
      this.connectChannel()
    }
  },

  beforeDestroy () {
    this.disconnectChannel()
  },

  methods: {
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
