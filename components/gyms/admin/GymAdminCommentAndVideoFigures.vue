<template>
  <v-card class="full-height d-flex flex-column justify-space-between">
    <v-card-title>
      <v-icon left>
        {{ mdiMessageVideo }}
      </v-icon>
      {{ $t('components.gymAdmin.commentAndVideo') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7 d-flex justify-space-around">
      <div>
        <p class="big-font-size font-weight-bold">
          {{ figures.comments_count !== null ? figures.comments_count : '...' }}
        </p>
        <small>
          {{ $t('components.gymAdmin.comments') }}
        </small>
        <div v-if="newCount && newCount.comment && newCount.comment.count > 0">
          <v-chip
            color="red"
            dark
            small
          >
            {{ $tc('common.new', newCount.comment.count, { count: newCount.comment.count }) }}
          </v-chip>
        </div>
      </div>
      <div>
        <p class="big-font-size font-weight-bold">
          {{ figures.videos_count !== null ? figures.videos_count : '...' }}
        </p>
        <small>
          {{ $t('components.gymAdmin.videos') }}
        </small>
        <div v-if="newCount && newCount.video && newCount.video.count > 0">
          <v-chip
            color="red"
            dark
            small
          >
            {{ $tc('common.new', newCount.video.count, { count: newCount.video.count }) }}
          </v-chip>
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        elevation="0"
        color="primary"
        class="ml-auto"
        :to="`${gym.adminPath}/comments`"
      >
        <v-icon left>
          {{ mdiComment }}
        </v-icon>
        {{ $t('components.gymAdmin.comments') }}
      </v-btn>
      <v-btn
        elevation="0"
        color="primary"
        :to="`${gym.adminPath}/videos`"
      >
        <v-icon left>
          {{ mdiMovieOpen }}
        </v-icon>
        {{ $t('components.gymAdmin.videos') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiMessageVideo, mdiMovieOpen, mdiComment } from '@mdi/js'
import GymApi from '~/services/oblyk-api/GymApi'
import GymAdministratorApi from '~/services/oblyk-api/GymAdministratorApi'

export default {
  name: 'GymAdminCommentAndVideoFigures',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      figures: {},
      newCount: null,

      mdiMessageVideo,
      mdiMovieOpen,
      mdiComment
    }
  },

  mounted () {
    this.getFigures()
    this.getNewElement()
  },

  methods: {
    getFigures () {
      new GymApi(this.$axios, this.$auth)
        .figures(this.gym.id, ['comments_count', 'videos_count'])
        .then((resp) => { this.figures = resp.data })
    },

    getNewElement () {
      const administeredGym = this.$auth.user.gym_roles.find(administeredGym => administeredGym.gym_id === this.gym.id)
      const feeds = []
      if (administeredGym.subscribe_to_comment_feed) { feeds.push('comment') }
      if (administeredGym.subscribe_to_video_feed) { feeds.push('video') }
      new GymAdministratorApi(this.$axios, this.$auth)
        .newFeedsCount(this.gym.id, feeds)
        .then((resp) => { this.newCount = resp.data })
    }
  }
}
</script>
