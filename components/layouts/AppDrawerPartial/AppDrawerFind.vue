<template>
  <v-list
    nav
    dense
  >
    <!-- Crags Map -->
    <v-list-item to="/maps/crags">
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
    <v-list-item to="/maps/gyms">
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
    <v-list-group
      :prepend-icon="mdiAccountGroupOutline"
      no-action
    >
      <template #activator>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('components.layout.appDrawer.find.climbers.title') }}
          </v-list-item-title>
        </v-list-item-content>
      </template>

      <!-- Climbers Map -->
      <v-list-item to="/maps/climbers">
        <v-list-item-icon>
          <v-icon>
            {{ mdiMap }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.find.climbers.map') }}
        </v-list-item-title>
      </v-list-item>

      <!-- How the partner search works -->
      <v-list-item to="/about/partner-search">
        <v-list-item-icon>
          <v-icon>
            {{ mdiHelpCircleOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.find.climbers.how') }}
        </v-list-item-title>
      </v-list-item>
    </v-list-group>

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
  mdiHelpCircleOutline,
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
      mdiHelpCircleOutline,
      mdiMapMarkerRadiusOutline
    }
  }
}
</script>
