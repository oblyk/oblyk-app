<template>
  <v-app>
    <!-- Top app bar -->
    <app-bar
      v-if="!$vuetify.breakpoint.mobile"
      :inverse-drawer="inverseDrawer"
    />

    <!-- Left slide app menu -->
    <v-navigation-drawer
      v-model="drawer"
      class="oblyk-navigation-drawer"
      app
      :touchless="!drawer"
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

    <client-only>
      <app-bottom-navigation
        v-if="$vuetify.breakpoint.mobile"
        :inverse-drawer="inverseDrawer"
      />

      <!-- Display alert -->
      <app-alert />

      <!-- Control my geolocation -->
      <localization-popup />
    </client-only>

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
import { mdiGift } from '@mdi/js'
import LazyHydrate from 'vue-lazy-hydration'
import { Cable } from '~/channels/Cable'
import { Channels } from '~/channels/Channels'
import { ThemeColorMixin } from '~/mixins/ThemeColorMixin'
import AppBar from '~/components/layouts/AppBar'
import AppAlert from '~/components/layouts/AppAlert'
import AppBottomNavigation from '~/components/layouts/AppBottomNavigation'
import NotificationApi from '~/services/oblyk-api/NotificationApi'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
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
  mixins: [
    Cable,
    Channels,
    ThemeColorMixin
  ],

  data () {
    return {
      drawer: false,
      readyToUpdatePwa: false,

      watchLocationId: null,

      mdiGift
    }
  },

  computed: {
    localizationActivated () {
      return this.$store.getters['geolocation/localizationActivated']
    }
  },

  watch: {
    '$store.state.theme.theme' () {
      this.$vuetify.theme.dark = this.$store.getters['theme/getTheme'] === 'dark'
    },

    '$store.state.geolocation.status' () {
      if (this.localizationActivated) {
        this.activateWatchGeolocation()
      } else if (this.watchLocationId !== null) {
        this.deactivateWatchGeolocation()
      }
    }
  },

  created () {
    if (process.client) {
      this.connectCable()
    }
  },

  mounted () {
    this.$vuetify.theme.dark = this.$store.getters['theme/getTheme'] === 'dark'
    this.updateWorkbox()
    if (this.$store.state.geolocation.status === 'activate') {
      this.activateWatchGeolocation()
    }
    if (this.$auth.loggedIn) {
      this.$auth.fetchUser()
      this.connectChannel()
      this.getUnreadNotification()
      this.getLikes()
    }
  },

  beforeDestroy () {
    this.disconnectChannel()
  },

  methods: {
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

    connectChannel () {
      this.$cable.subscribe({ channel: 'NotificationChannel' })
      this.$cable.subscribe({ channel: 'FetchUserChannel' })
    },

    getUnreadNotification () {
      new NotificationApi(this.$axios, this.$auth)
        .unreadCount()
        .then((resp) => {
          this.$store.dispatch('notification/changeNotificationStatus', resp.data > 0)
        })
    },

    getLikes () {
      new CurrentUserApi(this.$axios, this.$auth)
        .likes()
        .then((resp) => {
          this.$store.dispatch('likes/storeLikes', resp.data)
        })
    },

    disconnectChannel () {
      this.$cable.unsubscribe('NotificationChannel')
      this.$cable.unsubscribe('FetchUserChannel')
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
          (err) => {
            if (err.code !== 3) {
              // Disable localization if the error is not a timeout
              this.$store.dispatch('geolocation/deactivateLocation')
            }
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
    }
  }
}
</script>

<style lang="scss">
.theme--dark {
  .oblyk-navigation-drawer {
    .v-navigation-drawer__content {
      background-color: #121212;
    }
  }
}
</style>
