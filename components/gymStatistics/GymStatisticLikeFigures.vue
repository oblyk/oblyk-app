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
            {{ appreciationFigures.like.likes_count }}
            <small class="text--disabled">
              {{ $tc('components.like.likesCount', appreciationFigures.like.likes_count) }}
            </small>
          </strong>
          <small>
            {{ $t('components.gymStatistic.likesCount') }}
          </small>
        </v-col>
        <v-col class="text-center" style="line-height: 1em">
          <strong class="d-block mb-2">
            {{ Math.round(appreciationFigures.like.average_like * 10) / 10 }}
            <small class="text--disabled">
              {{ $tc('components.like.likesCount', appreciationFigures.like.average_like) }}
            </small>
          </strong>
          <small>
            {{ $t('components.gymStatistic.averageLike') }}
          </small>
        </v-col>
        <v-col class="text-center" style="line-height: 1em">
          <strong class="d-block mb-2">
            {{ Math.round(appreciationFigures.like.liked_ratio * 1000) / 10 }} <small class="text--disabled">%</small>
          </strong>
          <small>
            {{ $t('components.gymStatistic.likedRatio') }}
          </small>
        </v-col>
      </v-row>
      <p class="mt-5 mb-2">
        <v-icon
          class="vertical-align-sub"
          left
          small
        >
          {{ mdiGauge }}
        </v-icon>
        {{ $t('components.gymStatistic.difficultyTitle') }}
      </p>
      <div>
        <v-chip
          :title="$t('models.hardnessStatus.easy_for_the_grade')"
          outlined
        >
          😎 {{ appreciationFigures.difficulty.easy_for_the_grade }}
        </v-chip>
        <v-chip
          :title="$t('models.hardnessStatus.this_grade_is_accurate')"
          outlined
        >
          👌 {{ appreciationFigures.difficulty.this_grade_is_accurate }}
        </v-chip>
        <v-chip
          :title="$t('models.hardnessStatus.sandbagged')"
          outlined
        >
          🥵 {{ appreciationFigures.difficulty.sandbagged }}
        </v-chip>
        <v-icon
          small
          class="mx-1"
        >
          {{ mdiArrowRight }}
        </v-icon>
        <v-chip
          outlined
          pill
          :title="appreciationFigures.difficulty.difficulty_average"
          class="px-1"
        >
          <v-icon
            class="vertical-align-text-top"
            :style="`transform: rotate(${appreciationFigures.difficulty.difficulty_average * -90}deg)`"
            :color="difficultyColor(appreciationFigures.difficulty.difficulty_average)"
          >
            {{ mdiArrowRightThin }}
          </v-icon>
        </v-chip>
        <p class="mb-0 mt-1">
          {{ $t('components.gymStatistic.onAverage') }} : <strong>{{ difficultyAppreciationStatus(appreciationFigures.difficulty.difficulty_average) }}</strong>
        </p>
      </div>
    </div>
  </v-sheet>
</template>

<script>
import { mdiHeart, mdiHeartMultipleOutline, mdiGauge, mdiArrowRightThin, mdiArrowRight } from '@mdi/js'
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
      appreciationFigures: {},

      mdiHeart,
      mdiHeartMultipleOutline,
      mdiGauge,
      mdiArrowRightThin,
      mdiArrowRight
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
        .appreciationFigures(this.gym.id, this.filters)
        .then((resp) => {
          this.appreciationFigures = resp.data
        })
        .finally(() => {
          this.loading = false
        })
    },

    difficultyColor (difficultyAppreciation) {
      let colorDiff = null
      if (difficultyAppreciation > 0) {
        colorDiff = Math.abs(difficultyAppreciation) * 127
        return `rgb(${128 + colorDiff}, ${128 - colorDiff}, ${128 - colorDiff})`
      } else {
        colorDiff = Math.abs(difficultyAppreciation) * 100
        return `rgb(${128 - colorDiff}, ${128 - colorDiff}, ${128 + colorDiff})`
      }
    },

    difficultyAppreciationStatus (difficultyAppreciation) {
      if (difficultyAppreciation >= 0.6) {
        return this.$t('components.difficulty.hard')
      } else if (difficultyAppreciation >= 0.2) {
        return this.$t('components.difficulty.pretty_hard')
      } else if (difficultyAppreciation >= -0.2) {
        return this.$t('components.difficulty.just')
      } else if (difficultyAppreciation >= -0.6) {
        return this.$t('components.difficulty.pretty_soft')
      } else {
        return this.$t('components.difficulty.soft')
      }
    }
  }
}
</script>
