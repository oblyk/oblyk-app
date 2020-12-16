<template>
  <div>
    <v-list class="avatar-drawer">
      <v-list-item class="px-2" v-if="isLoggedIn">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ userName }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

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

    <v-list
      nav
      dense
    >
      <v-list-item
        v-for="item in isLoggedIn ? connectItems : unConnectItems"
        :key="item.title"
        link
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
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
            <v-list-item-title>Cartes</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          :to="{ name: 'CragMapPage' }"
          link
        >
          <v-list-item-icon>
            <v-icon>mdi-terrain</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Carte des falaises</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-office-building-marker-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Carte des salles</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Carte des grimpeurs</v-list-item-title>
        </v-list-item>
      </v-list-group>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-hammer-wrench</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Outils</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'AppDrawer',

  data () {
    return {
      unConnectItems: [
        {
          title: 'Accueil',
          icon: 'mdi-view-dashboard-outline',
          to: '/'
        },
        {
          title: 'Me connecter',
          icon: 'mdi-login',
          to: '/sign-in'
        }
      ],
      connectItems: [
        {
          title: 'Dashboard',
          icon: 'mdi-view-dashboard-outline',
          to: '/'
        }
      ]
    }
  },

  computed: {
    isLoggedIn: function () {
      return store.getters['auth/isLoggedIn']
    },

    userName: function () {
      return store.getters['auth/getName']
    },

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
