<template>
  <v-list-item class="oblyk-app-drawer-actions">
    <div class="d-flex justify-space-between oblyk-app-drawer-actions-area">
      <div>
        <v-menu
          :position-y="0"
          bottom
          left
        >
          <template #activator="{ on, attrs }">
            <v-btn
              icon
              aria-label="open user menu"
              :title="$t('components.layout.appDrawer.toolBar.account')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{ mdiAccountCircleOutline }}
              </v-icon>
            </v-btn>
          </template>

          <v-list dark>
            <lazy-hydrate on-interaction>
              <app-bar-profil />
            </lazy-hydrate>
            <login-logout-btn />
          </v-list>
        </v-menu>
      </div>

      <notification-app-bar v-if="$auth.loggedIn" />

      <div>
        <v-btn
          aria-label="select light or dark theme"
          icon
          :title="$t('components.layout.appDrawer.toolBar.theme')"
          @click="dark = !dark"
        >
          <v-icon v-if="dark">
            {{ mdiWeatherSunny }}
          </v-icon>
          <v-icon v-if="!dark">
            {{ mdiWeatherNight }}
          </v-icon>
        </v-btn>
      </div>

      <div>
        <localization-btn />
      </div>

      <div>
        <global-search-dialog />
      </div>
    </div>
  </v-list-item>
</template>

<script>
import {
  mdiWeatherSunny,
  mdiWeatherNight,
  mdiAccountCircleOutline
} from '@mdi/js'
import LazyHydrate from 'vue-lazy-hydration'
import NotificationAppBar from '~/components/layouts/partial/NotificationAppBar'
import AppBarProfil from '~/components/layouts/partial/AppBarProfile'
import LoginLogoutBtn from '~/components/layouts/partial/LoginLogoutBtn'
import GlobalSearchDialog from '~/components/searches/GlobalSearchDialog'
import LocalizationBtn from '~/components/layouts/partial/LocalizationBtn'

export default {
  name: 'AppToolBar',
  components: { LocalizationBtn, GlobalSearchDialog, LoginLogoutBtn, AppBarProfil, NotificationAppBar, LazyHydrate },
  data () {
    return {
      dark: false,
      mdiWeatherSunny,
      mdiWeatherNight,
      mdiAccountCircleOutline
    }
  },

  watch: {
    dark () {
      this.$vuetify.theme.dark = this.dark
      this.$store.dispatch('theme/changeTheme', this.dark ? 'dark' : 'light')
    }
  },

  mounted () {
    this.dark = this.$store.getters['theme/getTheme'] === 'dark'
  }
}
</script>

<style lang="scss">
.oblyk-app-drawer-actions {
  border-top-style: solid;
  border-bottom-style: solid;
  border-width: 1px;
  padding: 5px;
  text-align: center;
  border-color: rgb(50, 50, 50);
  .oblyk-app-drawer-actions-area {
    width: 100%;
    padding-right: 5px;
  }
}
</style>
