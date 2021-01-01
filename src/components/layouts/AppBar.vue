<template>
  <div>
    <v-app-bar
      app
      :dense="isMobile"
      color="secondary"
      class="custom-app-bar"
      elevate-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="oblyk-app-title">
        <v-avatar
          :size="isMobile ? 32 : 48"
          v-if="avatar"
          :class="isMobile ? 'mr-1' : 'mr-3'"
        >
          <v-img
            :src="avatarSource"
            :alt="`avatar ${title}`"
          />
        </v-avatar>
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon
        :to="{ name: 'SearchView' }"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
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
      title: 'Oblyk',
      avatar: false,
      avatarSource: '',
      isMobile: false
    }
  },

  mounted () {
    this.onResize()

    window.addEventListener('resize', this.onResize, { passive: true })

    this.$root.$on('setAppTitle', (data) => {
      this.setAppTitle(data)
    })
  },

  methods: {
    onResize: function () {
      this.isMobile = window.innerWidth < 600
    },

    setAppTitle: function (data) {
      this.title = (data || {}).title
      this.avatarSource = (data || {}).avatar
      this.avatar = (data.avatar)
    }
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
  font-size: 1.2rem !important;
}
</style>
