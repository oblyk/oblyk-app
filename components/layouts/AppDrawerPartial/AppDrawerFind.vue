<template>
  <v-list
    nav
    dense
  >
    <!-- Crags Map -->
    <v-list-item to="/find/crags">
      <v-list-item-icon>
        <v-icon>
          {{ mdiTerrain }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.find.crag') }}
      </v-list-item-title>
    </v-list-item>

    <!-- Gyms Map -->
    <v-list-item to="/find/gyms">
      <v-list-item-icon>
        <v-icon>
          {{ mdiOfficeBuildingMarkerOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.find.gym') }}
      </v-list-item-title>
    </v-list-item>

    <!-- Partner search -->
    <v-list-item
      v-if="!$auth.loggedIn || !$auth.user.minor"
      to="/find/climbers"
    >
      <v-list-item-icon>
        <v-icon>
          {{ mdiAccountGroupOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.find.climbers.title') }}
      </v-list-item-title>
    </v-list-item>

    <!-- Find a guide book -->
    <v-list-item to="/find/guide-books">
      <v-list-item-icon>
        <v-icon>
          {{ mdiBookshelf }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.find.guideBook.title') }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import {
  mdiTerrain,
  mdiOfficeBuildingMarkerOutline,
  mdiBookshelf,
  mdiAccountGroupOutline,
  mdiMap
} from '@mdi/js'

export default {
  name: 'AppDrawerFind',

  data () {
    return {
      mdiTerrain,
      mdiOfficeBuildingMarkerOutline,
      mdiBookshelf,
      mdiAccountGroupOutline,
      mdiMap
    }
  }
}
</script>
