<template>
  <div :class="inputStyle === 'button' ? 'd-inline-block' : ''">
    <div @click="colorModal = true">
      <v-select
        v-if="inputStyle === 'Select'"
        v-model="selectedColors"
        outlined
        readonly
        :multiple="!onlySimpleColor"
        :items="colors"
        :label="label"
        chips
        @focus="colorModal = true"
      >
        <template #selection="{ attrs, item, selected }">
          <v-chip
            v-bind="attrs"
            :input-value="selected"
          >
            <v-icon
              v-if="item.value !== '#00000000'"
              left
              :style="`color: ${item.value}`"
            >
              {{ icon === 'Circle' ? mdiCircle : mdiBookmark }}
            </v-icon>
            {{ item.text }}
          </v-chip>
        </template>
      </v-select>
      <v-btn
        v-if="inputStyle === 'button'"
        text
        min-width="37"
        class="px-0 text-center"
      >
        <div
          v-if="multiple"
          class="d-inline-block"
        >
          <v-icon
            v-for="(color, colorIndex) in selectedColors"
            :key="`color-index-${colorIndex}`"
            :color="color"
          >
            {{ mdiCircle }}
          </v-icon>
        </div>
        <div v-else>
          <v-icon :color="selectedColors">
            {{ mdiCircle }}
          </v-icon>
        </div>
      </v-btn>
    </div>
    <v-dialog
      v-model="colorModal"
      width="450"
      :fullscreen="$vuetify.breakpoint.mobile"
    >
      <v-card>
        <v-card-title
          :class="$vuetify.breakpoint.mobile ? 'px-2' : 'px-4'"
          v-text="colorsLimit > 1 ? $t('components.input.colorMulti', { colorsLimit: colorsLimit }) : $t('components.input.colorSingle')"
        />
        <v-card-text
          class="pb-0"
          :class="$vuetify.breakpoint.mobile ? 'px-1' : 'px-4'"
        >
          <v-sheet
            v-for="(color, colorIndex) in availableColors"
            :key="`color-index-${colorIndex}`"
            style="width: calc(25% - 5px)"
            class="d-inline-block text-center px-2 pt-2 ml-1 rounded-sm"
            :class="btnClass(color)"
            @click="addColor(color.value)"
          >
            <v-icon
              :color="color.value"
              large
            >
              {{ mdiCircle }}
            </v-icon>
            <p class="mb-0 text-truncate">
              <small :class="color.simple && !onlySimpleColor ? 'font-weight-bold' : ''">
                {{ color.text }}
              </small>
            </p>
          </v-sheet>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="colorModal = false"
          >
            {{ $t('actions.ok') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiCircle, mdiBookmark } from '@mdi/js'
import { HoldColorsHelpers } from '@/mixins/HoldColorsHelpers'

export default {
  name: 'ColorInput',
  mixins: [HoldColorsHelpers],
  props: {
    value: {
      type: [Array, String],
      default: null
    },
    inputStyle: {
      type: String,
      default: 'Select'
    },
    icon: {
      type: String,
      default: 'Circle'
    },
    label: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    openOnMounted: {
      type: Boolean,
      default: false
    },
    onlySimpleColor: {
      type: Boolean,
      default: false
    },
    colorsLimit: {
      type: Number,
      default: 1
    },
    disableAllColor: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      colorModal: false,
      selectedColors: this.value,

      mdiCircle,
      mdiBookmark
    }
  },

  computed: {
    availableColors () {
      if (this.onlySimpleColor) {
        return this.simpleColors()
      } else {
        return this.colors
      }
    }
  },

  watch: {
    value () {
      this.selectedColors = this.value
    }
  },

  mounted () {
    if (this.openOnMounted) {
      this.colorModal = true
    }
  },

  methods: {
    addColor (color) {
      if (color === '#00000000' && this.disableAllColor) { return false }

      if (color === '#00000000') {
        this.selectedColors = [color]
        this.$emit('input', this.selectedColors)
        this.colorModal = false
      } else if (this.multiple) {
        if (this.selectedColors.includes('#00000000')) {
          this.selectedColors.splice(this.selectedColors.indexOf('#00000000'), 1)
        }
        if (this.selectedColors.includes(color)) {
          const colorIndex = this.selectedColors.indexOf(color)
          this.selectedColors.splice(colorIndex, 1)
        } else if (this.selectedColors.length === this.colorsLimit) {
          this.selectedColors.shift()
          this.selectedColors.push(color)
        } else {
          this.selectedColors.push(color)
        }
      } else {
        this.selectedColors = color
        this.$emit('input', this.selectedColors)
        this.colorModal = false
      }
    },

    btnClass (color) {
      const hoverable = this.disableAllColor && color.value === '#00000000' ? '' : 'activable-v-sheet'
      return this.selectedColors && this.selectedColors.includes(color.value) ? `${hoverable} --active` : `${hoverable} --inactive`
    }
  }
}
</script>
