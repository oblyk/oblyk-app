<template>
  <div>
    <p>{{ $t('components.colorSystem.plusToAdd') }}</p>
    <div>
      <color-input
        v-for="(colorLine, colorLineIndex) in data.color_system_lines"
        :key="`color-line-index-${colorLineIndex}`"
        v-model="colorLine.hex_color"
        :multiple="false"
        input-style="button"
        :only-simple-color="true"
        :open-on-mounted="true"
      />
      <v-btn
        icon
        color="primary"
        @click="addColorLine"
      >
        <v-icon>{{ mdiPlus }}</v-icon>
      </v-btn>
      <v-btn
        v-if="data.color_system_lines.length > 1"
        icon
        @click="removeColorLine"
      >
        <v-icon>{{ mdiMinus }}</v-icon>
      </v-btn>
    </div>
    <div class="text-right mt-3">
      <v-btn
        elevation="0"
        @click="cancelCallback"
      >
        {{ $t('actions.cancel') }}
      </v-btn>
      <v-btn
        :loading="loading"
        elevation="0"
        color="primary"
        @click="submit"
      >
        {{ $t('actions.create') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiCircle, mdiPlus, mdiMinus } from '@mdi/js'
import ColorInput from '~/components/forms/ColorInput.vue'
import ColorSystemApi from '~/services/oblyk-api/ColorSystemApi'

export default {
  name: 'ColorSystemForm',
  components: { ColorInput },

  props: {
    createCallback: {
      type: Function,
      required: true
    },
    cancelCallback: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      loading: false,
      data: {
        color_system_lines: []
      },

      mdiCircle,
      mdiPlus,
      mdiMinus
    }
  },

  methods: {
    addColorLine () {
      const previousOrder = this.data.color_system_lines.length === 0 ? 0 : this.data.color_system_lines[this.data.color_system_lines.length - 1]?.order + 1
      this.data.color_system_lines.push(
        {
          hex_color: null,
          order: previousOrder
        }
      )
    },

    removeColorLine () {
      if (this.data.color_system_lines.length > 1) {
        this.data.color_system_lines.pop()
      }
    },

    submit () {
      this.loading = true
      const colors = []
      for (const color of this.data.color_system_lines) {
        colors.push(color.hex_color)
      }
      new ColorSystemApi(this.$axios, this.$auth)
        .create({ colors })
        .then((resp) => {
          this.createCallback(resp.data)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
