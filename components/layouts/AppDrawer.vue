<template>
  <div class="oblyk-app-drawer">
    <v-row>
      <v-col sm="4">
        <v-btn
          to="/"
          aria-label="go to home page"
          icon
          x-large
          class="ml-2"
        >
          <img v-if="!dark" height="28" width="38" src="/svg/logo-black.svg" alt="">
          <img v-if="dark" height="28" width="38" src="/svg/logo-white.svg" alt="">
        </v-btn>
      </v-col>
      <v-col sm="8" class="v-card__actions">
        <v-spacer />
        <v-menu
          bottom
          left
        >
          <template #activator="{ on, attrs }">
            <v-btn
              class="mr-0"
              icon
              aria-label="select language"
              v-bind="attrs"
              v-on="on"
            >
              {{ lang }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="language in languages"
              :key="language.value"
              @click="changeLocale(language.value)"
            >
              <v-list-item-content>
                {{ language.text }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <client-only>
          <localization-btn />
        </client-only>

        <v-btn
          class="mr-4"
          aria-label="select light or dark theme"
          icon
          @click="dark = !dark"
        >
          <v-icon v-if="dark">
            {{ mdiWeatherSunny }}
          </v-icon>
          <v-icon v-if="!dark">
            {{ mdiWeatherNight }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- If user is connected -->
    <client-only>
      <app-drawer-user />

      <!-- Administered gym list -->
      <my-gyms v-if="isLoggedIn" />

      <!-- Organizations -->
      <my-organizations v-if="isLoggedIn" />

      <!-- If no user connected -->
      <app-drawer-account />
    </client-only>

    <v-subheader>
      {{ $t('components.layout.appDrawer.subHeaders.mapsAndTools') }}
    </v-subheader>

    <v-list
      nav
      dense
    >
      <app-drawer-map />
      <app-drawer-guide-book />

      <client-only>
        <app-drawer-contribute />
      </client-only>

      <app-drawer-tool />

      <v-subheader>
        {{ $t('components.layout.appDrawer.subHeaders.project') }}
      </v-subheader>

      <client-only>
        <v-list-item
          v-if="$auth.loggedIn"
          to="/oblyk"
        >
          <v-list-item-icon>
            <v-icon>
              {{ mdiTerrain }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t('components.layout.appDrawer.oblyk') }}
          </v-list-item-title>
        </v-list-item>
      </client-only>

      <v-list-item to="/articles">
        <v-list-item-icon>
          <v-icon>
            {{ mdiNewspaperVariantMultiple }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.news') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/about">
        <v-list-item-icon>
          <v-icon>
            {{ mdiInformationOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.about') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/helps">
        <v-list-item-icon>
          <v-icon>
            {{ mdiSchool }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.helps') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/api-and-developers">
        <v-list-item-icon>
          <v-icon>
            {{ mdiCodeBrackets }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('common.pages.apiAndDevelopers.title') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/support-us">
        <v-list-item-icon>
          <v-icon color="red">
            {{ mdiCardsHeart }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.donation') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import {
  mdiWeatherSunny,
  mdiWeatherNight,
  mdiTerrain,
  mdiNewspaperVariantMultiple,
  mdiInformationOutline,
  mdiSchool,
  mdiCodeBrackets,
  mdiCardsHeart
} from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import AppDrawerMap from '~/components/layouts/AppDrawerPartial/AppDrawerMap'
import AppDrawerUser from '~/components/layouts/AppDrawerPartial/AppDrawerUser'
import AppDrawerAccount from '~/components/layouts/AppDrawerPartial/AppDrawerAccount'
import AppDrawerGuideBook from '~/components/layouts/AppDrawerPartial/AppDrawerGuideBook'
import AppDrawerContribute from '~/components/layouts/AppDrawerPartial/AppDrawerContribute'
import AppDrawerTool from '~/components/layouts/AppDrawerPartial/AppDrawerTool'
const LocalizationBtn = () => import('~/components/layouts/partial/LocalizationBtn')
const MyGyms = () => import('@/components/layouts/partial/MyGyms')
const MyOrganizations = () => import('@/components/layouts/partial/MyOrganizations')

export default {
  name: 'AppDrawer',
  components: {
    LocalizationBtn,
    AppDrawerTool,
    AppDrawerContribute,
    AppDrawerGuideBook,
    AppDrawerAccount,
    AppDrawerUser,
    AppDrawerMap,
    MyOrganizations,
    MyGyms
  },
  mixins: [SessionConcern],

  data () {
    return {
      mdiWeatherSunny,
      mdiWeatherNight,
      mdiTerrain,
      mdiNewspaperVariantMultiple,
      mdiInformationOutline,
      mdiSchool,
      mdiCodeBrackets,
      mdiCardsHeart,
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
      ]
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
.oblyk-app-drawer {
  .v-subheader {
    height: 30px;
    margin-top: 1em;
  }
}

.theme--light {
  .oblyk-app-drawer {
    .v-list-item__title {
      color: black;
      caret-color: black;
    }
    .v-list-group__header {
      color: #777777;
    }
  }
}

.oblyk-title.v-list-item--active {
  &:before {
    background: none;
  }
}

.theme--dark {
  .oblyk-app-drawer {
    .v-list-item__title, .v-icon, .v-list-group__header {
      color: white;
      caret-color: white;
    }
  }
}
</style>
