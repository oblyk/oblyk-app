<template>
  <div>
    <v-row>
      <v-col cols="12" lg="4">
        <v-card class="full-height">
          <v-card-title class="pb-2 border-bottom">
            <v-checkbox
              v-model="data.sport_climbing.enabled"
              class="mr-1 mt-0 pt-0"
              :label="$t(`models.climbs.sport_climbing`)"
              hide-details
              @change="changes = true"
            />
          </v-card-title>
          <v-card-text class="pt-4">
            <div v-if="data.sport_climbing.enabled">
              <grade-system-input
                v-model="data.sport_climbing.grade_system"
                @input="changes = true"
              />
              <level-representation-input
                v-model="data.sport_climbing.level_representation"
                @input="changes = true"
              />
              <color-order-input
                v-model="data.sport_climbing.levels"
                hide-details
                :gym-level="data.sport_climbing"
                @input="changes = true"
              />
            </div>
            <p
              v-else
              class="text-center text--disabled"
            >
              {{ $t('components.levelAndGrades.climbingTypeDisabled', { gym: gym.name, type: $t(`models.climbs.sport_climbing`) }) }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card class="full-height">
          <v-card-title class="pb-2 border-bottom">
            <v-checkbox
              v-model="data.bouldering.enabled"
              class="mr-1 mt-0 pt-0"
              :label="$t(`models.climbs.bouldering`)"
              hide-details
              @change="changes = true"
            />
          </v-card-title>
          <v-card-text class="pt-4">
            <div v-if="data.bouldering.enabled">
              <grade-system-input
                v-model="data.bouldering.grade_system"
                @input="changes = true"
              />
              <level-representation-input
                v-model="data.bouldering.level_representation"
                @input="changes = true"
              />
              <color-order-input
                v-model="data.bouldering.levels"
                hide-details
                :gym-level="data.bouldering"
                @input="changes = true"
              />
            </div>
            <p
              v-else
              class="text-center text--disabled"
            >
              {{ $t('components.levelAndGrades.climbingTypeDisabled', { gym: gym.name, type: $t(`models.climbs.bouldering`) }) }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4">
        <v-card class="full-height">
          <v-card-title class="pb-2 border-bottom">
            <v-checkbox
              v-model="data.pan.enabled"
              class="mr-1 mt-0 pt-0"
              :label="$t(`models.climbs.pan`)"
              hide-details
              @change="changes = true"
            />
          </v-card-title>
          <v-card-text class="pt-4">
            <div v-if="data.pan.enabled">
              <grade-system-input
                v-model="data.pan.grade_system"
                @input="changes = true"
              />
              <level-representation-input
                v-model="data.pan.level_representation"
                @input="changes = true"
              />
              <color-order-input
                v-model="data.pan.levels"
                hide-details
                :gym-level="data.pan"
                @input="changes = true"
              />
            </div>
            <p
              v-else
              class="text-center text--disabled"
            >
              {{ $t('components.levelAndGrades.climbingTypeDisabled', { gym: gym.name, type: $t(`models.climbs.pan`) }) }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-right mt-4">
      <v-btn
        elevation="0"
        color="primary"
        :loading="saving"
        :disabled="!changes"
        @click="submit()"
      >
        {{ $t('actions.save') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import GradeSystemInput from '~/components/forms/GradeSystemInput'
import GymLevelApi from '~/services/oblyk-api/GymLevelApi'
import LevelRepresentationInput from '~/components/forms/LevelRepresentationInput'
import ColorOrderInput from '~/components/forms/ColorOrderInput'

export default {
  name: 'LevelsForm',
  components: {
    ColorOrderInput,
    LevelRepresentationInput,
    GradeSystemInput
  },
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymLevels: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      saving: false,
      changes: false,
      data: {
        gym_id: this.gym.id,
        sport_climbing: {
          climbing_type: 'sport_climbing',
          enabled: this.gymLevels.sport_climbing.enabled,
          grade_system: this.gymLevels.sport_climbing.grade_system,
          level_representation: this.gymLevels.sport_climbing.level_representation,
          levels: this.gymLevels.sport_climbing.levels
        },
        bouldering: {
          climbing_type: 'bouldering',
          enabled: this.gymLevels.bouldering.enabled,
          grade_system: this.gymLevels.bouldering.grade_system,
          level_representation: this.gymLevels.bouldering.level_representation,
          levels: this.gymLevels.bouldering.levels
        },
        pan: {
          climbing_type: 'pan',
          enabled: this.gymLevels.pan.enabled,
          grade_system: this.gymLevels.pan.grade_system,
          level_representation: this.gymLevels.pan.level_representation,
          levels: this.gymLevels.pan.levels
        }
      }
    }
  },

  methods: {
    submit () {
      this.saving = true
      new GymLevelApi(this.$axios, this.$auth)
        .updateAll(this.data)
        .finally(() => {
          this.saving = false
          this.changes = false
        })
    }
  }
}
</script>
