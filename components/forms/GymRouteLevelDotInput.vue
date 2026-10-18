<template>
  <v-input
    v-if="levels.levels"
    :hide-details="hideDetail"
  >
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-2 px-2">
      <legend class="v-label custom-fieldset-label">
        Niveau
      </legend>
      <div class="d-flex justify-space-between">
        <v-btn
          v-for="(levelItem, levelItemIndex) in levelItems"
          :key="`level-item-${levelItemIndex}`"
          color="deep-purple accent-3"
          :class="levelIndex === levelItem.value ? 'v-btn--active' : ''"
          icon
          large
          @click="selectLevel(levelItem)"
        >
          <v-icon
            :large="levelIndex === levelItem.value || levelIndex === null"
            :color="levels.levels[levelItem.value].color"
          >
            {{ mdiCircle }}
          </v-icon>
        </v-btn>
      </div>
    </fieldset>
  </v-input>
</template>

<script>
import { mdiCircle } from '@mdi/js'
import { HoldColorsHelpers } from '~/mixins/HoldColorsHelpers'

export default {
  name: 'GymRouteLevelDotInput',
  mixins: [HoldColorsHelpers],
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    levels: {
      type: Object,
      default: null
    },
    changeCallback: {
      type: Function,
      required: true
    },
    icon: {
      type: String,
      default: null
    },
    hideDetail: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      levelIndex: this.value,

      mdiCircle
    }
  },

  computed: {
    levelItems () {
      const levels = []
      for (const level of this.levels.levels) {
        levels.push({ value: level.order, text: this.hexColorToName(level.color) })
      }
      return levels
    }
  },

  methods: {
    selectLevel (levelItem) {
      this.levelIndex = levelItem.value
      this.onChange()
    },

    onChange () {
      this.changeCallback(this.levels.levels[this.levelIndex])
      this.$emit('input', this.levelIndex)
    }
  }
}
</script>
