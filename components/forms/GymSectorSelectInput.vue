<template>
  <v-input>
    <fieldset class="full-width custom-fieldset border rounded mt-n1 pb-2">
      <legend class="v-label custom-fieldset-label">
        {{ $t('components.input.sectorLink') }}
        <span v-if="!required">
          ({{ $t('common.optional') }})
        </span>
      </legend>
      <v-expansion-panels v-if="!loadingSectorsTree" accordion>
        <v-expansion-panel
          v-for="(space, spaceIndex) in spacesTree"
          :key="`space-${spaceIndex}`"
        >
          <v-expansion-panel-header>
            <div
              class="font-weight-medium"
              :class="space.children.some((child) => child.id === gymSectorId) ? 'deep-purple--text text--accent-3' : ''"
            >
              <v-badge
                :value="space.children.some((child) => child.id === gymSectorId)"
                color="deep-purple accent-3"
                dot
              >
                {{ space.name }}
              </v-badge>
            </div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-radio-group
              v-model="gymSectorId"
              class="mt-0"
            >
              <div
                v-for="(sector, sectorIndex) in space.children"
                :key="`sector-${sectorIndex}`"
                class="d-flex align-center"
                :class="gymSectorId === sector.id ? 'border my-2 rounded-pill py-1 pl-3 pr-2' : ''"
              >
                <v-radio
                  :label="sector.name"
                  :value="sector.id"
                  color="deep-purple accent-3"
                  class="mr-auto mb-0"
                  @click="onChange"
                />
                <v-btn
                  v-if="gymSectorId === sector.id"
                  icon
                  @click="clear"
                >
                  <v-icon>
                    {{ mdiClose }}
                  </v-icon>
                </v-btn>
              </div>
            </v-radio-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <div
        v-if="loadingSectorsTree"
        class="px-2"
      >
        <v-progress-linear
          indeterminate
          color="deep-purple accent-3"
        />
      </div>
    </fieldset>
  </v-input>
</template>

<script>
import { mdiClose } from '@mdi/js'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'GymSectorSelectInput',
  props: {
    value: {
      type: Number,
      default: null
    },
    gym: {
      type: Object,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      gymSectorId: parseInt(this.value),
      loadingSectorsTree: true,
      spacesTree: [],
      gymLabelFonts: [],

      mdiClose
    }
  },

  watch: {
    value () {
      this.gymSectorId = parseInt(this.value)
    }
  },

  mounted () {
    this.getSectorsTree()
  },

  methods: {
    getSectorsTree () {
      this.loadingSectorsTree = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.gym.id}/gym_spaces/tree_sectors`)
        .then((resp) => {
          this.spacesTree = resp.data
        })
        .finally(() => {
          this.loadingSectorsTree = false
        })
    },

    clear () {
      this.gymSectorId = null
      this.onChange()
    },

    onChange () {
      this.$emit('input', this.gymSectorId)
    }
  }
}
</script>
