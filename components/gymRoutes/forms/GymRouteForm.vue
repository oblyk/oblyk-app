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
        :menu-props="{ maxHeight: 500 }"
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
                tabindex="-1"
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
      <gym-opener-input
        v-model="data.gym_opener_ids"
        :gym="gymSector.gym"
        :with-deactivated-opener="isEditingForm()"
      />

      <!-- Open at -->
      <date-picker-menu-input
        v-model="data.opened_at"
        :label="$t('models.gymRoute.opened_at')"
      />

      <!-- Tags -->
      <div v-if="!multiPitch">
        <indoor-climbing-styles-input
          v-for="(value, index) in data.sections"
          :key="`style-index-${index}`"
          v-model="value.styles"
          :gym="gymSector.gym"
          :climbing-type="data.climbing_type"
          :label="multiPitch ? $t('models.gymRoute.styles_by_section', { index: index + 1 }) : $t('models.gymRoute.styles')"
        />
      </div>

      <!-- Description -->
      <markdown-input
        v-model="data.description"
        :label="$t('models.gymRoute.description')"
      />

      <!-- Sector -->
      <v-select
        v-if="isEditingForm()"
        v-model="data.gym_sector_id"
        :items="similarSectors"
        item-text="name"
        item-value="id"
        :label="$t('models.gymRoute.gym_sector_id')"
        outlined
        required
        :loading="loadingSimilarSector"
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
          suffix="points"
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
            <indoor-climbing-styles-input
              v-model="section.styles"
              :gym="gymSector.gym"
              :climbing-type="data.climbing_type"
              :label="$t('models.gymRoute.styles_by_section', { index: sectionIndex + 1 })"
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
            :label="$t('models.gymRoute.tag_colors')"
            icon="Bookmark"
            :multiple="true"
            :colors-limit="2"
            :disable-all-color="true"
          />

          <!-- Hold colors -->
          <color-input
            v-show="gymGrade.hold_color || (data.hold_colors && data.hold_colors.length > 0)"
            v-model="data.hold_colors"
            :label="$t('models.gymRoute.hold_colors')"
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

      <div>
        <v-btn
          icon
          @click="$router.go(-1)"
        >
          <v-icon>{{ mdiArrowLeft }}</v-icon>
        </v-btn>
        <v-btn
          :loading="addingRoute"
          elevation="0"
          color="primary"
          class="float-right"
          @click="submit"
        >
          {{ $t(submitText()) }}
        </v-btn>
      </div>

      <client-only>
        <!-- After add dialog-->
        <v-dialog
          v-model="afterAddDialog"
          persistent
          width="350"
        >
          <v-card class="pa-4">
            <v-alert
              text
              type="success"
            >
              {{ $t('components.gymRoute.routeAdded') }} !
            </v-alert>
            <div v-if="newGymRoute">
              <p class="text-decoration-underline">
                {{ $t('common.whatDoYouWantToDo') }}
              </p>

              <!-- Go to picture -->
              <v-btn
                v-if="!hidePictureBtn"
                outlined
                large
                text
                block
                color="primary"
                class="mb-3"
                @click="openPictureDialog()"
              >
                <v-icon
                  class="mr-3"
                  left
                >
                  {{ mdiCameraPlus }}
                </v-icon>
                {{ $t('components.gymRoute.takeMainPicture') }}
              </v-btn>

              <!-- New adding -->
              <v-btn
                outlined
                large
                text
                block
                color="primary"
                class="mb-3"
                @click="resetForNewAdd()"
              >
                <v-icon
                  left
                  class="mr-3"
                >
                  {{ mdiSourceBranchPlus }}
                </v-icon>
                {{ $t('components.gymRoute.addNewRoute') }}
              </v-btn>

              <!-- Continuer d'ajouter -->
              <v-btn
                outlined
                large
                text
                block
                :to="newGymRoute.pathInSpace"
              >
                <v-icon
                  left
                  class="mr-3"
                >
                  {{ mdiArrowRightBoldBoxOutline }}
                </v-icon>
                {{ $t('common.goTo', { name: newGymRoute.gym_space.name }) }}
              </v-btn>
            </div>
          </v-card>
        </v-dialog>

        <!-- Picture dialog -->
        <v-dialog
          v-model="pictureDialog"
          persistent
          width="500"
        >
          <v-card
            v-if="newGymRoute"
          >
            <v-card-title>
              {{ pictureStep === 'main' ? $t('components.gymRoute.mainPicture') : $t('components.gymRoute.thumbnailPicture') }}
            </v-card-title>
            <div class="pa-4">
              <gym-route-picture-form
                v-if="pictureStep === 'main'"
                :go-back-btn="false"
                :callback="pictureMainStepCallback"
                :gym-route="newGymRoute"
              />
              <gym-route-thumbnail-form
                v-if="pictureStep === 'thumbnail'"
                :go-back-btn="false"
                :gym-route="newGymRoute"
                :callback="pictureThumbnailStepCallback"
              />
            </div>
          </v-card>
        </v-dialog>
      </client-only>
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
  mdiChartBubble,
  mdiCameraPlus,
  mdiArrowLeft,
  mdiArrowRightBoldBoxOutline,
  mdiSourceBranchPlus
} from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import { HoldColorsHelpers } from '@/mixins/HoldColorsHelpers'
import { DateHelpers } from '@/mixins/DateHelpers'
import Spinner from '@/components/layouts/Spiner'
import GymGradeApi from '~/services/oblyk-api/GymGradeApi'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymGrade from '@/models/GymGrade'
import ColorInput from '@/components/forms/ColorInput'
import GymRoute from '@/models/GymRoute'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '@/models/CragRoute'
import MarkdownInput from '@/components/forms/MarkdownInput'
import GymOpenerInput from '~/components/forms/GymOpenerInput'
import DatePickerMenuInput from '~/components/forms/DatePickerMenuInput.vue'
import IndoorClimbingStylesInput from '~/components/forms/IndoorClimbingStyleInput.vue'
const GymRouteThumbnailForm = () => import('~/components/gymRoutes/forms/GymRouteThumbnailForm.vue')
const GymRoutePictureForm = () => import('~/components/gymRoutes/forms/GymRoutePictureForm.vue')

export default {
  name: 'GymRouteForm',
  components: {
    IndoorClimbingStylesInput,
    GymRouteThumbnailForm,
    GymRoutePictureForm,
    DatePickerMenuInput,
    GymOpenerInput,
    MarkdownInput,
    ColorInput,
    Spinner
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
      loadingSimilarSector: true,
      similarSectors: [],
      afterAddDialog: false,
      addingRoute: false,
      pictureDialog: false,
      newGymRoute: null,
      pictureStep: 'main',
      hidePictureBtn: false,
      data: {
        id: this.gymRoute?.id,
        name: this.gymRoute?.name,
        gym_opener_ids: this.gymRoute?.gym_opener_ids || [],
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
        gym_sector_id: null,
        gym_id: this.gymSector.gym.id,
        sections: this.gymRoute?.sections || [{ grade: null, height: null, styles: [] }]
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
      mdiChartBubble,
      mdiCameraPlus,
      mdiArrowLeft,
      mdiArrowRightBoldBoxOutline,
      mdiSourceBranchPlus
    }
  },

  mounted () {
    this.getGymGrade()
    this.multiPitch = this.data.sections.length > 1
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')

    // Set gym sector id
    this.data.gym_sector_id ||= this.gymSector.id
    if (this.isEditingForm()) {
      this.getSimilarSectors()
    }
  },

  methods: {
    submit () {
      this.addingRoute = true
      const promise = (this.isEditingForm()) ? new GymRouteApi(this.$axios, this.$auth).update(this.data) : new GymRouteApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          this.newGymRoute = new GymRoute({ attributes: resp.data })
          if (this.redirectTo) {
            this.$router.push(this.redirectTo)
          } else if (!this.isEditingForm()) {
            this.afterAddDialog = true
          } else {
            this.$router.push(`${this.newGymRoute.gymSpacePath}?route=${this.newGymRoute.id}`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        }).then(() => {
          this.addingRoute = false
        })
    },

    resetForNewAdd () {
      this.newGymRoute = null
      this.afterAddDialog = false
      this.pictureDialog = false
      this.hidePictureBtn = false
      this.pictureStep = 'main'
      this.data.id = null
      this.data.name = null
      this.data.description = null
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },

    openPictureDialog () {
      this.afterAddDialog = false
      this.pictureDialog = true
    },

    pictureMainStepCallback (gymRoute) {
      this.newGymRoute = gymRoute
      this.pictureStep = 'thumbnail'
    },

    pictureThumbnailStepCallback (gymRoute) {
      this.afterAddDialog = true
      this.pictureDialog = false
      this.newGymRoute = gymRoute
      this.hidePictureBtn = true
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

    getSimilarSectors () {
      this.loadingSimilarSector = true
      new GymRouteApi(this.$axios, this.$auth)
        .similarSectors(this.gymSector.gym.id, this.gymRoute.id)
        .then((resp) => {
          this.similarSectors = resp.data
        })
        .finally(() => {
          this.loadingSimilarSector = false
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
