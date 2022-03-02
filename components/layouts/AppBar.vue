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
        <notification-app-bar v-if="isLoggedIn" />
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
              mdi-account-circle
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <client-only>
            <div v-if="isLoggedIn && user">
              <v-list-item>
                <v-list-item-avatar v-if="!loadingCurrentUser">
                  <img :src="user.avatarUrl" :alt="`avatar ${user.name}`">
                </v-list-item-avatar>
                <v-list-item-title class="font-weight-bold">
                  {{ loggedInUser.name }}
                </v-list-item-title>
              </v-list-item>
              <v-divider />
              <app-drawer-item :title="$t('components.layout.appBar.user.messenger')" icon="mdi-forum" :url="`${user.currentUserPath}/messenger`" />
              <app-drawer-item :title="$t('components.layout.appBar.user.avatar')" icon="mdi-account-circle" :url="`${user.currentUserPath}/settings/avatar`" />
              <app-drawer-item :title="$t('components.layout.appBar.user.banner')" icon="mdi-panorama" :url="`${user.currentUserPath}/settings/banner`" />
              <app-drawer-item :title="$t('components.layout.appBar.user.settings')" icon="mdi-cog" :url="`${user.currentUserPath}/settings/general`" />
              <v-divider />
            </div>
          </client-only>
          <login-logout-btn />
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      width="300"
    >
      <app-drawer />
    </v-navigation-drawer>
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import { CurrentUserConcern } from '@/concerns/CurrentUserConcern'
import AppDrawer from '@/components/layouts/AppDrawer'
import LoginLogoutBtn from '@/components/layouts/partial/LoginLogoutBtn'
import AppDrawerItem from '@/components/layouts/partial/AppDrawerItem'
import AppBarTitle from '@/components/layouts/partial/AppBarTitle'
import GlobalSearchDialog from '@/components/searches/GlobalSearchDialog'
const NotificationAppBar = () => import('@/components/layouts/partial/NotificationAppBar')

export default {
  name: 'AppBar',
  components: {
    NotificationAppBar,
    GlobalSearchDialog,
    AppBarTitle,
    AppDrawerItem,
    LoginLogoutBtn,
    AppDrawer
  },
  mixins: [SessionConcern, CurrentUserConcern],

  data () {
    return {
      drawer: false,
      user: null
    }
  },

  watch: {
    isLoggedIn () {
      if (this.isLoggedIn) {
        this
          .getLoggedInUser()
          .then((user) => {
            this.user = user
          })
      }
    }
  },

  mounted () {
    if (this.isLoggedIn) {
      this
        .getLoggedInUser()
        .then((user) => {
          this.user = user
        })
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
