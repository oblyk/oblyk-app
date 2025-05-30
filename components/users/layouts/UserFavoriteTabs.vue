<template>
  <v-sheet class="page-header-sheet">
    <div class="page-header-sheet-back-btn">
      <v-btn
        exact-path
        icon
        large
        :to="$nuxt.context.from || '/home'"
      >
        <v-icon color="primary">
          {{ mdiArrowLeft }}
        </v-icon>
      </v-btn>
    </div>
    <div class="page-header-sheet-content">
      <div class="page-header-sheet-title">
        {{ $t('components.layout.appDrawer.user.favorites') }}
      </div>
      <div class="page-header-sheet-btn-list">
        <v-btn
          to="/home/favorites/crags"
          exact-path
          text
          x-small
        >
          <v-icon left small>
            {{ mdiTerrain }}
          </v-icon>
          {{ $t('components.user.tabs.crags') }}
        </v-btn>
        <v-btn
          to="/home/favorites/gyms"
          exact-path
          text
          x-small
        >
          <v-icon left small>
            {{ mdiOfficeBuildingMarker }}
          </v-icon>
          {{ $t('components.user.tabs.gyms') }}
        </v-btn>
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
