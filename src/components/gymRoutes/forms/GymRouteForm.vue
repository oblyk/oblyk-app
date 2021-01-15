<template>
  <div>
    <spinner v-if="loadingGymGrade" :full-height="false" />

    <v-form
      v-if="!loadingGymGrade"
      @submit.prevent="submit()"
    >
      <v-select
        v-model="data.gym_grade_line_id"
        :items="gymGradeLines"
        item-text="text"
        item-value="value"
        :label="$t('models.gymRoute.gym_grade_line_id')"
        @change="onChangeDifficulty()"
        outlined
        required
      ></v-select>

      <v-text-field
        outlined
        v-model="data.name"
        :label="$t('models.gymRoute.name')"
      />

      <v-text-field
        outlined
        v-model="data.openers"
        :label="$t('models.gymRoute.openers')"
      />

      <p class="subtitle-2">
        <span @click="showAutomaticParameters = !showAutomaticParameters">
          <v-icon left>
            {{ showAutomaticParameters ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
          </v-icon>
          {{  $t('components.gymRoute.automaticParameters') }}
        </span>
      </p>

      <div v-show="showAutomaticParameters">
        <v-checkbox
          v-model="multiPitch"
          v-show="(gymSector.can_be_more_than_one_pitch)"
          :label="$t('components.gymRoute.multiPitchRoute')"
        />

        <!-- Points -->
        <v-text-field
          outlined
          v-if="(gymGrade.use_point_system)"
          type="number"
          :required="(gymGrade.use_point_system)"
          v-model="data.points"
          :label="$t('models.gymRoute.points')"
        />

        <!-- Tags -->
        <div v-if="!gymGrade.use_grade_system">
          <tags-input
            v-for="(value, index) in data.sections"
            :key="index"
            v-model="value.tags"
            :label="multiPitch ? $t('models.gymRoute.tags_by_section', { index: index + 1 }) : $t('models.gymRoute.tags')"
          />
        </div>

        <div class="row" v-show="(gymGrade.use_grade_system)">
          <!-- Grade by section -->
          <div class="col-sm-3">
            <v-text-field
              outlined
              :required="(gymGrade.use_grade_system)"
              v-for="(value, index) in data.sections"
              :key="index"
              v-model="value.grade"
              :label="multiPitch ? $t('models.gymRoute.grade_by_section', { index: index + 1 }) : $t('models.gymRoute.grade')"
            />
          </div>

          <!-- height by section if more than one pitch -->
          <div class="col-sm-3" v-if="multiPitch && data.sections.length > 1">
            <v-text-field
              outlined
              type="number"
              v-for="(value, index) in data.sections"
              :key="index"
              v-model="value.height"
              :label="$t('models.gymRoute.height_by_section', { index: index + 1 })"
            />
          </div>

          <!-- Tags by section if more than one pitch -->
          <div class="col">
            <tags-input
              v-for="(value, index) in data.sections"
              :key="index"
              v-model="value.tags"
              :label="multiPitch ? $t('models.gymRoute.tags_by_section', { index: index + 1 }) : $t('models.gymRoute.tags')"
            />
          </div>
        </div>

        <div
          class="text-right add-pitch-to-route"
          v-if="multiPitch"
        >
          <v-btn
            v-if="data.sections.length > 1"
            icon
            :title="$t('components.gymRoute.removePitch')"
            small
            @click="removePitch()"
          >
            <v-icon>
              mdi-minus
            </v-icon>
          </v-btn>

          <v-btn
            icon
            :title="$t('components.gymRoute.addPitch')"
            small
            @click="addPitch()"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </div>

        <!-- Tag colors -->
        <color-input
          v-model="data.tag_colors"
          v-show="(gymGrade.needTagColor)"
          label="Couleurs des etiquettes"
          icon="mdi-bookmark-multiple-outline"
        />

        <!-- Hold colors -->
        <color-input
          v-model="data.hold_colors"
          v-show="(gymGrade.needHoldColor)"
          label="Couleurs des prises"
          icon="mdi-chart-bubble"
        />

        <!-- Open at -->
        <date-picker-input
          :label="$t('models.gymRoute.opened_at')"
          v-model="data.opened_at"
        />
      </div>

      <p class="subtitle-2">
        <span @click="showResultingParameters = !showResultingParameters">
          <v-icon left>
            {{ showResultingParameters ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
          </v-icon>
          {{ $t('components.gymRoute.resultingParametersOf', { name: gymSector.name }) }}
        </span>
      </p>
      <div v-show="showResultingParameters">

        <!-- Climbing Type -->
        <v-select
          v-model="data.climbing_type"
          :items="climbingGymList"
          item-text="text"
          item-value="value"
          :label="$t('models.gymRoute.climbing_type')"
          outlined
          required
        ></v-select>

        <!-- Height -->
        <v-text-field
          outlined
          v-model="data.height"
          type="number"
          min="0"
          :label="multiPitch ? $t('models.gymRoute.height_total') : $t('models.gymRoute.height')"
          required
        />
      </div>

      <close-form />
      <submit-form
        :overlay="submitOverlay"
        :submit-local-key="submitText()"
      >
        <v-btn
          color="primary"
          v-if="!isEditingForm()"
          class="float-right mr-2"
          @click="submitAndThenPicture()"
        >
          {{ $t('actions.createAndPicture') }}
        </v-btn>
      </submit-form>
    </v-form>
  </div>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { HoldColorsHelpers } from '@/mixins/HoldColorsHelpers'
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import Spinner from '@/components/layouts/Spiner'
import GymGradeApi from '@/services/oblyk-api/GymGradeApi'
import GymRouteApi from '@/services/oblyk-api/GymRouteApi'
import GymGrade from '@/models/GymGrade'
import ColorInput from '@/components/forms/ColorInput'
import GymRoute from '@/models/GymRoute'
import DatePickerInput from '@/components/forms/DatePickerInput'
import { DateHelpers } from '@/mixins/DateHelpers'
import TagsInput from '@/components/forms/TagsInput'

export default {
  name: 'GymRouteForm',
  components: { TagsInput, DatePickerInput, ColorInput, Spinner, SubmitForm, CloseForm },
  mixins: [FormHelpers, HoldColorsHelpers, DateHelpers],
  props: {
    gymSector: Object,
    gymRoute: {
      type: Object,
      required: false
    }
  },

  data () {
    return {
      nextAction: 'goToSpace',
      multiPitch: false,
      showAutomaticParameters: true,
      showResultingParameters: false,
      loadingGymGrade: true,
      data: {
        id: (this.gymRoute || {}).id,
        name: (this.gymRoute || {}).name,
        openers: (this.gymRoute || {}).openers,
        height: (this.gymRoute || {}).height || this.gymSector.height,
        points: (this.gymRoute || {}).points,
        grade: (this.gymRoute || {}).grade,
        tag_colors: (this.gymRoute || {}).tag_colors,
        hold_colors: (this.gymRoute || {}).hold_colors,
        opened_at: (this.gymRoute || {}).opened_at || this.today().format('YYYY-MM-DD'),
        climbing_type: (this.gymRoute || {}).climbing_type || this.gymSector.climbing_type,
        gym_grade_line_id: (this.gymRoute || {}).gym_grade_line_id,
        gym_space_id: this.gymSector.gym_space.id,
        gym_sector_id: this.gymSector.id,
        gym_id: this.gymSector.gym.id,
        sections: (this.gymRoute || {}).sections || [{ grade: null, height: null, tags: [] }]
      },
      climbingGymList: [
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.pan'), value: 'pan' }
      ],
      gymGradeLines: [],
      gymGrade: null
    }
  },

  created () {
    this.getGymGrade()
    this.multiPitch = this.data.sections.length > 1
  },

  methods: {
    submitAndThenPicture: function () {
      this.nextAction = 'picture'
      this.submit()
    },

    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? GymRouteApi.update(this.data) : GymRouteApi.create(this.data)

      promise
        .then(resp => {
          const gymRoute = new GymRoute(resp.data)
          if (this.nextAction === 'picture') {
            this.$router.push(gymRoute.path('picture'))
          } else {
            this.$router.push(gymRoute.gymSpacePath())
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    addPitch: function () {
      this.data.sections.push({ grade: null, height: null })
    },

    removePitch: function () {
      this.data.sections.pop()
    },

    onChangeDifficulty: function () {
      let selectedGradeLine = null
      for (const gradeLine of this.gymGrade.gradeLines) {
        if (gradeLine.id === this.data.gym_grade_line_id) {
          selectedGradeLine = gradeLine
        }
      }
      this.data.points = selectedGradeLine.points
      for (const section of this.data.sections) {
        section.grade = selectedGradeLine.grade_text
      }
      this.data.hold_colors = selectedGradeLine.colors
      this.data.tag_colors = selectedGradeLine.colors
    },

    getGymGrade: function () {
      GymGradeApi
        .find(
          this.gymSector.gym.id,
          this.gymSector.gym_grade_id
        )
        .then(resp => {
          this.gymGrade = new GymGrade(resp.data)
          for (const gradeLine of this.gymGrade.gradeLines) {
            this.gymGradeLines.push(
              {
                text: `${gradeLine.name} ${gradeLine.gradeValue}`,
                value: gradeLine.id
              }
            )
          }
        }).finally(() => {
          this.loadingGymGrade = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.add-pitch-to-route {
  margin-top: -25px;
  margin-bottom: 1em;
}
</style>
