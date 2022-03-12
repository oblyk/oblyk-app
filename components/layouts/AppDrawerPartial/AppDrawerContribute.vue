<template>
  <v-list-group
    v-if="$auth.loggedIn"
    :prepend-icon="mdiBookPlusMultiple"
    no-action
  >
    <template #activator>
      <v-list-item-content>
        <v-list-item-title>
          {{ $t('components.layout.appDrawer.contribute') }}
        </v-list-item-title>
      </v-list-item-content>
    </template>

    <!-- New crag -->
    <v-list-item to="/a/crags/new">
      <v-list-item-icon>
        <v-icon>
          {{ mdiTerrain }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.crag.newCrag') }}
      </v-list-item-title>
    </v-list-item>

    <!-- New gym -->
    <v-list-item to="/a/gyms/new">
      <v-list-item-icon>
        <v-icon>
          {{ mdiOfficeBuilding }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ $t('components.gym.newGym') }}
      </v-list-item-title>
    </v-list-item>
  </v-list-group>
</template>

<script>
import { mdiBookPlusMultiple, mdiTerrain, mdiOfficeBuilding } from '@mdi/js'

export default {
  name: 'AppDrawerContribute',

  data () {
    return {
      mdiBookPlusMultiple,
      mdiTerrain,
      mdiOfficeBuilding
    }
  }
}
</script>
