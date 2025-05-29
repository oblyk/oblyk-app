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
        {{ $t('components.layout.appDrawer.user.ascents.outdoor') }}
      </div>
      <div class="text-no-wrap overflow-x-auto pb-2">
        <v-chip
          to="/home/ascents/outdoor"
          small
        >
          <v-icon color="primary" left small>
            {{ mdiImageAlbum }}
          </v-icon>
          {{ $t('components.user.ascentTabs.sendList') }}
        </v-chip>
        <v-chip
          to="/home/ascents/outdoor/analytiks"
          small
        >
          <v-icon color="primary" left small>
            {{ mdiChartBar }}
          </v-icon>
          {{ $t('components.user.ascentTabs.analytiks') }}
        </v-chip>
        <v-chip
          to="/home/ascents/outdoor/tick-list"
          small
        >
          <v-icon color="primary" left small>
            {{ mdiFormatListCheckbox }}
          </v-icon>
          {{ $t('components.user.ascentTabs.tickList') }}
        </v-chip>
        <v-chip
          to="/home/ascents/outdoor/projects"
          small
        >
          <v-icon color="primary" left small>
            {{ mdiCropFree }}
          </v-icon>
          {{ $t('components.user.ascentTabs.projects') }}
        </v-chip>
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
  props: {
    user: {
      type: Object,
      required: true
    }
  },

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
