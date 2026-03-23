<template>
  <div v-if="$auth.loggedIn">
    <v-list-item>
      <v-list-item-title class="font-weight-bold">
        {{ $auth.user.first_name }}
      </v-list-item-title>
    </v-list-item>
    <v-divider />

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
    <v-list-item to="/home/settings">
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
    <v-list-item :to="`/climbers/${$auth.user.slug_name}`">
      <v-list-item-icon>
        <v-icon>
          {{ mdiEarth }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.user.seeMyPublicProfile') }}
      </v-list-item-title>
    </v-list-item>
    <v-divider />
  </div>
</template>

<script>
import { mdiForum, mdiAccountCircle, mdiPanorama, mdiCog, mdiEarth } from '@mdi/js'

export default {
  name: 'AppBarProfil',

  data () {
    return {
      mdiForum,
      mdiAccountCircle,
      mdiPanorama,
      mdiCog,
      mdiEarth
    }
  }
}
</script>
