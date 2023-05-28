<template>
  <div>
    <div
      v-for="(style, styleIndex) in styles"
      :key="`style-bouldering-${styleIndex}`"
      class="border-bottom py-1"
    >
      <div
        style="width: calc(100% - 50px)"
        class="d-inline-block"
      >
        <v-checkbox
          v-model="climbingStyles"
          :disabled="disabled"
          class="mt-1"
          :value="style.value"
          hide-details
          @change="change(style.value)"
        >
          <template #label>
            <v-icon
              :color="styleColor(style.value)"
              left
            >
              {{ style.icon }}
            </v-icon>
            {{ $t(`models.climbingStyle.${style.value}`) }}
          </template>
        </v-checkbox>
      </div>
      <div
        style="width: 45px"
        class="d-inline-block vertical-align-bottom text-right"
      >
        <v-btn
          icon
          :disabled="!climbingStyles.includes(style.value)"
          @click="openColorModal(style)"
        >
          <v-icon>
            {{ mdiFormatColorFill }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <!-- Color modal -->
    <v-dialog
      v-model="colorModal"
      width="375"
      persistent
    >
      <v-card v-if="colorModalStyle">
        <v-card-title>
          <v-icon
            :color="computedNewColor || styleColor(colorModalStyle.value)"
            left
            size="40"
            class="mr-3"
          >
            {{ colorModalStyle.icon }}
          </v-icon>
          {{ $t(`models.climbingStyle.${colorModalStyle.value}`) }}
        </v-card-title>
        <v-card-text>
          <v-color-picker
            v-model="newColor"
            hide-canvas
            hide-sliders
            hide-inputs
            show-swatches
            width="350"
            swatches-max-height="300"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="closeColorModal()"
          >
            {{ $t('actions.cancel') }}
          </v-btn>
          <v-btn
            v-if="styleColor(colorModalStyle.value) !== null"
            text
            outlined
            color="red"
            :loading="changingColor"
            @click="submitColor(true)"
          >
            {{ $t('components.gymClimbingStyles.noColor') }}
          </v-btn>
          <v-btn
            text
            outlined
            color="primary"
            :loading="changingColor"
            @click="submitColor()"
          >
            {{ $t('actions.valid') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiFormatColorFill } from '@mdi/js'
import {
  oblykClimbingStyleTechnical,
  oblykClimbingStyleResistance,
  oblykClimbingStyleBoulder,
  oblykClimbingStyleEndurance,
  oblykClimbingStylePhysics,
  oblykClimbingStyleFinger,
  oblykClimbingStyleGrip,
  oblykClimbingStyleCoordination,
  oblykClimbingStyleTallPeople,
  oblykClimbingStyleSmallPeople
} from '~/assets/oblyk-icons'
import GymClimbingStyleApi from '~/services/oblyk-api/GymClimbingStyleApi'

export default {
  name: 'GymClimbingStylesForm',
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymClimbingStyles: {
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
      dataClimbingStyles: this.gymClimbingStyles,
      colorModal: false,
      disabled: false,
      climbingStyles: this.gymClimbingStyles[this.climbingType]?.map(style => style.style) || [],
      colorType: 'rgba',
      colorModalStyle: null,
      rgba: { r: null, g: null, b: null, a: 1 },
      changingColor: false,
      styles: [
        { value: 'boulder', icon: oblykClimbingStyleBoulder },
        { value: 'endurance', icon: oblykClimbingStyleEndurance },
        { value: 'resistance', icon: oblykClimbingStyleResistance },
        { value: 'technical', icon: oblykClimbingStyleTechnical },
        { value: 'physics', icon: oblykClimbingStylePhysics },
        { value: 'finger', icon: oblykClimbingStyleFinger },
        { value: 'grip', icon: oblykClimbingStyleGrip },
        { value: 'coordination', icon: oblykClimbingStyleCoordination },
        { value: 'tall_people', icon: oblykClimbingStyleTallPeople },
        { value: 'small_people', icon: oblykClimbingStyleSmallPeople }
      ],

      mdiFormatColorFill
    }
  },

  computed: {
    newColor: {
      get () {
        return this[this.colorType]
      },
      set (v) {
        this[this.colorType] = v
      }
    },
    computedNewColor () {
      return `rgb(${this.rgba.r}, ${this.rgba.g}, ${this.rgba.b})`
    }
  },

  methods: {
    change (style) {
      this.disabled = true
      const promise = new GymClimbingStyleApi(this.$axios, this.$auth)
      const data = {
        gym_id: this.gym.id,
        climbing_type: this.climbingType,
        style
      }
      if (this.climbingStyles.includes(style)) {
        promise.create(data).finally(() => { this.disabled = false })
      } else {
        promise.deactivate(data).finally(() => { this.disabled = false })
      }
    },

    styleColor (style) {
      const typeList = this.dataClimbingStyles[this.climbingType]
      if (typeList) {
        return typeList.find(type => type.style === style)?.color
      } else {
        return null
      }
    },

    submitColor (noColor = false) {
      if (this.rgba.r === null) {
        this.closeColorModal()
        return
      }
      this.changingColor = true
      new GymClimbingStyleApi(this.$axios, this.$auth)
        .create({
          gym_id: this.gym.id,
          climbing_type: this.climbingType,
          style: this.colorModalStyle.value,
          color: noColor ? null : this.computedNewColor
        })
        .then((resp) => {
          const data = resp.data
          let styleFound = false
          for (const dataIndex in this.dataClimbingStyles[this.climbingType]) {
            if (this.dataClimbingStyles[this.climbingType][dataIndex].style === data.style) {
              this.dataClimbingStyles[this.climbingType][dataIndex].color = data.color
              styleFound = true
            }
          }
          if (!styleFound) {
            this.dataClimbingStyles[data.climbing_type] ||= []
            this.dataClimbingStyles[data.climbing_type].push(data)
          }
        })
        .finally(() => {
          this.changingColor = false
          this.closeColorModal()
        })
    },

    openColorModal (style) {
      const styleColor = this.styleColor(style.value)
      if (styleColor) {
        const splitColors = styleColor.replace(/[rgba()]/g, '').split(',').map(color => parseInt(color.trim()))
        this.rgba = {
          r: splitColors[0],
          g: splitColors[1],
          b: splitColors[2]
        }
      }
      this.colorModalStyle = style
      this.colorModal = true
    },

    closeColorModal () {
      this.colorModalStyle = null
      this.rgba = { r: null, g: null, b: null, a: 1 }
      this.changingColor = false
      this.colorModal = false
    }
  }
}
</script>
