<template>
  <v-app v-resize="onResize">
    <!-- Top app bar -->
    <app-bar
      v-if="!mobile"
      :inverse-drawer="inverseDrawer"
    />

    <!-- Left slide app menu -->
    <v-navigation-drawer
      v-model="drawer"
      class="oblyk-navigation-drawer"
      app
      dark
      width="300"
    >
      <lazy-hydrate
        never
        :trigger-hydration="drawer"
      >
        <app-drawer />
      </lazy-hydrate>
    </v-navigation-drawer>

    <v-main>
      <Nuxt />
    </v-main>

    <app-bottom-navigation
      v-if="mobile"
      :inverse-drawer="inverseDrawer"
    />

    <!-- Display alert -->
    <app-alert />

    <!-- Control my geolocation -->
    <client-only>
      <localization-popup />
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

    <!-- Update Pwa-->
    <v-snackbar
      v-model="readyToUpdatePwa"
      timeout="-1"
      vertical
    >
      <p class="font-weight-bold mb-2">
        <v-icon
          left
          class="mt-n1"
          color="primary"
        >
          {{ mdiGift }}
        </v-icon>
        {{ $t('common.pages.newVersion') }}
      </p>
      <p class="mb-n1" v-html="$t('common.pages.clicToUpdate')" />
      <template #action="{ attrs }">
        <v-btn
          color="white"
          text
          outlined
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
import LazyHydrate from 'vue-lazy-hydration'
import AppBar from '~/components/layouts/AppBar'
import AppAlert from '~/components/layouts/AppAlert'
import { Cable } from '~/channels/Cable'
import AppBottomNavigation from '~/components/layouts/AppBottomNavigation'
const AppDrawer = () => import('@/components/layouts/AppDrawer')
const LocalizationPopup = () => import('~/components/maps/LocalizationPopup')

export default {
  components: {
    AppBottomNavigation,
    AppDrawer,
    LocalizationPopup,
    AppAlert,
    AppBar,
    LazyHydrate
  },
  mixins: [Cable],

  data () {
    return {
      drawer: false,
      cookiesMessage: false,
      readyToUpdatePwa: false,

      watchLocationId: null,
      mobile: true,

      mdiCookie,
      mdiGift
    }
  },

  watch: {
    '$store.state.cookie.okCookie' () {
      this.cookiesMessage = this.$store.getters['cookie/showCookiePopup']
    },

    '$store.state.theme.theme' () {
      this.$vuetify.theme.dark = this.$store.getters['theme/getTheme'] === 'dark'
    },

    '$store.state.geolocation.status' () {
      if (this.$store.state.geolocation.status === 'activate') {
        this.activateWatchGeolocation()
      } else if (this.watchLocationId !== null) {
        this.deactivateWatchGeolocation()
      }
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
    if (this.$store.state.geolocation.status === 'activate') {
      this.activateWatchGeolocation()
    }
  },

  methods: {
    acceptedCookies () {
      this.$store.dispatch('cookie/acceptCookies')
    },

    inverseDrawer () {
      this.drawer = !this.drawer
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
    },

    activateWatchGeolocation () {
      if (navigator.geolocation) {
        this.watchLocationId = navigator.geolocation.watchPosition(
          (position) => {
            this.$store.dispatch('geolocation/setLocation', {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          },
          () => {
            this.$store.dispatch('geolocation/deactivateLocation')
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 0
          }
        )
      }
    },

    deactivateWatchGeolocation () {
      if (navigator.geolocation) {
        if (this.watchLocationId) {
          navigator.geolocation.clearWatch(this.watchLocationId)
          this.$store.dispatch('geolocation/deactivateLocation')
        }
      }
    },

    onResize () {
      this.mobile = window.innerWidth < 600
    }
  }
}
</script>

<style lang="scss">
.oblyk-navigation-drawer {
  .v-navigation-drawer__content {
    background-color: #121212;
  }
}
</style>
