<template>
  <div class="oblyk-app-drawer">
    <v-list-item>
      <v-row class="oblyk-app-drawer-header">
        <v-col
          class="pl-1"
          @click="startAnimation()"
        >
          <nuxt-link
            to="/"
            class="discrete-link"
          >
            <animate-oblyk-logo :animate="loading" />
            <div class="d-inline-block oblyk-app-drawer-title">
              <p>
                Oblyk
              </p>
              <small>
                Climbing Community
              </small>
            </div>
          </nuxt-link>
        </v-col>
        <v-col class="oblyk-langage-col v-card__actions">
          <v-spacer />
          <v-menu
            bottom
            left
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                fab
                aria-label="select language"
                class="select-oblyk-language"
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
      <my-gyms v-if="$auth.loggedIn" />

      <!-- Organizations -->
      <my-organizations v-if="$auth.loggedIn" />

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
        <v-btn
          to="/new"
          class="enrich-oblyk-btn"
          icon
          large
          right
        >
          <v-icon>
            {{ mdiPlus }}
          </v-icon>
        </v-btn>
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
import { mdiMenuDown, mdiPlus } from '@mdi/js'
import AppDrawerUser from '~/components/layouts/AppDrawerPartial/AppDrawerUser'
import AppDrawerAccount from '~/components/layouts/AppDrawerPartial/AppDrawerAccount'
import AppToolBar from '~/components/layouts/AppDrawerPartial/AppToolBar'
import AppDrawerFind from '~/components/layouts/AppDrawerPartial/AppDrawerFind'
import AppDrawerAbout from '~/components/layouts/AppDrawerPartial/AppDrawerAbout'
import AnimateOblykLogo from '~/components/layouts/AnimateOblykLogo.vue'
const MyGyms = () => import('@/components/layouts/partial/MyGyms')
const MyOrganizations = () => import('@/components/layouts/partial/MyOrganizations')

export default {
  name: 'AppDrawer',
  components: {
    AnimateOblykLogo,
    AppDrawerAbout,
    AppDrawerFind,
    AppToolBar,
    AppDrawerAccount,
    AppDrawerUser,
    MyOrganizations,
    MyGyms
  },

  data () {
    return {
      lang: null,
      loading: false,
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

      mdiMenuDown,
      mdiPlus
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
    },

    startAnimation () {
      this.loading = true
      setTimeout(() => { this.loading = false }, 1500)
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
      font-size: 1.5em;
      p {
        line-height: 1em;
        margin-bottom: -13px;
      }
      small {
        font-size: 0.5em;
        opacity: 0.6;
      }
    }
    .oblyk-langage-col {
      max-width: 80px;
    }
  }
  .v-subheader {
    height: 30px;
    margin-top: 1em;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.8rem;
  }
  .v-list-item--active {
    &:not(.v-list-group__header) {
      .v-list-item__icon .v-icon__svg {
        fill: #31994e;
      }
    }
  }
  .enrich-oblyk-btn {
    background-color: #262626;
    color: white !important;
  }
}

.oblyk-title.v-list-item--active {
  &:before {
    background: none;
  }
}
.theme--light {
  .select-oblyk-language {
    color: black !important;
  }
  .oblyk-app-drawer {
    .v-list-item--active {
      &:not(.v-list-group__header) {
        background-color: rgb(240, 240, 245);
        &:before {
          background-color: rgb(240, 240, 245);
        }
        .v-list-item__title {
          color: #000000;
        }
      }
    }
  }
  .v-list-item__title {
    color: black;
  }
  .v-list-item__icon .v-icon__svg {
    color: black;
  }
}
.theme--dark {
  .oblyk-app-drawer {
    .v-list-item--active {
      &:not(.v-list-group__header) {
        background-color: rgb(37, 37, 37);
        &:before {
          background-color: rgb(37, 37, 37);
        }
        .v-list-item__icon .v-icon {
          color: white;
        }
        .v-list-item__title {
          color: white;
        }
      }
    }
    .v-list-item__title {
      color: white;
    }
    .v-list-item__icon .v-icon__svg {
      color: white;
    }
  }
}
</style>
