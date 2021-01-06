<template>
  <div>
    <v-list-item link @click="logout()" v-if="isLoggedIn">
      <v-list-item-icon>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t("components.layout.appBar.logOut") }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item link to="/sign-in" v-if="!isLoggedIn">
      <v-list-item-icon>
        <v-icon>mdi-login</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t("components.layout.appBar.login") }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item link to="/sign-up" v-if="!isLoggedIn">
      <v-list-item-icon>
        <v-icon>mdi-account-plus</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t("actions.signUp") }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import store from '@/store'

export default {
  name: 'LoginLogoutBtn',
  mixins: [SessionConcern],

  methods: {
    logout: function () {
      store.dispatch('auth/logout')
      this.$router.push('/')
    }
  }
}
</script>
