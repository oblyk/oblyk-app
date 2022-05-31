<template>
  <v-menu
    :position-y="0"
    bottom
    left
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="enrich-oblyk-btn"
        icon
        large
        right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>
          {{ mdiPlus }}
        </v-icon>
      </v-btn>
    </template>

    <v-list
      dense
      dark
    >
      <!-- Add crag -->
      <v-list-item to="/a/crags/new">
        <v-list-item-icon>
          <v-icon>
            {{ mdiTerrain }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.addCrag') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Add gym -->
      <v-list-item to="/a/gyms/new">
        <v-list-item-icon>
          <v-icon>
            {{ mdiOfficeBuilding }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.addGym') }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mdiPlus, mdiTerrain, mdiOfficeBuilding } from '@mdi/js'

export default {
  name: 'AppDrawerEnrich',

  data () {
    return {
      mdiPlus,
      mdiTerrain,
      mdiOfficeBuilding
    }
  }
}
</script>
