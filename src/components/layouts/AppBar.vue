<template>
  <div>
    <v-app-bar
      app
      color="secondary"
      class="custom-app-bar"
      elevate-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="loved-by-king oblyk-app-title">
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        :to="{ name: 'Search' }"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        offset-y
        bottom
        left
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <local-selector />
          <dark-theme-selector />
          <login-logout-btn />
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      width="300"
    >
      <app-drawer />
    </v-navigation-drawer>
  </div>
</template>

<script>
import AppDrawer from '@/components/layouts/AppDrawer'
import LocalSelector from '@/components/layouts/partial/LocalSelector'
import DarkThemeSelector from '@/components/layouts/partial/DarkThemeSelector'
import LoginLogoutBtn from '@/components/layouts/partial/LoginLogoutBtn'

export default {
  name: 'AppBar',
  components: { LoginLogoutBtn, DarkThemeSelector, LocalSelector, AppDrawer },

  data () {
    return {
      drawer: true,
      title: 'Oblyk'
    }
  },

  watch: {
    '$route' () {
      this.title = this.$route.meta.title
    }
  },

  created () {
    this.title = this.$route.meta.title
  }
}
</script>

<style lang="scss">
.v-application {
  &.theme--dark {
    .secondary.custom-app-bar {
      border-bottom-color: #272727 !important;
    }
  }
  &.theme--light {
    .secondary.custom-app-bar {
      border-bottom-color: #e0e0e0 !important;
    }
  }
}

.custom-app-bar {
  box-shadow: none !important;
  border-bottom-style: solid !important;
  border-bottom-width: 1px !important;
}

.oblyk-app-title {
  font-size: 1.6rem !important;
}
</style>
