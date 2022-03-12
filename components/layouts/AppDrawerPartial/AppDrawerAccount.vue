<template>
  <v-list
    v-if="!$auth.loggedIn"
    nav
    dense
  >
    <v-subheader>
      {{ $t('components.layout.appDrawer.subHeaders.account') }}
    </v-subheader>

    <v-list-item
      to="/sign-in"
    >
      <v-list-item-icon>
        <v-icon>
          {{ mdiLogin }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.login') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item
      to="/sign-up"
    >
      <v-list-item-icon>
        <v-icon>
          {{ mdiAccountPlus }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.signUp') }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import { mdiLogin, mdiAccountPlus } from '@mdi/js'

export default {
  name: 'AppDrawerAccount',

  data () {
    return {
      mdiLogin,
      mdiAccountPlus
    }
  }
}
</script>
