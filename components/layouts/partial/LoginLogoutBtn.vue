<template>
  <div>
    <v-list-item v-if="isLoggedIn" link @click="logout()">
      <v-list-item-icon>
        <v-icon>mdi-logout</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t("components.layout.appBar.logOut") }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item v-if="!isLoggedIn" link to="/sign-in">
      <v-list-item-icon>
        <v-icon>mdi-login</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t("components.layout.appBar.login") }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item v-if="!isLoggedIn" link to="/sign-up">
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

export default {
  name: 'LoginLogoutBtn',
  mixins: [SessionConcern]
}
</script>
