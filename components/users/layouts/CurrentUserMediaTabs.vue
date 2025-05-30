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
        {{ $t('components.user.tabs.media') }}
      </div>
      <div class="page-header-sheet-btn-list">
        <v-btn
          to="/home/media/photos"
          exact-path
          text
          x-small
        >
          <v-icon left small>
            {{ mdiImage }}
          </v-icon>
          {{ $t('components.user.tabs.photos') }}
        </v-btn>
        <v-btn
          to="/home/media/videos"
          exact-path
          text
          x-small
        >
          <v-icon left small>
            {{ mdiVideo }}
          </v-icon>
          {{ $t('components.user.tabs.videos') }}
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import { mdiArrowLeft, mdiImage, mdiVideo } from '@mdi/js'

export default {
  name: 'CurrentUserMediaTabs',
  data () {
    return {
      mdiArrowLeft,
      mdiImage,
      mdiVideo
    }
  }
}
</script>
