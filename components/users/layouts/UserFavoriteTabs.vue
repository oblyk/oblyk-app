<template>
  <v-sheet class="d-flex">
    <div class="px-2 pt-4">
      <v-btn
        exact-path
        icon
        :to="$nuxt.context.from || '/home'"
      >
        <v-icon>
          {{ mdiArrowLeft }}
        </v-icon>
      </v-btn>
    </div>
    <div class="pt-1 pl-1 overflow-x-hidden">
      <div class="pb-1">
        {{ $t('components.layout.appDrawer.user.favorites') }}
      </div>
      <div class="text-no-wrap overflow-x-auto pb-2">
        <v-chip
          to="/home/favorites/crags"
          small
        >
          <v-icon color="primary" left small>
            {{ mdiTerrain }}
          </v-icon>
          {{ $t('components.user.tabs.crags') }}
        </v-chip>
        <v-chip
          to="/home/favorites/gyms"
          small
        >
          <v-icon color="primary" left small>
            {{ mdiOfficeBuildingMarker }}
          </v-icon>
          {{ $t('components.user.tabs.gyms') }}
        </v-chip>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import { mdiArrowLeft, mdiTerrain, mdiOfficeBuildingMarker } from '@mdi/js'

export default {
  name: 'UserFavoriteTabs',

  data () {
    return {
      mdiArrowLeft,
      mdiTerrain,
      mdiOfficeBuildingMarker
    }
  }
}
</script>
