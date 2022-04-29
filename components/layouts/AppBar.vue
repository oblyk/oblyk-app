<template>
  <div>
    <v-app-bar
      app
      class="custom-app-bar"
      elevate-on-scroll
    >
      <v-app-bar-nav-icon
        aria-label="open app drawer"
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title class="oblyk-app-title">
        <app-bar-title />
      </v-toolbar-title>

      <v-spacer />

      <!-- Search dialog -->
      <global-search-dialog />

      <!-- Notification -->
      <client-only>
        <notification-app-bar v-if="$auth.loggedIn" />
      </client-only>

      <!-- User Avatar -->
      <v-menu
        :position-y="0"
        bottom
        left
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            aria-label="open user menu"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              {{ mdiAccountCircle }}
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <lazy-hydrate on-interaction>
            <app-bar-profil />
          </lazy-hydrate>
          <login-logout-btn />
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      width="300"
    >
      <lazy-hydrate never :trigger-hydration="drawer">
        <app-drawer />
      </lazy-hydrate>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mdiAccountCircle } from '@mdi/js'
import LazyHydrate from 'vue-lazy-hydration'
import LoginLogoutBtn from '@/components/layouts/partial/LoginLogoutBtn'
import AppBarTitle from '@/components/layouts/partial/AppBarTitle'
import GlobalSearchDialog from '@/components/searches/GlobalSearchDialog'
const AppBarProfil = () => import('~/components/layouts/partial/AppBarProfile')
const AppDrawer = () => import('@/components/layouts/AppDrawer')
const NotificationAppBar = () => import('@/components/layouts/partial/NotificationAppBar')

export default {
  name: 'AppBar',
  components: {
    AppBarProfil,
    NotificationAppBar,
    GlobalSearchDialog,
    AppBarTitle,
    LoginLogoutBtn,
    AppDrawer,
    LazyHydrate
  },

  data () {
    return {
      mdiAccountCircle,
      drawer: false
    }
  }
}
</script>

<style lang="scss">
.v-application {
  &.theme--dark {
    .custom-app-bar.v-app-bar--is-scrolled {
      background-color: rgba(18, 18, 18, 0.8) !important;
    }
  }
  &.theme--light {
    .custom-app-bar.v-app-bar--is-scrolled {
      background-color: rgba(255, 255, 255, 0.7) !important;
    }
    &.no-padding-top-in-app {
      .custom-app-bar:not(.v-app-bar--is-scrolled) {
        color: white;
        .v-btn__content {
          .v-icon {
            color: white;
          }
        }
      }
    }
  }
}

.custom-app-bar {
  background-color: rgba(0,0,0,0) !important;
}

.custom-app-bar.v-app-bar--is-scrolled {
  background-color: rgba(18, 18, 18, 0.7) !important;
}

.custom-app-bar {
  box-shadow: none !important;
}

.oblyk-app-title {
  font-size: 1.2rem !important;
}
</style>
