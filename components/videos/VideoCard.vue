<template>
  <div>
    <div v-html="video.iframe" />
    <div class="caption mb-2">
      {{ video.description }}
    </div>
    <div class="d-flex justify-space-between">
      <owner-label
        :owner="video.creator"
        :history="video.history"
        :edit-path="`${video.path}/edit?redirect_to=${$route.fullPath}`"
        :delete-function="deleteVideo"
        :reports="{ type: 'Video', id: video.id }"
      />
      <like-btn
        class="align-end"
        :likeable-id="video.id"
        likeable-type="Video"
        :initial-like-count="video.likes_count"
      />
    </div>
  </div>
</template>

<script>
import OwnerLabel from '@/components/users/OwnerLabel'
import VideoApi from '~/services/oblyk-api/VideoApi'
import LikeBtn from '~/components/forms/LikeBtn.vue'

export default {
  name: 'VideoCard',
  components: { LikeBtn, OwnerLabel },
  props: {
    video: {
      type: Object,
      required: true
    },
    getVideos: {
      type: Function,
      default: null
    }
  },

  methods: {
    deleteVideo () {
      if (confirm(this.$t('actions.areYouSur'))) {
        new VideoApi(this.$axios, this.$auth)
          .delete(this.video.id)
          .then(() => {
            this.getVideos()
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'video')
          })
      }
    }
  }
}
</script>
