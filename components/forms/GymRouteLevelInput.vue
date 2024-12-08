<template>
  <v-select
    v-if="levels.levels"
    v-model="levelIndex"
    :items="levelItems"
    item-text="text"
    item-value="value"
    :label="$t('common.level')"
    outlined
    required
    :prepend-inner-icon="icon"
    :menu-props="{ maxHeight: 500 }"
    @change="onChange()"
  >
    <template #item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item" />
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title>
            <v-icon
              :color="levels.levels[data.item.value].color"
              left
            >
              {{ mdiCircle }}
            </v-icon>
            {{ data.item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-select>
</template>

<script>
import { mdiCircle } from '@mdi/js'
import { HoldColorsHelpers } from '~/mixins/HoldColorsHelpers'

export default {
  name: 'GymRouteLevelInput',
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
    onChange () {
      this.changeCallback(this.levels.levels[this.levelIndex])
      this.$emit('input', this.levelIndex)
    }
  }
}
</script>
