<template>
  <v-slider
    v-if="gymLevels && gymLevels[climbingType] && gymLevels[climbingType].sub_level_enabled"
    v-model="subLevel"
    :label="$t('models.gymRoute.intensity')"
    :tick-labels="tickLabels()"
    track-color="rgba(150,150,150,0.4)"
    :color="color"
    min="0"
    :prepend-icon="mdiChiliMild"
    class="mb-5"
    :max="gymLevels[climbingType].sub_level_max"
    @change="onChange()"
  />
</template>

<script>
import { mdiChiliMild } from '@mdi/js'

export default {
  name: 'GymRouteSubLevelInput',
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    gymLevels: {
      type: Object,
      required: true
    },
    climbingType: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      subLevel: this.value,

      colors: {
        0: [],
        1: ['#a10026'],
        2: ['#8bbc22', '#a10026'],
        3: ['#8bbc22', '#f2b600', '#a10026'],
        4: ['#8bbc22', '#f2b600', '#fd2605', '#a10026'],
        5: ['#8bbc22', '#f2b600', '#f96a02', '#f11d10', '#a10026']
      },

      mdiChiliMild
    }
  },

  computed: {
    color () {
      return this.colors[this.gymLevels[this.climbingType].sub_level_max][this.subLevel - 1]
    }
  },

  methods: {
    onChange () {
      this.$emit('input', this.subLevel)
    },

    tickLabels () {
      const labels = []
      for (let i = 0; i <= this.gymLevels[this.climbingType].sub_level_max; i++) {
        if (i === 0) {
          labels.push('Ø')
        } else {
          labels.push(i)
        }
      }
      return labels
    }
  }
}
</script>
