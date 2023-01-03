<template>
  <div>
    <spinner v-if="loadingGymGrade" :full-height="false" />

    <v-form
      v-if="!loadingGymGrade"
      @submit.prevent="submit()"
    >
      <!-- Choose pre-recorded difficulty -->
      <v-select
        v-if="gymGrade.need_grade_line"
        v-model="data.gym_grade_line_id"
        :items="gymGradeLines"
        item-text="text"
        item-value="value"
        :label="$t('models.gymRoute.gym_grade_line_id')"
        outlined
        required
        @change="onChangeDifficulty()"
      />

      <!-- Route name -->
      <v-text-field
        v-model="data.name"
        outlined
        hide-details
        :class="cragRoute.name ? 'mb-0' : 'mb-8'"
        :label="$t('models.gymRoute.name')"
      >
        <template #append-outer>
          <v-tooltip
            bottom
          >
            <template #activator="{ on }">
              <v-btn
                class="mt-n2"
                icon
                :loading="findingRandomName"
                @click="findRandomRoute"
              >
                <v-icon v-on="on">
                  {{ mdiShuffleVariant }}
                </v-icon>
              </v-btn>
            </template>
            {{ $t('components.gymRoute.findRandomName') }}
          </v-tooltip>
        </template>
      </v-text-field>

      <!-- Random crag route name and information -->
      <p
        v-if="cragRoute.name"
        class="mb-4 mt-1"
      >
        {{ $t('components.gymRoute.refTo') }} :
        <u>{{ cragRoute.name }} {{ cragRoute.grade_to_s }}</u>,
        <nuxt-link class="mr-1" :to="cragRoute.Crag.path" target="_blank">
          {{ cragRoute.Crag.name }}
        </nuxt-link>
        <cite>({{ cragRoute.Crag.city }})</cite>
      </p>

      <!-- Openers -->
      <v-text-field
        v-model="data.openers"
        outlined
        :label="$t('models.gymRoute.openers')"
      />

      <!-- Open at -->
      <date-picker-input
        v-model="data.opened_at"
        :label="$t('models.gymRoute.opened_at')"
      />

      <!-- Tags -->
      <div v-if="!multiPitch">
        <tags-input
          v-for="(value, index) in data.sections"
          :key="index"
          v-model="value.tags"
          :label="multiPitch ? $t('models.gymRoute.tags_by_section', { index: index + 1 }) : $t('models.gymRoute.tags')"
        />
      </div>

      <!-- Description -->
      <markdown-input
        v-model="data.description"
        :label="$t('models.gymRoute.description')"
      />

      <p class="subtitle-2">
        <span @click="showAutomaticParameters = !showAutomaticParameters">
          <v-icon left>
            {{ showAutomaticParameters ? mdiChevronDown : mdiChevronRight }}
          </v-icon>
          {{ $t('components.gymRoute.automaticParameters') }}
        </span>
      </p>

      <div v-show="showAutomaticParameters">
        <!-- Multi pitch route if sector accept this -->
        <v-checkbox
          v-show="(gymSector.can_be_more_than_one_pitch)"
          v-model="multiPitch"
          :label="$t('components.gymRoute.multiPitchRoute')"
        />

        <!-- Points if fix -->
        <v-text-field
          v-if="(gymGrade.point_system_type === 'fix')"
          v-model="data.points"
          outlined
          type="number"
          :required="(gymGrade.point_system_type === 'fix')"
          :label="$t('models.gymRoute.points')"
        />

        <!-- Grade + (height and tags by pitch in multi pitches) -->
        <div
          v-for="(section, sectionIndex) in data.sections"
          :key="`section-index-${sectionIndex}`"
          class="row"
        >
          <!-- If route use grade like 7a, 6b, etc. -->
          <div v-show="(gymGrade.difficulty_by_grade)" class="col">
            <v-text-field
              v-model="section.grade"
              outlined
              hide-details
              :required="(gymGrade.difficulty_by_grade)"
              :label="multiPitch ? $t('models.gymRoute.grade_by_section', { index: sectionIndex + 1 }) : $t('models.gymRoute.grade')"
            />
          </div>

          <!-- height by section if more than one pitch -->
          <div v-if="multiPitch" class="col">
            <v-text-field
              v-model="section.height"
              outlined
              hide-details
              type="number"
              :label="$t('models.gymRoute.height_by_section', { index: sectionIndex + 1 })"
            />
          </div>

          <!-- Tags by section if more than one pitch -->
          <div v-if="multiPitch" class="col">
            <tags-input
              v-model="section.tags"
              hide-details
              :label="$t('models.gymRoute.tags_by_section', { index: sectionIndex + 1 })"
            />
          </div>
        </div>

        <!-- Button for add pitch-->
        <div
          v-if="multiPitch"
          class="text-right mt-1"
        >
          <v-btn
            v-if="data.sections.length > 1"
            icon
            text
            class="mr-3"
            :title="$t('components.gymRoute.removePitch')"
            @click="removePitch()"
          >
            <v-icon>
              {{ mdiMinus }}
            </v-icon>
          </v-btn>

          <v-btn
            icon
            :title="$t('components.gymRoute.addPitch')"
            text
            outlined
            color="primary"
            @click="addPitch()"
          >
            <v-icon>
              {{ mdiPlus }}
            </v-icon>
          </v-btn>
        </div>

        <!-- Tag and holds color -->
        <div class="mt-5">
          <!-- Tag colors -->
          <color-input
            v-show="gymGrade.tag_color || (data.tag_colors && data.tag_colors.length > 0)"
            v-model="data.tag_colors"
            label="Couleurs des étiquettes"
            icon="Bookmark"
            :multiple="true"
            :colors-limit="2"
          />

          <!-- Hold colors -->
          <color-input
            v-show="gymGrade.hold_color || (data.hold_colors && data.hold_colors.length > 0)"
            v-model="data.hold_colors"
            label="Couleurs des prises"
            icon="Circle"
            :multiple="true"
            :colors-limit="2"
          />
        </div>
      </div>

      <!-- Params form sector (height and climbing type) -->
      <p class="subtitle-2">
        <span @click="showResultingParameters = !showResultingParameters">
          <v-icon left>
            {{ showResultingParameters ? mdiChevronDown : mdiChevronRight }}
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
        />

        <!-- Height -->
        <v-text-field
          v-model="data.height"
          outlined
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
          v-if="!isEditingForm()"
          color="primary"
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
import {
  mdiShuffleVariant,
  mdiChevronDown,
  mdiChevronRight,
  mdiPlus,
  mdiMinus,
  mdiBookmarkMultipleOutline,
  mdiChartBubble
} from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import { HoldColorsHelpers } from '@/mixins/HoldColorsHelpers'
import CloseForm from '@/components/forms/CloseForm'
import SubmitForm from '@/components/forms/SubmitForm'
import Spinner from '@/components/layouts/Spiner'
import GymGradeApi from '~/services/oblyk-api/GymGradeApi'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymGrade from '@/models/GymGrade'
import ColorInput from '@/components/forms/ColorInput'
import GymRoute from '@/models/GymRoute'
import DatePickerInput from '@/components/forms/DatePickerInput'
import { DateHelpers } from '@/mixins/DateHelpers'
import TagsInput from '@/components/forms/TagsInput'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '@/models/CragRoute'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'GymRouteForm',
  components: {
    MarkdownInput,
    TagsInput,
    DatePickerInput,
    ColorInput,
    Spinner,
    SubmitForm,
    CloseForm
  },
  mixins: [FormHelpers, HoldColorsHelpers, DateHelpers],
  props: {
    gymSector: {
      type: Object,
      default: null
    },
    gymRoute: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      findingRandomName: false,
      cragRoute: {},
      redirectTo: null,
      nextAction: 'goToSpace',
      multiPitch: false,
      showAutomaticParameters: true,
      showResultingParameters: false,
      loadingGymGrade: true,
      data: {
        id: this.gymRoute?.id,
        name: this.gymRoute?.name,
        openers: this.gymRoute?.openers,
        description: this.gymRoute?.description,
        height: this.gymRoute?.height || this.gymSector.height,
        points: this.gymRoute?.points,
        grade: this.gymRoute?.grade,
        tag_colors: this.gymRoute?.tag_colors || [],
        hold_colors: this.gymRoute?.hold_colors || [],
        opened_at: this.gymRoute?.opened_at || this.today().format('YYYY-MM-DD'),
        climbing_type: this.gymRoute?.climbing_type || this.gymSector.climbing_type,
        gym_grade_line_id: this.gymRoute?.gym_grade_line_id,
        gym_space_id: this.gymSector.gym_space.id,
        gym_sector_id: this.gymSector.id,
        gym_id: this.gymSector.gym.id,
        sections: this.gymRoute?.sections || [{ grade: null, height: null, tags: [] }]
      },
      climbingGymList: [
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' },
        { text: this.$t('models.climbs.pan'), value: 'pan' }
      ],
      gymGradeLines: [],
      gymGrade: null,

      mdiShuffleVariant,
      mdiChevronDown,
      mdiChevronRight,
      mdiPlus,
      mdiMinus,
      mdiBookmarkMultipleOutline,
      mdiChartBubble
    }
  },

  mounted () {
    this.getGymGrade()
    this.multiPitch = this.data.sections.length > 1
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submitAndThenPicture () {
      this.nextAction = 'picture'
      this.submit()
    },

    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymRouteApi(this.$axios, this.$auth).update(this.data) : new GymRouteApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const gymRoute = new GymRoute({ attributes: resp.data })
          if (this.redirectTo) {
            this.$router.push(this.redirectTo)
          } else if (this.nextAction === 'picture') {
            this.$router.push(`${gymRoute.path}/picture`)
          } else {
            this.$router.push(`${gymRoute.gymSpacePath}?route=${gymRoute.id}`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    findRandomRoute () {
      this.findingRandomName = true
      new CragRouteApi(this.$axios, this.$auth)
        .random()
        .then((resp) => {
          this.cragRoute = new CragRoute({ attributes: resp.data })
          this.data.name = this.cragRoute.name
        })
        .finally(() => {
          this.findingRandomName = false
        })
    },

    addPitch () {
      this.data.sections.push({ grade: null, height: null })
    },

    removePitch () {
      this.data.sections.pop()
    },

    onChangeDifficulty () {
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

      const colors = selectedGradeLine.colors
      if (this.gymGrade.hold_color) {
        this.data.hold_colors = colors.map((color) => { return color })
      }
      if (this.gymGrade.tag_color) {
        this.data.tag_colors = colors.map((color) => { return color })
      }
    },

    getGymGrade () {
      new GymGradeApi(this.$axios, this.$auth)
        .find(
          this.gymSector.gym.id,
          this.gymSector.gym_grade_id
        )
        .then((resp) => {
          this.gymGrade = new GymGrade({ attributes: resp.data })
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
