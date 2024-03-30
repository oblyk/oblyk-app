<template>
  <div>
    <div v-html="video.embedded_code"/>
    <div
      v-if="video.description"
      class="caption mb-2"
    >
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
    <div v-if="newVideo">
      <v-chip
        v-once
        color="red"
        dark
        x-small
      >
        New
      </v-chip>
    </div>
  </div>
</template>

<script>
import { DateHelpers } from '~/mixins/DateHelpers'
import OwnerLabel from '@/components/users/OwnerLabel'
import VideoApi from '~/services/oblyk-api/VideoApi'
import LikeBtn from '~/components/forms/LikeBtn'

export default {
  name: 'VideoCard',
  components: { LikeBtn, OwnerLabel },
  mixins: [DateHelpers],
  props: {
    video: {
      type: Object,
      required: true
    },
    getVideos: {
      type: Function,
      default: null
    },
    lastRead: {
      type: String,
      default: null
    }
  },

  head () {
    return {
      script: [
        { src: 'https://cdn.iframe.ly/embed.js' }
      ]
    }
  },

  computed: {
    newVideo () {
      if (this.lastRead === null) {
        return false
      } else {
        return this.dateIsBeforeDate(this.video.history.created_at, this.lastRead)
      }
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
