<template>
  <div>
    <div>
      <!-- SPORT CLIMBING -->
      <div class="mb-2">
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
          <v-card-text class="pt-3">
            <v-row v-if="data.sport_climbing.enabled">
              <v-col cols="12" md="4">
                <grade-system-input
                  v-model="data.sport_climbing.grade_system"
                  @input="changes = true"
                />
                <level-representation-input
                  v-model="data.sport_climbing.level_representation"
                  @input="changes = true"
                />
              </v-col>
              <v-col cols="12" md="4">
                <color-order-input
                  v-model="data.sport_climbing.levels"
                  hide-details
                  :gym-level="data.sport_climbing"
                  @input="changes = true"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-checkbox
                  v-model="data.sport_climbing.sub_level_enabled"
                  class="mt-0"
                  label="Activer les sous niveaux pour la voie"
                  @input="changes = true"
                />
                <v-text-field
                  v-if="data.sport_climbing.sub_level_enabled"
                  v-model="data.sport_climbing.sub_level_max"
                  label="Nombre de sous niveau"
                  type="number"
                  outlined
                  persistent-hint
                  hint="Nous conseillons 3 ou 5 niveaux"
                  :rules="[rules.subLevel]"
                  @input="changes = true"
                />
              </v-col>
            </v-row>
            <p
              v-else
              class="text-center text--disabled"
            >
              {{ $t('components.levelAndGrades.climbingTypeDisabled', { gym: gym.name, type: $t(`models.climbs.sport_climbing`) }) }}
            </p>
          </v-card-text>
        </v-card>
      </div>

      <!-- BOULDERING -->
      <div class="mb-2">
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
          <v-card-text class="pt-3">
            <v-row v-if="data.bouldering.enabled">
              <v-col cols="12" md="4">
                <grade-system-input
                  v-model="data.bouldering.grade_system"
                  @input="changes = true"
                />
                <level-representation-input
                  v-model="data.bouldering.level_representation"
                  @input="changes = true"
                />
              </v-col>
              <v-col cols="12" md="4">
                <color-order-input
                  v-model="data.bouldering.levels"
                  hide-details
                  :gym-level="data.bouldering"
                  @input="changes = true"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-checkbox
                  v-model="data.bouldering.sub_level_enabled"
                  class="mt-0"
                  label="Activer les sous niveaux pour le bloc"
                  @input="changes = true"
                />
                <v-text-field
                  v-if="data.bouldering.sub_level_enabled"
                  v-model="data.bouldering.sub_level_max"
                  label="Nombre de sous niveau"
                  type="number"
                  outlined
                  persistent-hint
                  :rules="[rules.subLevel]"
                  hint="Nous conseillons 3 ou 5 niveaux"
                  @input="changes = true"
                />
              </v-col>
            </v-row>
            <p
              v-else
              class="text-center text--disabled"
            >
              {{ $t('components.levelAndGrades.climbingTypeDisabled', { gym: gym.name, type: $t(`models.climbs.bouldering`) }) }}
            </p>
          </v-card-text>
        </v-card>
      </div>

      <!-- PAN -->
      <div class="mb-2">
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
          <v-card-text class="pt-3">
            <v-row v-if="data.pan.enabled">
              <v-col cols="12" md="4">
                <grade-system-input
                  v-model="data.pan.grade_system"
                  @input="changes = true"
                />
                <level-representation-input
                  v-model="data.pan.level_representation"
                  @input="changes = true"
                />
              </v-col>
              <v-col cols="12" md="4">
                <color-order-input
                  v-model="data.pan.levels"
                  hide-details
                  :gym-level="data.pan"
                  @input="changes = true"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-checkbox
                  v-model="data.pan.sub_level_enabled"
                  class="mt-0"
                  label="Activer les sous niveaux pour le pan"
                  @input="changes = true"
                />
                <v-text-field
                  v-if="data.pan.sub_level_enabled"
                  v-model="data.pan.sub_level_max"
                  label="Nombre de sous niveau"
                  type="number"
                  outlined
                  persistent-hint
                  hint="Nous conseillons 3 ou 5 niveaux"
                  :rules="[rules.subLevel]"
                  @input="changes = true"
                />
              </v-col>
            </v-row>
            <p
              v-else
              class="text-center text--disabled"
            >
              {{ $t('components.levelAndGrades.climbingTypeDisabled', { gym: gym.name, type: $t(`models.climbs.pan`) }) }}
            </p>
          </v-card-text>
        </v-card>
      </div>

      <!-- SPRAY WALL -->
      <div class="mb-2">
        <v-card class="full-height">
          <v-card-title class="pb-2 border-bottom">
            <v-checkbox
              v-model="data.spray_wall.enabled"
              class="mr-1 mt-0 pt-0"
              :label="$t(`models.climbs.spray_wall`)"
              hide-details
              @change="changes = true"
            />
          </v-card-title>
          <v-card-text class="pt-3">
            <v-row v-if="data.spray_wall.enabled">
              <v-col cols="12" md="4">
                <grade-system-input
                  v-model="data.spray_wall.grade_system"
                  @input="changes = true"
                />
              </v-col>
              <v-col cols="12" md="4">
                <color-order-input
                  v-model="data.spray_wall.levels"
                  hide-details
                  :gym-level="data.spray_wall"
                  @input="changes = true"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-checkbox
                  v-model="data.spray_wall.sub_level_enabled"
                  class="mt-0"
                  label="Activer les sous niveaux pour le Spray Wall"
                  @input="changes = true"
                />
                <v-text-field
                  v-if="data.spray_wall.sub_level_enabled"
                  v-model="data.spray_wall.sub_level_max"
                  label="Nombre de sous niveau"
                  type="number"
                  outlined
                  persistent-hint
                  hint="Nous conseillons 3 ou 5 niveaux"
                  :rules="[rules.subLevel]"
                  @input="changes = true"
                />
              </v-col>
            </v-row>
            <p
              v-else
              class="text-center text--disabled"
            >
              {{ $t('components.levelAndGrades.climbingTypeDisabled', { gym: gym.name, type: $t(`models.climbs.spray_wall`) }) }}
            </p>
          </v-card-text>
        </v-card>
      </div>
    </div>
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
import LevelRepresentationInput from '~/components/forms/LevelRepresentationInput'
import ColorOrderInput from '~/components/forms/ColorOrderInput'
import OblykApi from '~/services/oblyk-api/OblykApi'

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
          levels: this.gymLevels.sport_climbing.levels,
          sub_level_enabled: this.gymLevels.sport_climbing.sub_level_enabled,
          sub_level_max: this.gymLevels.sport_climbing.sub_level_max
        },
        bouldering: {
          climbing_type: 'bouldering',
          enabled: this.gymLevels.bouldering.enabled,
          grade_system: this.gymLevels.bouldering.grade_system,
          level_representation: this.gymLevels.bouldering.level_representation,
          levels: this.gymLevels.bouldering.levels,
          sub_level_enabled: this.gymLevels.bouldering.sub_level_enabled,
          sub_level_max: this.gymLevels.bouldering.sub_level_max
        },
        pan: {
          climbing_type: 'pan',
          enabled: this.gymLevels.pan.enabled,
          grade_system: this.gymLevels.pan.grade_system,
          level_representation: this.gymLevels.pan.level_representation,
          levels: this.gymLevels.pan.levels,
          sub_level_enabled: this.gymLevels.pan.sub_level_enabled,
          sub_level_max: this.gymLevels.pan.sub_level_max
        },
        spray_wall: {
          climbing_type: 'spray_wall',
          enabled: this.gymLevels.spray_wall.enabled,
          grade_system: this.gymLevels.spray_wall.grade_system,
          level_representation: this.gymLevels.spray_wall.level_representation,
          levels: this.gymLevels.spray_wall.levels,
          sub_level_enabled: this.gymLevels.spray_wall.sub_level_enabled,
          sub_level_max: this.gymLevels.spray_wall.sub_level_max
        }
      },

      rules: {
        subLevel: value => (value >= 1 && value <= 5) || 'Doit être compris entre 1 et 5'
      }
    }
  },

  methods: {
    submit () {
      this.saving = true
      new OblykApi(this.$axios, this.$auth)
        .put(`/gyms/${this.data.gym_id}/gym_levels/update_all`, { gym_levels: this.data })
        .finally(() => {
          this.saving = false
          this.changes = false
        })
    }
  }
}
</script>
