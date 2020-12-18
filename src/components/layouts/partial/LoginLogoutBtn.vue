<template>
  <div>
    <v-list-item link @click="logout()" v-if="isLoggedIn">
      <v-list-item-icon>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          {{ $t("components.layout.appBar.logOut") }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item link :to="{ name: 'SignIn' }" v-if="!isLoggedIn">
      <v-list-item-icon>
        <v-icon>mdi-login</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          {{ $t("components.layout.appBar.login") }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script>
import store from '@/store'

export default {
  name: 'LoginLogoutBtn',

  computed: {
    isLoggedIn: function () {
      return store.getters['auth/isLoggedIn']
    }
  },

  methods: {
    logout: function () {
      store.dispatch('auth/logout')
    }
  }
}
</script>
