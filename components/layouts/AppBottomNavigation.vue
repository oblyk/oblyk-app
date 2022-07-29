<template>
  <v-bottom-navigation
    app
    grow
    dark
    height="45"
    class="oblyk-bottom-navigation"
  >
    <v-btn
      value="menu"
      @click="inverseDrawer"
    >
      <v-icon color="white">
        {{ mdiMenu }}
      </v-icon>
    </v-btn>
    <v-btn
      v-if="$auth.loggedIn"
      value="add cross"
      to="/a/ascents/new"
    >
      <v-icon color="white">
        {{ mdiPlusBoxOutline }}
      </v-icon>
    </v-btn>
    <v-btn
      :to="$auth.loggedIn ? `/me/${$auth.user.slug_name}` : '/'"
      value="home"
    >
      <v-icon color="white">
        {{ mdiHome }}
      </v-icon>
    </v-btn>
    <global-search-dialog />
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
          <v-icon color="white">
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
  </v-bottom-navigation>
</template>

<script>
import { mdiMenu, mdiPlusBoxOutline, mdiHome, mdiAccountCircleOutline } from '@mdi/js'
import LazyHydrate from 'vue-lazy-hydration'
import GlobalSearchDialog from '~/components/searches/GlobalSearchDialog'
import AppBarProfil from '~/components/layouts/partial/AppBarProfile'
import LoginLogoutBtn from '~/components/layouts/partial/LoginLogoutBtn'

export default {
  name: 'AppBottomNavigation',
  components: {
    LoginLogoutBtn,
    AppBarProfil,
    GlobalSearchDialog,
    LazyHydrate
  },
  props: {
    inverseDrawer: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      mdiMenu,
      mdiPlusBoxOutline,
      mdiHome,
      mdiAccountCircleOutline
    }
  }
}
</script>

<style lang="scss">
.theme--dark.oblyk-bottom-navigation {
  background-color: rgb(0,0,0);
}
.oblyk-bottom-navigation {
  .v-btn {
    min-width: 65px !important;
  }
}
</style>
