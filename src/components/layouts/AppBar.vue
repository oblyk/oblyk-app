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
          <v-list-item link>
            <v-list-item-action>
              <v-checkbox
                v-model="dark"
              ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content @click="dark = !dark">
              <v-list-item-title>Dark theme</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click="logout()" v-if="isLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Me déconnecter
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link :to="{ name: 'SignIn' }" v-if="!isLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                Me connecter
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
import store from '@/store'

export default {
  name: 'AppBar',
  components: { AppDrawer },

  data () {
    return {
      drawer: true,
      dark: false,
      title: 'Oblyk'
    }
  },

  watch: {
    dark: function () {
      this.$vuetify.theme.dark = this.dark
      localStorage.setItem('darkThem', this.dark)
    },

    '$route' () {
      this.title = this.$route.meta.title
    }
  },

  computed: {
    isLoggedIn: function () {
      return store.getters['auth/isLoggedIn']
    }
  },

  methods: {
    logout: function () {
      store.dispatch('auth/logout')
    }
  },

  created () {
    this.dark = (localStorage.getItem('darkThem') === 'true')
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
