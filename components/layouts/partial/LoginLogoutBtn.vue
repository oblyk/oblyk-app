<template>
  <div>
    <v-list-item
      v-if="$auth.loggedIn"
      link
      @click="disconnected()"
    >
      <v-list-item-icon>
        <v-icon>{{ mdiLogout }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t("components.layout.appBar.logOut") }}
      </v-list-item-title>
    </v-list-item>

    <client-only>
      <v-list-item v-if="!$auth.loggedIn" link to="/sign-in">
        <v-list-item-icon>
          <v-icon>{{ mdiLogin }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t("components.layout.appBar.login") }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item v-if="!$auth.loggedIn" link to="/sign-up">
        <v-list-item-icon>
          <v-icon>{{ mdiAccountPlus }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t("actions.signUp") }}
        </v-list-item-title>
      </v-list-item>
    </client-only>
  </div>
</template>

<script>
import { mdiAccountPlus, mdiLogin, mdiLogout } from '@mdi/js'

export default {
  name: 'LoginLogoutBtn',

  data () {
    return {
      mdiAccountPlus,
      mdiLogin,
      mdiLogout
    }
  },

  methods: {
    async disconnected () {
      this.$cable.unsubscribe('NotificationChannel')
      this.$cable.unsubscribe('FetchUserChannel')
      await this.$auth.logout('local')
    }
  }
}
</script>
