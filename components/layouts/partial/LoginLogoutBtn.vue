<template>
  <div>
    <v-list-item
      v-if="isLoggedIn"
      link
      @click="logout()"
    >
      <v-list-item-icon>
        <v-icon>{{ mdiLogout }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t("components.layout.appBar.logOut") }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item v-if="!isLoggedIn" link to="/sign-in">
      <v-list-item-icon>
        <v-icon>{{ mdiLogin }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t("components.layout.appBar.login") }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item v-if="!isLoggedIn" link to="/sign-up">
      <v-list-item-icon>
        <v-icon>{{ mdiAccountPlus }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t("actions.signUp") }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>
<script>
import { mdiAccountPlus, mdiLogin, mdiLogout } from '@mdi/js'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'LoginLogoutBtn',
  mixins: [SessionConcern],

  data () {
    return {
      mdiAccountPlus,
      mdiLogin,
      mdiLogout
    }
  }
}
</script>
