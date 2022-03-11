<template>
  <span>
    <v-icon
      small
    >
      {{ cragRoute.difficultyAppreciationIcon }}
    </v-icon>
  </span>
</template>

<script>
import { mdiArrowUp, mdiArrowTopRight, mdiArrowRight, mdiArrowBottomRight, mdiArrowDown } from '@mdi/js'

export default {
  name: 'CragRouteDifficultyIcon',
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiArrowUp,
      mdiArrowTopRight,
      mdiArrowRight,
      mdiArrowBottomRight,
      mdiArrowDown
    }
  },

  methods: {
    difficultyAppreciationIcon () {
      if (this.difficultyAppreciationStatus === 'hard') {
        return mdiArrowUp
      } else if (this.difficultyAppreciationStatus === 'pretty_hard') {
        return mdiArrowTopRight
      } else if (this.difficultyAppreciationStatus === 'just') {
        return mdiArrowRight
      } else if (this.difficultyAppreciationStatus === 'pretty_soft') {
        return mdiArrowBottomRight
      } else if (this.difficultyAppreciationStatus === 'soft') {
        return mdiArrowDown
      }
    },

    difficultyAppreciationStatus () {
      const appreciation = this.cragRoute.difficulty_appreciation
      if (appreciation >= 0.6) {
        return 'hard'
      } else if (appreciation >= 0.2) {
        return 'pretty_hard'
      } else if (appreciation >= -0.2) {
        return 'just'
      } else if (appreciation >= -0.6) {
        return 'pretty_soft'
      } else {
        return 'soft'
      }
    }
  }
}
</script>
