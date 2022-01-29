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

        <v-btn
          class="mr-4"
          aria-label="select light or dark theme"
          icon
          @click="dark = !dark"
        >
          <v-icon v-if="dark">
            mdi-weather-sunny
          </v-icon>
          <v-icon v-if="!dark">
            mdi-weather-night
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- If user is connected -->
    <client-only>
      <v-list
        v-if="isLoggedIn"
        nav
        dense
      >
        <v-subheader class="mt-0">
          {{ $t('components.layout.appDrawer.subHeaders.me') }}
        </v-subheader>
        <app-drawer-item
          url="/"
          icon="mdi-arrow-decision-outline"
          icon-color="orange"
          :title="$t('components.layout.appDrawer.user.feed')"
        />
        <app-drawer-item
          :url="`/me/${loggedInUser.slugName}/messenger`"
          icon="mdi-forum"
          icon-color="teal"
          :title="$t('components.layout.appDrawer.user.messenger')"
        />
        <app-drawer-item
          :url="`/me/${loggedInUser.slugName}/ascents/send-list`"
          icon="mdi-check-all"
          icon-color="blue"
          :title="$t('components.layout.appDrawer.user.ascents')"
        />
        <app-drawer-item
          :url="`/me/${loggedInUser.slugName}/community/followers`"
          icon="mdi-account-star-outline"
          icon-color="green"
          :title="$t('components.layout.appDrawer.user.subscribers')"
        />
        <app-drawer-item
          :url="`/me/${loggedInUser.slugName}/favorites/crags`"
          icon="mdi-star"
          icon-color="amber"
          :title="$t('components.layout.appDrawer.user.favorites')"
        />
        <app-drawer-item
          :url="`/me/${loggedInUser.slugName}/guide-books`"
          icon="mdi-bookshelf"
          icon-color="deep-purple"
          :title="$t('components.layout.appDrawer.user.guideBooks')"
        />
      </v-list>

      <!-- Administered gym list -->
      <my-gyms />

      <!-- Organizations -->
      <my-organizations />

      <!-- If no user connected -->
      <v-list
        v-if="!isLoggedIn"
        nav
        dense
      >
        <v-subheader>
          {{ $t('components.layout.appDrawer.subHeaders.account') }}
        </v-subheader>
        <app-drawer-item
          url="/sign-in"
          icon="mdi-login"
          :title="$t('components.layout.appDrawer.login')"
        />
        <app-drawer-item
          url="/sign-up"
          icon="mdi-account-plus"
          :title="$t('components.layout.appDrawer.signUp')"
        />
      </v-list>
    </client-only>

    <v-subheader>
      {{ $t('components.layout.appDrawer.subHeaders.mapsAndTools') }}
    </v-subheader>

    <v-list
      nav
      dense
    >
      <v-list-group
        prepend-icon="mdi-map"
        no-action
      >
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('components.layout.appDrawer.maps') }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <app-drawer-item
          url="/maps/crags"
          icon="mdi-terrain"
          :title="$t('components.layout.appDrawer.mapCrags')"
        />
        <app-drawer-item
          url="/maps/gyms"
          icon="mdi-office-building-marker-outline"
          :title="$t('components.layout.appDrawer.mapGyms')"
        />
        <app-drawer-item
          url="/maps/climbers"
          icon="mdi-account-group"
          :title="$t('components.layout.appDrawer.mapClimber')"
        />
        <client-only>
          <v-divider v-if="isLoggedIn" inset />
          <app-drawer-item
            v-if="isLoggedIn"
            url="/maps/my-map"
            icon="mdi-map-check"
            :title="$t('components.layout.appDrawer.myMap')"
          />
        </client-only>
      </v-list-group>

      <client-only>
        <v-list-group
          v-if="isLoggedIn"
          prepend-icon="mdi-book-plus-multiple"
          no-action
        >
          <template #activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('components.layout.appDrawer.contribute') }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <!-- New crag -->
          <app-drawer-item
            url="/a/crags/new"
            icon="mdi-terrain"
            :title="$t('components.crag.newCrag')"
          />

          <!-- New gym -->
          <app-drawer-item
            url="/a/gyms/new"
            icon="mdi-office-building"
            :title="$t('components.gym.newGym')"
          />
        </v-list-group>
      </client-only>

      <v-list-group
        prepend-icon="mdi-tools"
        no-action
      >
        <template #activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('components.layout.appDrawer.tools') }}
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <app-drawer-item
          url="/guide-book-papers/find"
          icon="mdi-map-marker-radius-outline"
          :title="$t('components.guideBookPaper.findGuideBook')"
        />

        <app-drawer-item
          url="/glossary"
          icon="mdi-book-open-variant"
          :title="$t('components.word.title')"
        />

        <app-drawer-item
          url="/grades"
          icon="mdi-numeric-7-box-multiple"
          :title="$t('common.pages.grade.title')"
        />

        <!-- Admin tool -->
        <client-only>
          <v-subheader
            v-if="isLoggedIn && isSuperAdmin"
            inset
          >
            {{ $t('components.layout.appDrawer.subHeaders.admin') }}
          </v-subheader>
          <app-drawer-item
            v-if="isLoggedIn && isSuperAdmin"
            url="/newsletters"
            icon="mdi-email-multiple"
            :title="$t('components.newsletter.title')"
          />
        </client-only>
      </v-list-group>

      <v-subheader>
        {{ $t('components.layout.appDrawer.subHeaders.project') }}
      </v-subheader>

      <client-only>
        <app-drawer-item
          v-if="isLoggedIn"
          url="/oblyk"
          icon="mdi-terrain"
          :title="$t('components.layout.appDrawer.oblyk')"
        />
      </client-only>

      <app-drawer-item
        url="/articles"
        icon="mdi-newspaper-variant-multiple"
        :title="$t('components.layout.appDrawer.news')"
      />

      <app-drawer-item
        url="/about"
        icon="mdi-information-outline"
        :title="$t('components.layout.appDrawer.about')"
      />

      <app-drawer-item
        url="/helps"
        icon="mdi-school"
        :title="$t('components.layout.appDrawer.helps')"
      />

      <app-drawer-item
        url="/api-and-developers"
        icon="mdi-code-braces"
        :title="$t('common.pages.apiAndDevelopers.title')"
      />

      <app-drawer-item
        url="/support-us"
        icon="mdi-cards-heart"
        icon-color="red"
        :title="$t('components.layout.appDrawer.donation')"
      />
    </v-list>
  </div>
</template>

<script>
import AppDrawerItem from '@/components/layouts/partial/AppDrawerItem'
import { SessionConcern } from '@/concerns/SessionConcern'
import MyGyms from '@/components/layouts/partial/MyGyms'
import MyOrganizations from '@/components/layouts/partial/MyOrganizations'

export default {
  name: 'AppDrawer',
  components: { MyOrganizations, MyGyms, AppDrawerItem },
  mixins: [SessionConcern],

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