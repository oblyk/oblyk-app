<template>
  <div class="oblyk-app-drawer">
    <v-list-item>
      <v-row class="oblyk-app-drawer-header">
        <v-col cols="7" class="pl-1">
          <v-btn
            to="/"
            aria-label="go to home page"
            icon
            x-large
            class="mr-1"
          >
            <img height="28" width="38" src="/svg/logo-green.svg" alt="">
          </v-btn>
          <span class="oblyk-app-drawer-title">
            Oblyk
          </span>
        </v-col>
        <v-col cols="5" class="v-card__actions">
          <v-spacer />
          <v-menu
            dark
            bottom
            left
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                fab
                aria-label="select language"
                v-bind="attrs"
                v-on="on"
              >
                {{ lang }}
                <v-icon>
                  {{ mdiMenuDown }}
                </v-icon>
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
        </v-col>
      </v-row>
    </v-list-item>

    <!-- If user is connected -->
    <client-only>
      <app-tool-bar />

      <app-drawer-user />

      <!-- Administered gym list -->
      <my-gyms v-if="isLoggedIn" class="d-none" />

      <!-- Organizations -->
      <my-organizations v-if="isLoggedIn" class="d-none" />

      <!-- If no user connected -->
      <app-drawer-account />
    </client-only>

    <!-- Find a crags, gyms, climbers, etc. -->
    <v-subheader>
      {{ $t('components.layout.appDrawer.subHeaders.find') }}
    </v-subheader>
    <app-drawer-find />

    <!-- Enrich -->
    <client-only>
      <v-subheader
        v-if="$auth.loggedIn"
        class="mb-6"
      >
        {{ $t('components.layout.appDrawer.subHeaders.enrich') }}
        <v-spacer />
        <app-drawer-enrich />
      </v-subheader>
    </client-only>

    <!-- About Oblyk -->
    <v-subheader>
      {{ $t('components.layout.appDrawer.subHeaders.about') }}
    </v-subheader>

    <app-drawer-about />
  </div>
</template>

<script>
import { mdiMenuDown } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'
import AppDrawerUser from '~/components/layouts/AppDrawerPartial/AppDrawerUser'
import AppDrawerAccount from '~/components/layouts/AppDrawerPartial/AppDrawerAccount'
import AppToolBar from '~/components/layouts/AppDrawerPartial/AppToolBar'
import AppDrawerFind from '~/components/layouts/AppDrawerPartial/AppDrawerFind'
import AppDrawerAbout from '~/components/layouts/AppDrawerPartial/AppDrawerAbout'
import AppDrawerEnrich from '~/components/layouts/AppDrawerPartial/AppDrawerEnrich'
const MyGyms = () => import('@/components/layouts/partial/MyGyms')
const MyOrganizations = () => import('@/components/layouts/partial/MyOrganizations')

export default {
  name: 'AppDrawer',
  components: {
    AppDrawerEnrich,
    AppDrawerAbout,
    AppDrawerFind,
    AppToolBar,
    AppDrawerAccount,
    AppDrawerUser,
    MyOrganizations,
    MyGyms
  },
  mixins: [SessionConcern],

  data () {
    return {
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

      mdiMenuDown
    }
  },

  mounted () {
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
  .oblyk-app-drawer-header {
    padding-top: 5px;
    padding-bottom: 6px;
    .oblyk-app-drawer-title {
      color: white;
      font-size: 1.5em;
      vertical-align: middle;
    }
  }
  .v-list-item__title {
    color: #ababab;
  }
  .v-list-item__icon .v-icon {
    color: #ababab;
  }
  .v-subheader {
    color: white;
    height: 30px;
    margin-top: 1em;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.8rem;
  }
  .v-list-item--active {
    &:not(.v-list-group__header) {
      background-color: black;
      .v-list-item__title {
        color: #31994e;
      }
      .v-list-item__icon .v-icon {
        color: #31994e;
      }
    }
    &.v-list-group__header {
      .v-list-item__icon .v-icon {
        color: white;
      }
    }
  }
  .enrich-oblyk-btn {
    background-color: #262626;
  }
}

.oblyk-title.v-list-item--active {
  &:before {
    background: none;
  }
}
</style>
