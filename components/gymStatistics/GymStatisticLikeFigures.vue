<template>
  <v-sheet class="rounded pa-4 full-height">
    <h4 class="mb-4">
      <v-icon left>
        {{ mdiHeart }}
      </v-icon>
      {{ $t('components.gymStatistic.notesTitle') }}
    </h4>
    <p
      v-if="loading"
      class="text-center"
    >
      {{ $t('common.loading') }}
    </p>
    <div v-else>
      <p class="mb-3">
        <v-icon
          class="vertical-align-sub"
          left
          small
        >
          {{ mdiHeartMultipleOutline }}
        </v-icon>
        {{ $t('components.gymStatistic.likeTitle') }}
      </p>
      <v-row>
        <v-col class="text-center" style="line-height: 1em">
          <strong class="d-block mb-2">
            {{ likeFigures.likes_count }}
            <small class="text--disabled">
              {{ $tc('components.like.likesCount', likeFigures.likes_count) }}
            </small>
          </strong>
          <small>
            {{ $t('components.gymStatistic.likesCount') }}
          </small>
        </v-col>
        <v-col class="text-center" style="line-height: 1em">
          <strong class="d-block mb-2">
            {{ Math.round(likeFigures.average_like * 10) / 10 }}
            <small class="text--disabled">
              {{ $tc('components.like.likesCount', likeFigures.average_like) }}
            </small>
          </strong>
          <small>
            {{ $t('components.gymStatistic.averageLike') }}
          </small>
        </v-col>
        <v-col class="text-center" style="line-height: 1em">
          <strong class="d-block mb-2">
            {{ Math.round(likeFigures.liked_ratio * 1000) / 10 }} <small class="text--disabled">%</small>
          </strong>
          <small>
            {{ $t('components.gymStatistic.likedRatio') }}
          </small>
        </v-col>
      </v-row>
    </div>
  </v-sheet>
</template>

<script>
import { mdiHeart, mdiHeartMultipleOutline } from '@mdi/js'
import GymRouteStatisticApi from '~/services/oblyk-api/GymRouteStatisticApi'

export default {
  name: 'GymStatisticLikeFigures',
  props: {
    gym: {
      type: Object,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: true,
      likeFigures: {},

      mdiHeart,
      mdiHeartMultipleOutline
    }
  },

  watch: {
    filters: {
      handler () {
        this.getGrades()
      },
      deep: true
    }
  },

  mounted () {
    this.getLikeFigures()
  },

  methods: {
    percent (note) {
      return this.noteSum !== 0 ? Math.round(parseInt(note) / this.noteSum * 1000) / 10 : 0
    },

    getLikeFigures () {
      this.loading = true
      new GymRouteStatisticApi(this.$axios, this.$auth)
        .likeFigures(this.gym.id, this.filters)
        .then((resp) => {
          this.likeFigures = resp.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
