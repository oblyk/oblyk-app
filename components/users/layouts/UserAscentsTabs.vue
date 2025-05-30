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
        {{ $t('components.layout.appDrawer.user.ascents.outdoor') }}
      </div>
      <div class="page-header-sheet-btn-list">
        <v-btn
          to="/home/ascents/outdoor"
          exact-path
          text
          x-small
        >
          <v-icon left small>
            {{ mdiImageAlbum }}
          </v-icon>
          {{ $t('components.user.ascentTabs.sendList') }}
        </v-btn>
        <v-btn
          to="/home/ascents/outdoor/analytiks"
          exact-path
          text
          x-small
        >
          <v-icon left small>
            {{ mdiChartBar }}
          </v-icon>
          {{ $t('components.user.ascentTabs.analytiks') }}
        </v-btn>
        <v-btn
          to="/home/ascents/outdoor/tick-list"
          exact-path
          text
          x-small
        >
          <v-icon left small>
            {{ mdiFormatListCheckbox }}
          </v-icon>
          {{ $t('components.user.ascentTabs.tickList') }}
        </v-btn>
        <v-btn
          to="/home/ascents/outdoor/projects"
          exact-path
          text
          x-small
        >
          <v-icon left small>
            {{ mdiCropFree }}
          </v-icon>
          {{ $t('components.user.ascentTabs.projects') }}
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import {
  mdiArrowLeft,
  mdiImageAlbum,
  mdiChartBar,
  mdiFormatListCheckbox,
  mdiCropFree
} from '@mdi/js'

export default {
  name: 'UserAccentsTabs',

  data () {
    return {
      mdiArrowLeft,
      mdiImageAlbum,
      mdiChartBar,
      mdiFormatListCheckbox,
      mdiCropFree
    }
  }
}
</script>
