<template>
  <div v-if="$auth.loggedIn">
    <v-list-item>
      <v-list-item-title class="font-weight-bold">
        {{ $auth.user.first_name }}
      </v-list-item-title>
    </v-list-item>
    <v-divider />

    <!-- Notification -->
    <v-list-item :to="`/notifications`">
      <v-list-item-icon>
        <v-badge
          :value="haveNewNotification"
          color="red"
          dot
          overlap
        >
          <v-icon>
            {{ mdiBell }}
          </v-icon>
        </v-badge>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appBar.user.notification') }}
      </v-list-item-title>
    </v-list-item>

    <!-- Messenger -->
    <v-list-item to="/home/messenger">
      <v-list-item-icon>
        <v-icon>
          {{ mdiForum }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appBar.user.messenger') }}
      </v-list-item-title>
    </v-list-item>

    <!-- Avatar -->
    <v-list-item to="/home/settings/avatar">
      <v-list-item-icon>
        <v-icon>
          {{ mdiAccountCircle }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appBar.user.avatar') }}
      </v-list-item-title>
    </v-list-item>

    <!-- Avatar -->
    <v-list-item to="/home/settings/banner">
      <v-list-item-icon>
        <v-icon>
          {{ mdiPanorama }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appBar.user.banner') }}
      </v-list-item-title>
    </v-list-item>

    <!-- Settings -->
    <v-list-item to="/home/settings/general">
      <v-list-item-icon>
        <v-icon>
          {{ mdiCog }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appBar.user.settings') }}
      </v-list-item-title>
    </v-list-item>
    <v-divider />
  </div>
</template>

<script>
import { mdiForum, mdiAccountCircle, mdiPanorama, mdiCog, mdiBell } from '@mdi/js'

export default {
  name: 'AppBarProfil',

  data () {
    return {
      mdiForum,
      mdiAccountCircle,
      mdiPanorama,
      mdiCog,
      mdiBell
    }
  },

  computed: {
    haveNewNotification () {
      return this.$store.state.notification.newNotification
    }
  }
}
</script>
