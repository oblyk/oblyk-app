<template>
  <div v-if="$auth.loggedIn">
    <v-list-item>
      <v-list-item-title class="font-weight-bold">
        {{ $auth.user.first_name }}
      </v-list-item-title>
    </v-list-item>
    <v-divider />

    <!-- Messenger -->
    <v-list-item :to="`/me/${$auth.user.slug_name}/messenger`">
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
    <v-list-item :to="`/me/${$auth.user.slug_name}/settings/avatar`">
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
    <v-list-item :to="`/me/${$auth.user.slug_name}/settings/banner`">
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
    <v-list-item :to="`/me/${$auth.user.slug_name}/settings/general`">
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
import { mdiForum, mdiAccountCircle, mdiPanorama, mdiCog } from '@mdi/js'

export default {
  name: 'AppBarProfil',

  data () {
    return {
      mdiForum,
      mdiAccountCircle,
      mdiPanorama,
      mdiCog
    }
  }
}
</script>
