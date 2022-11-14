<template>
  <div>
    <spinner v-if="loadingVideo" />

    <v-container v-if="!loadingVideo">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.addVideo') }}
          </h2>
          <video-form
            :video="video"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Spinner from '~/components/layouts/Spiner'
import VideoForm from '~/components/videos/forms/VideoForm'
import { VideoConcern } from '~/concerns/VideoConcern'

export default {
  components: { VideoForm, Spinner },
  mixins: [VideoConcern],
  middleware: ['auth'],

  head () {
    return {
      title: this.$t('meta.video.edit')
    }
  }
}
</script>
