<template>
  <div class="oblyk-app-drawer">
    <v-list color="pb-O">
      <v-list-item class="oblyk-title" to="/">
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

    <!-- If user is connected -->
    <v-list
      v-if="isLoggedIn"
      nav
      dense
    >
      <v-subheader class="mt-0">
        {{ $t('components.layout.appDrawer.subHeaders.me') }}
      </v-subheader>
      <app-drawer-item
        icon="mdi-check-all"
        icon-color="blue"
        :title="$t('components.layout.appDrawer.user.ascents')"
      />
      <app-drawer-item
        icon="mdi-account-star-outline"
        icon-color="green"
        :title="$t('components.layout.appDrawer.user.subscribers')"
      />
      <app-drawer-item
        icon="mdi-bookshelf"
        icon-color="deep-purple"
        :title="$t('components.layout.appDrawer.user.guideBooks')"
      />
      <app-drawer-item
        icon="mdi-star"
        icon-color="amber"
        :title="$t('components.layout.appDrawer.user.favorites')"
      />
    </v-list>

    <my-gyms />

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

      <v-subheader>
        {{ $t('components.layout.appDrawer.subHeaders.project') }}
      </v-subheader>

      <app-drawer-item
        icon="mdi-information-outline"
        :title="$t('components.layout.appDrawer.about')"
      />

      <app-drawer-item
        icon="mdi-school"
        :title="$t('components.layout.appDrawer.helps')"
      />

      <app-drawer-item
        icon="mdi-cards-heart"
        icon-color="red"
        :title="$t('components.layout.appDrawer.donation')"
      />

      <app-drawer-item
        url="/terms-of-use"
        icon="mdi-scale-balance"
        :title="$t('termsOfUser.title')"
      />
    </v-list>
  </div>
</template>

<script>
import AppDrawerItem from '@/components/layouts/partial/AppDrawerItem'
import { SessionConcern } from '@/concerns/SessionConcern'
import MyGyms from '@/components/layouts/partial/MyGyms'

export default {
  name: 'AppDrawer',
  mixins: [SessionConcern],
  components: { MyGyms, AppDrawerItem },

  computed: {
    dark: function () {
      return this.$vuetify.theme.dark
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
