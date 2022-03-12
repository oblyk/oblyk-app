<template>
  <v-app :class="hasPaddingTop ? '' : 'no-padding-top-in-app'">
    <app-bar />
    <v-main :class="hasPaddingTop ? '' : 'pt-0'">
      <Nuxt />
    </v-main>
    <app-alert />

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

    <!-- Update Pwa-->
    <v-snackbar
      v-model="readyToUpdatePwa"
      timeout="-1"
    >
      <v-icon
        class="mb-1"
        left
        color="#ec407a"
      >
        {{ mdiGift }}
      </v-icon>
      {{ $t('common.pages.newVersion') }}
      <template #action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="reloadApp()"
        >
          {{ $t('actions.update') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mdiCookie, mdiGift } from '@mdi/js'
import AppBar from '~/components/layouts/AppBar'
import AppAlert from '~/components/layouts/AppAlert'
import { Cable } from '~/channels/Cable'

export default {
  components: { AppAlert, AppBar },
  mixins: [Cable],

  data () {
    return {
      mdiCookie,
      mdiGift,
      cookiesMessage: false,
      readyToUpdatePwa: false
    }
  },

  computed: {
    hasPaddingTop () {
      return this.$store.state.layout.layoutPadding
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
      // Connect cable
      this.connectCable()
    }
  },

  mounted () {
    this.$vuetify.theme.dark = this.$store.getters['theme/getTheme'] === 'dark'
    this.cookiesMessage = this.$store.getters['cookie/showCookiePopup']
    this.updateWorkbox()
  },

  methods: {
    acceptedCookies () {
      this.$store.dispatch('cookie/acceptCookies')
    },

    async updateWorkbox () {
      const workbox = await window.$workbox
      if (workbox) {
        workbox.addEventListener('installed', (event) => {
          if (event.isUpdate) {
            this.readyToUpdatePwa = true
          }
        })
      }
    },

    reloadApp () {
      window.location.reload()
    }
  }
}
</script>
