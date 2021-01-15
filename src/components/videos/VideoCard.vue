<template>
  <div>
    <div v-html="video.iframe"/>
    <div class="caption mb-2">
      {{ video.description }}
    </div>
    <owner-label
      :owner="video.creator"
      :history="video.history"
      :edit-path="`${video.path('edit')}?redirect_to=${$route.fullPath}`"
      :delete-function="deleteVideo"
      :reports="{ type: 'Video', id: video.id }"
    />
  </div>
</template>

<script>
import OwnerLabel from '@/components/users/OwnerLabel'
import VideoApi from '@/services/oblyk-api/VideoApi'

export default {
  name: 'VideoCard',
  components: { OwnerLabel },
  props: {
    video: Object,
    getVideos: Function
  },

  methods: {
    deleteVideo: function () {
      if (confirm(this.$t('actions.areYouSur'))) {
        VideoApi
          .delete(this.video.id)
          .then(() => {
            this.getVideos()
          })
          .catch(err => {
            this.$root.$emit('alertFromApiError', err, 'video')
          })
      }
    }
  }
}
</script>
