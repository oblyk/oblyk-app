<template>
  <div>
    <v-list class="avatar-drawer">

      <app-drawer-avatar />

      <v-list-item class="px-2" v-if="!isLoggedIn">
        <v-list-item-avatar>
          <img :src="require('@/assets/svgs/logo-black.svg')" alt="" v-if="!dark">
          <img :src="require('@/assets/svgs/logo-white.svg')" alt="" v-if="dark">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            Oblyk
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!-- If user is connected -->
    <v-list
      v-if="isLoggedIn"
      nav
      dense
    >
      <app-drawer-item
        url="/"
        icon="mdi-view-dashboard-outline"
        :title="$t('components.layout.appDrawer.dashboard')"
      />
    </v-list>

    <my-gyms />

    <!-- If no user connected -->
    <v-list
      v-if="!isLoggedIn"
      nav
      dense
    >
      <app-drawer-item
        url="/"
        icon="mdi-view-dashboard-outline"
        :title="$t('components.layout.appDrawer.home')"
      />
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

    <v-divider></v-divider>

    <v-list
      nav
      dense
    >
      <v-list-group
        prepend-icon="mdi-map"
        no-action
      >
        <template v-slot:activator>
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
      </v-list-group>

      <v-list-group
        prepend-icon="mdi-book-plus-multiple"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              Contribuer
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <app-drawer-item
          url="/gyms/new"
          icon="mdi-office-building"
          :title="'Ajouter une salle'"
        />
      </v-list-group>

      <v-list-group
        prepend-icon="mdi-tools"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('components.layout.appDrawer.tools') }}
            </v-list-item-title>
          </v-list-item-content>
        </template>
        <app-drawer-item
          url="/glossary"
          icon="mdi-book-open-variant"
          :title="$t('components.word.title')"
        />
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import AppDrawerItem from '@/components/layouts/partial/AppDrawerItem'
import { SessionConcern } from '@/concerns/SessionConcern'
import MyGyms from '@/components/layouts/partial/MyGyms'
import AppDrawerAvatar from '@/components/layouts/partial/AppDrawerAvatar'

export default {
  name: 'AppDrawer',
  mixins: [SessionConcern],
  components: { AppDrawerAvatar, MyGyms, AppDrawerItem },

  computed: {
    dark: function () {
      return this.$vuetify.theme.dark
    }
  }
}
</script>
<style lang="scss">
.avatar-drawer {
  padding-top: 3px !important;
  padding-bottom: 4px !important;
}
</style>
