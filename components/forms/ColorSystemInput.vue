<template>
  <v-dialog
    v-model="colorSystemModal"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        text
        :loading="loadingColorsSystem"
        v-bind="attrs"
        v-on="on"
      >
        <div v-if="selectedColorSystem">
          <v-icon
            v-for="(colorSystemLine, colorSystemLineIndex) in selectedColorSystem.color_system_lines"
            :key="`color-system-line-index-${colorSystemLineIndex}`"
            :color="colorSystemLine.hex_color"
            class="mr-1"
          >
            {{ mdiCircle }}
          </v-icon>
        </div>
        <div v-else>
          {{ $t('components.input.colorSystem.chooseOrder') }}
        </div>
      </v-btn>
    </template>

    <v-card
      v-if="!addingMode"
      class="pa-4"
      :loading="loadingColorsSystem"
    >
      <v-card-title class="px-1">
        {{ $t('components.input.colorSystem.chooseOrder') }}
      </v-card-title>
      <v-sheet
        v-for="(colorSystem, colorSystemIndex) in colorsSystems"
        :key="`ascent-color-index-${colorSystemIndex}`"
        class="pa-2 rounded-sm activable-v-sheet mb-2"
        :class="colorSystem.id === colorSystemId ? '--active' : '--inactive'"
        @click="onSelect(colorSystem.id)"
      >
        <p
          v-if="colorSystem.count_usage > 0"
          class="mb-1"
        >
          <small>
            {{ $t('components.input.colorSystem.usage', { count: colorSystem.count_usage }) }}
          </small>
        </p>
        <v-icon
          v-for="(colorSystemLine, colorSystemLineIndex) in colorSystem.color_system_lines"
          :key="`color-system-line-index-${colorSystemLineIndex}`"
          :color="colorSystemLine.hex_color"
          class="mr-1"
        >
          {{ mdiCircle }}
        </v-icon>
      </v-sheet>
      <v-btn
        text
        block
        outlined
        color="primary"
        large
        class="rounded-sm mt-7"
        @click="addingMode = true"
      >
        {{ $t('components.input.colorSystem.create') }}
      </v-btn>
    </v-card>

    <v-card v-if="addingMode">
      <v-card-title>
        {{ $t('components.input.colorSystem.create') }}
      </v-card-title>
      <v-card-text>
        <color-system-form
          :create-callback="newColorSystem"
          :cancel-callback="() => { addingMode = false }"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiCircle } from '@mdi/js'
import ColorSystemApi from '~/services/oblyk-api/ColorSystemApi'
import ColorSystem from '~/models/ColorSystem'
import ColorSystemForm from '~/components/colorSystems/forms/ColorSystemForm.vue'

export default {
  name: 'ColorSystemInput',
  components: { ColorSystemForm },
  props: {
    value: {
      type: [String, Number],
      default: null
    },

    gymId: {
      type: Number,
      default: null
    },

    callback: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      colorSystemModal: false,
      colorSystemId: this.value,
      colorsSystems: [],
      loadingColorsSystem: true,
      addingMode: false,

      mdiCircle
    }
  },

  computed: {
    selectedColorSystem () {
      for (const colorsSystem of this.colorsSystems) {
        if (colorsSystem.id === this.colorSystemId) {
          return colorsSystem
        }
      }
      return null
    }
  },

  mounted () {
    this.getColorsSystems()
  },

  methods: {
    getColorsSystems (colorSystem = null) {
      this.loadingColorsSystem = true
      new ColorSystemApi(this.$axios, this.$auth)
        .all(this.gymId)
        .then((resp) => {
          for (const colorSystem of resp.data) {
            this.colorsSystems.push(new ColorSystem({ attributes: colorSystem }))
          }
          if (colorSystem) {
            this.setColorSystem(colorSystem)
            this.colorSystemModal = false
          } else if ((this.colorsSystems[0]?.count_usage || 0) > 0) {
            this.setColorSystem(this.colorsSystems[0])
          }
        })
        .finally(() => {
          this.loadingColorsSystem = false
        })
    },

    newColorSystem (colorSystem) {
      this.getColorsSystems(colorSystem)
    },

    setColorSystem (colorSystem) {
      this.colorSystemId = colorSystem.id
      this.callback(colorSystem)
      this.$emit('input', this.colorSystemId)
    },

    onSelect (status) {
      this.colorSystemId = status
      this.colorSystemModal = false
      this.callback(this.selectedColorSystem)
      this.$emit('input', this.colorSystemId)
    }
  }
}
</script>
