<template>
  <v-list-group
    :prepend-icon="mdiMap"
    no-action
  >
    <template #activator>
      <v-list-item-content>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.maps') }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
    <v-list-item to="/maps/crags">
      <v-list-item-icon>
        <v-icon>
          {{ mdiTerrain }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.mapCrags') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item to="/maps/gyms">
      <v-list-item-icon>
        <v-icon>
          {{ mdiOfficeBuildingMarkerOutline }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.mapGyms') }}
      </v-list-item-title>
    </v-list-item>

    <v-list-item to="/maps/climbers">
      <v-list-item-icon>
        <v-icon>
          {{ mdiAccountGroup }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.layout.appDrawer.mapClimber') }}
      </v-list-item-title>
    </v-list-item>
    <client-only>
      <v-divider v-if="$auth.loggedIn" inset />

      <v-list-item
        v-if="$auth.loggedIn"
        to="/maps/my-map"
      >
        <v-list-item-icon>
          <v-icon>
            {{ mdiMapCheck }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.myMap') }}
        </v-list-item-title>
      </v-list-item>
    </client-only>
  </v-list-group>
</template>

<script>
import { mdiTerrain, mdiOfficeBuildingMarkerOutline, mdiAccountGroup, mdiMapCheck, mdiMap } from '@mdi/js'

export default {
  name: 'AppDrawerMap',

  data () {
    return {
      mdiMap,
      mdiTerrain,
      mdiOfficeBuildingMarkerOutline,
      mdiAccountGroup,
      mdiMapCheck
    }
  }
}
</script>
