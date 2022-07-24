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
    <v-list-item to="/find/climbers">
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
    <v-list-group
      :prepend-icon="mdiBookshelf"
      no-action
    >
      <template #activator>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('components.layout.appDrawer.find.guideBook.title') }}
          </v-list-item-title>
        </v-list-item-content>
      </template>

      <!-- Around a town -->
      <v-list-item to="/guide-book-papers/find">
        <v-list-item-icon>
          <v-icon>
            {{ mdiMapMarkerRadiusOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.find.guideBook.around') }}
        </v-list-item-title>
      </v-list-item>

      <v-list-item to="/library">
        <v-list-item-icon>
          <v-icon>
            {{ mdiBookshelf }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.find.guideBook.new') }}
        </v-list-item-title>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import {
  mdiTerrain,
  mdiOfficeBuildingMarkerOutline,
  mdiBookshelf,
  mdiAccountGroupOutline,
  mdiMap,
  mdiMapMarkerRadiusOutline
} from '@mdi/js'

export default {
  name: 'AppDrawerFind',

  data () {
    return {
      mdiTerrain,
      mdiOfficeBuildingMarkerOutline,
      mdiBookshelf,
      mdiAccountGroupOutline,
      mdiMap,
      mdiMapMarkerRadiusOutline
    }
  }
}
</script>
