<template>
  <div class="pa-4">
    <p class="font-weight-bold">
      <v-icon left>
        {{ mdiFormatColorFill }}
      </v-icon>
      {{ $t('models.gymSpace.sectors_color') }}
    </p>
    <p>
      {{ $t('components.gymSpace.colorExplain') }}
    </p>
    <v-row
      justify="space-around"
      align="center"
      class="mb-4 mt-2"
    >
      <v-color-picker
        v-model="color"
        dot-size="25"
        show-swatches
        swatches-max-height="200"
        mode="rgba"
        width="395"
        class="border"
        @input="setTestColor"
      />
    </v-row>
    <div class="text-right">
      <v-btn
        text
        @click="cancel()"
      >
        {{ $t('actions.cancel') }}
      </v-btn>
      <v-btn
        text
        outlined
        class="ml-2"
        color="primary"
        :loading="updatingColor"
        @click="valid()"
      >
        {{ $t('actions.valid') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiFormatColorFill } from '@mdi/js'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
import GymSpace from '~/models/GymSpace'
const defaultColor = 'rgb(49,153,78)'

export default {
  name: 'GymSpaceEditingSectorsColor',

  props: {
    gymSpace: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      updatingColor: false,
      type: 'rgba',
      rgba: {
        r: parseInt((this.gymSpace.sectors_color || defaultColor).replace(/[rgba()]/g, '').split(',')[0].trim()),
        g: parseInt((this.gymSpace.sectors_color || defaultColor).replace(/[rgba()]/g, '').split(',')[1].trim()),
        b: parseInt((this.gymSpace.sectors_color || defaultColor).replace(/[rgba()]/g, '').split(',')[2].trim()),
        a: 1
      },

      mdiFormatColorFill
    }
  },

  computed: {
    color: {
      get () {
        return this[this.type]
      },
      set (v) {
        this[this.type] = v
      }
    },
    newColor () {
      return `rgb(${this.rgba.r},${this.rgba.g},${this.rgba.b})`
    }
  },

  methods: {
    cancel () {
      this.$root.$emit('setTestColour', this.gymSpace.sectors_color || defaultColor)
      this.$root.$emit('showEditingSectorColor', false)
    },

    valid () {
      if (this.newColor !== (this.gymSpace.sectors_color || defaultColor)) {
        this.updatingColor = true
        new GymSpaceApi(this.$axios, this.$auth)
          .update({
            id: this.gymSpace.id,
            gym_id: this.gymSpace.gym.id,
            sectors_color: this.newColor
          })
          .then((resp) => {
            this.$root.$emit('ReFetchGymSpace', new GymSpace({ attributes: resp.data }))
          })
          .finally(() => {
            this.updatingColor = false
            this.$root.$emit('showEditingSectorColor', false)
          })
      } else {
        this.$root.$emit('showEditingSectorColor', false)
      }
    },

    setTestColor () {
      this.$root.$emit('setTestColour', this.newColor)
    }
  }
}
</script>
