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

          <v-list>
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

      <v-menu
        bottom
        left
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            aria-label="select language"
            class="select-oblyk-language"
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar size="24">
              <v-img :src="`/images/flags/${lang}-circle.png`" cover alt="langage flag" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="language in languages"
            :key="language.value"
            @click="changeLocale(language.value)"
          >
            <v-list-item-avatar size="24">
              <v-img :src="`/images/flags/${language.value}-circle.png`" cover alt="langage flag" />
            </v-list-item-avatar>
            <v-list-item-content>
              {{ language.text }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
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
import LocalizationBtn from '~/components/layouts/partial/LocalizationBtn'

export default {
  name: 'AppToolBar',
  components: {
    LocalizationBtn,
    LoginLogoutBtn,
    AppBarProfil,
    NotificationAppBar,
    LazyHydrate
  },
  data () {
    return {
      dark: false,
      lang: null,
      languages: [
        {
          value: 'fr',
          text: 'Français'
        },
        {
          value: 'en',
          text: 'English'
        }
      ],

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
    this.lang = this.$i18n.locale
  },

  methods: {
    changeLocale (lang) {
      this.lang = lang
      this.$vuetify.lang.current = this.lang
      this.$i18n.setLocaleCookie(this.lang)
      this.$i18n.setLocale(this.lang)
    }
  }
}
</script>

<style lang="scss">
.oblyk-app-drawer-actions {
  text-align: center;
  .oblyk-app-drawer-actions-area {
    border-radius: 50px;
    padding: 0.5em;
    width: 100%;
  }
}
.theme--light {
  .oblyk-app-drawer-actions .oblyk-app-drawer-actions-area{
    background-color: rgb(240, 240, 245);
    .v-icon:not(.primary--text) {
      .v-icon__svg {
        fill: black;
      }
    }
  }
}
.theme--dark {
  .oblyk-app-drawer-actions .oblyk-app-drawer-actions-area {
    background-color: rgb(37, 37, 37);
    .v-icon:not(.primary--text) {
      .v-icon__svg {
        fill: white;
      }
    }
  }
}
</style>
