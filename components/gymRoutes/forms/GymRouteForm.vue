<template>
  <div>
    <spinner v-if="loadingLevels" :full-height="false" />

    <v-form
      v-if="!loadingLevels"
      @submit.prevent="submit()"
    >
      <!-- Difficulty preset -->
      <gym-route-level-input
        v-model="data.level_index"
        :levels="gymLevels[data.climbing_type]"
        :icon="mdiOrderBoolDescending"
        :change-callback="onChangeLevelPreset"
      />

      <!-- Route name -->
      <v-row :class="cragRoute.name ? 'mb-0' : 'mb-4'">
        <v-col
          v-if="gymSector.anchor"
          cols="3"
        >
          <v-text-field
            v-model="data.anchor_number"
            outlined
            type="number"
            hide-details
            :label="$t('models.gymRoute.anchor_number')"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-model="data.name"
            outlined
            hide-details
            :prepend-inner-icon="mdiFormatLetterCase"
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
        </v-col>
      </v-row>

      <!-- Random crag route name and information -->
      <p
        v-if="cragRoute.name"
        class="mb-5"
      >
        {{ $t('components.gymRoute.refTo') }} :
        <u>{{ cragRoute.name }} {{ cragRoute.grade_to_s }}</u>,
        <nuxt-link class="mr-1" :to="cragRoute.Crag.path" target="_blank">
          {{ cragRoute.Crag.name }}
        </nuxt-link>
        <cite>({{ cragRoute.Crag.city }})</cite>
      </p>

      <!-- Anchors number suggestion -->
      <div
        v-if="gymSector.anchor && gymSector.anchor_ranges !== null && gymSector.anchor_ranges.length > 1"
        class="mt-n4 mb-4"
      >
        <v-icon color="amber">
          {{ mdiCreation }}
        </v-icon>
        {{ $t('models.cragRoute.anchor') }} :
        <v-chip
          v-for="(anchorNumber, anchorIndex) in gymSector.anchor_ranges"
          :key="`anchor-index-${anchorIndex}`"
          outlined
          class="vertical-align-middle"
          @click="data.anchor_number = anchorNumber"
        >
          {{ $t('models.cragRoute.anchor') }} n°{{ anchorNumber }}
        </v-chip>
      </div>

      <div>
        <!-- Multi pitch route if sector accept this -->
        <v-checkbox
          v-show="(gymSector.can_be_more_than_one_pitch)"
          v-model="multiPitch"
          :label="$t('components.gymRoute.multiPitchRoute')"
        />

        <!-- Grade + (height and tags by pitch in multi pitches) -->
        <v-row
          v-for="(section, sectionIndex) in data.sections"
          :key="`section-index-${sectionIndex}`"
        >
          <!-- If route use grade like 7a, 6b, etc. -->
          <v-col v-show="(gymLevels[data.climbing_type].grade_system !== null)">
            <v-text-field
              v-model="section.grade"
              outlined
              hide-details
              :prepend-inner-icon="mdiExponent"
              :required="gymLevels[data.climbing_type].grade_system !== null"
              :label="multiPitch ? $t('models.gymRoute.grade_by_section', { index: sectionIndex + 1 }) : $t('models.gymRoute.grade')"
            />
            <p
              v-if="gradeSuggestions.length > 0"
              class="mb-1 mt-1"
            >
              <v-icon color="amber">
                {{ mdiCreation }}
              </v-icon>
              {{ $t('models.gymRoute.grade') }} :
              <v-chip
                v-for="(gradeSuggestion, gradeSuggestionIndex) in gradeSuggestions"
                :key="`grade-suggestion-index-${gradeSuggestionIndex}`"
                outlined
                @click="section.grade = gradeSuggestion"
              >
                {{ gradeSuggestion }}
              </v-chip>
            </p>
          </v-col>

          <!-- height by section if more than one pitch -->
          <v-col v-if="multiPitch" cols="4">
            <v-text-field
              v-model="section.height"
              outlined
              hide-details
              type="number"
              :prepend-inner-icon="mdiArrowExpandVertical"
              :label="$t('models.gymRoute.height_by_section', { index: sectionIndex + 1 })"
            />
          </v-col>

          <!-- Tags by section if more than one pitch -->
          <v-col v-if="multiPitch" cols="12">
            <indoor-climbing-styles-input
              v-model="section.styles"
              :gym="gymSector.gym"
              :climbing-type="data.climbing_type"
              :icon="mdiPaletteSwatchOutline"
              :label="$t('models.gymRoute.styles_by_section', { index: sectionIndex + 1 })"
            />
          </v-col>
        </v-row>

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
            v-show="['tag', 'hold_and_tag'].includes(gymLevels[data.climbing_type].level_representation)"
            v-model="data.tag_colors"
            :label="$t('models.gymRoute.tag_colors')"
            icon="Bookmark"
            :multiple="true"
            :colors-limit="2"
            :prepend-inner-icon="mdiTag"
          />

          <!-- Hold colors -->
          <color-input
            v-show="['hold', 'hold_and_tag'].includes(gymLevels[data.climbing_type].level_representation)"
            v-model="data.hold_colors"
            :label="$t('models.gymRoute.hold_colors')"
            icon="Circle"
            :multiple="true"
            :prepend-inner-icon="mdiChartBubble"
            :colors-limit="2"
          />
        </div>
      </div>

      <!-- Openers -->
      <gym-opener-input
        v-model="data.gym_opener_ids"
        :gym="gymSector.gym"
        :icon="mdiScrewdriver"
        :with-deactivated-opener="isEditingForm()"
      />

      <!-- Tags -->
      <div v-if="!multiPitch">
        <indoor-climbing-styles-input
          v-for="(value, index) in data.sections"
          :key="`style-index-${index}`"
          v-model="value.styles"
          :gym="gymSector.gym"
          :climbing-type="data.climbing_type"
          :icon="mdiPaletteSwatchOutline"
          :label="multiPitch ? $t('models.gymRoute.styles_by_section', { index: index + 1 }) : $t('models.gymRoute.styles')"
        />
      </div>

      <!-- Description -->
      <markdown-input
        v-model="data.description"
        :label="$t('models.gymRoute.description')"
      />

      <!-- Open at -->
      <date-picker-menu-input
        v-model="data.opened_at"
        :icon="mdiCalendarToday"
        :label="$t('models.gymRoute.opened_at')"
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

      <!-- Points -->
      <v-checkbox
        v-model="showPoint"
        :label="$t('models.gymRoute.fixedPoints')"
        class="mt-n2"
        @change="changePoint"
      />
      <v-text-field
        v-if="showPoint"
        v-model="data.points"
        outlined
        type="number"
        suffix="points"
        :label="$t('models.gymRoute.points')"
      />

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
            <v-list-item>
              <v-list-item-avatar>
                <gym-route-tag-and-hold :gym-route="newGymRoute" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  {{ pictureStep === 'main' ? $t('components.gymRoute.mainPicture') : $t('components.gymRoute.thumbnailPicture') }}
                </v-list-item-title>
                <v-list-item-subtitle style="white-space: normal">
                  {{ pictureStep === 'main' ? $t('components.gymRoute.mainPictureExplain') : $t('components.gymRoute.thumbnailPictureExplain') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <div
              v-if="newGymRoute"
              class="pa-4"
            >
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
  mdiChartBubble,
  mdiCameraPlus,
  mdiArrowLeft,
  mdiArrowRightBoldBoxOutline,
  mdiSourceBranchPlus,
  mdiCreation,
  mdiOrderBoolDescending,
  mdiFormatLetterCase,
  mdiExponent,
  mdiArrowExpandVertical,
  mdiPaletteSwatchOutline,
  mdiTag,
  mdiScrewdriver,
  mdiCalendarToday
} from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import { HoldColorsHelpers } from '@/mixins/HoldColorsHelpers'
import { DateHelpers } from '@/mixins/DateHelpers'
import Spinner from '@/components/layouts/Spiner'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import ColorInput from '@/components/forms/ColorInput'
import GymRoute from '@/models/GymRoute'
import CragRouteApi from '~/services/oblyk-api/CragRouteApi'
import CragRoute from '@/models/CragRoute'
import MarkdownInput from '@/components/forms/MarkdownInput'
import GymOpenerInput from '~/components/forms/GymOpenerInput'
import DatePickerMenuInput from '~/components/forms/DatePickerMenuInput.vue'
import IndoorClimbingStylesInput from '~/components/forms/IndoorClimbingStyleInput.vue'
import GymRouteTagAndHold from '~/components/gymRoutes/partial/GymRouteTagAndHold.vue'
import GymLevelApi from '~/services/oblyk-api/GymLevelApi'
import GymLevel from '~/models/GymLevel'
import GymRouteLevelInput from '~/components/forms/GymRouteLevelInput.vue'
import { GradeMixin } from '~/mixins/GradeMixin'
const GymRouteThumbnailForm = () => import('~/components/gymRoutes/forms/GymRouteThumbnailForm.vue')
const GymRoutePictureForm = () => import('~/components/gymRoutes/forms/GymRoutePictureForm.vue')

export default {
  name: 'GymRouteForm',
  components: {
    GymRouteLevelInput,
    GymRouteTagAndHold,
    IndoorClimbingStylesInput,
    GymRouteThumbnailForm,
    GymRoutePictureForm,
    DatePickerMenuInput,
    GymOpenerInput,
    MarkdownInput,
    ColorInput,
    Spinner
  },
  mixins: [FormHelpers, HoldColorsHelpers, DateHelpers, GradeMixin],
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
      showResultingParameters: false,
      loadingLevels: true,
      loadingSimilarSector: true,
      similarSectors: [],
      afterAddDialog: false,
      addingRoute: false,
      pictureDialog: false,
      newGymRoute: null,
      pictureStep: 'main',
      hidePictureBtn: false,
      showPoint: this.gymRoute?.points,
      data: {
        id: this.gymRoute?.id,
        name: this.gymRoute?.name,
        gym_opener_ids: this.gymRoute?.gym_opener_ids || [],
        description: this.gymRoute?.description,
        height: this.gymRoute?.height || this.gymSector.height,
        points: this.gymRoute?.points || null,
        grade: this.gymRoute?.grade,
        level_index: this.gymRoute?.level_index,
        level_color: this.gymRoute?.level_color,
        level_length: this.gymRoute?.level_length,
        tag_colors: this.gymRoute?.tag_colors || [],
        hold_colors: this.gymRoute?.hold_colors || [],
        opened_at: this.gymRoute?.opened_at || this.ISODateToday(),
        climbing_type: this.gymRoute?.climbing_type || this.gymSector.climbing_type || 'sport_climbing',
        anchor_number: this.gymRoute?.anchor_number,
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
      gymLevels: {
        sport_climbing: null,
        bouldering: null,
        pan: null
      },
      gradeSuggestions: [],

      mdiShuffleVariant,
      mdiChevronDown,
      mdiChevronRight,
      mdiPlus,
      mdiMinus,
      mdiChartBubble,
      mdiCameraPlus,
      mdiArrowLeft,
      mdiArrowRightBoldBoxOutline,
      mdiSourceBranchPlus,
      mdiCreation,
      mdiOrderBoolDescending,
      mdiFormatLetterCase,
      mdiExponent,
      mdiArrowExpandVertical,
      mdiPaletteSwatchOutline,
      mdiTag,
      mdiScrewdriver,
      mdiCalendarToday
    }
  },

  mounted () {
    this.getGymLevels()
    this.multiPitch = this.data.sections.length > 1
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')

    // Set gym sector id
    this.data.gym_sector_id ||= this.gymSector.id
    if (this.isEditingForm()) {
      this.getSimilarSectors()
    } else if (this.gymSector.anchor && this.gymSector.anchor_ranges?.length === 1) {
      this.data.anchor_number = this.gymSector.anchor_ranges[0]
    }
  },

  methods: {
    submit () {
      this.addingRoute = true
      const promise = (this.isEditingForm()) ? new GymRouteApi(this.$axios, this.$auth).update(this.data) : new GymRouteApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          this.newGymRoute = new GymRoute({ attributes: resp.data })
          if (this.isEditingForm()) {
            this.$localforage.gymRoutes.removeItem(this.data.id)
          }
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

    onChangeLevelPreset (level) {
      const gymLevel = this.gymLevels[this.data.climbing_type]
      this.gradeSuggestions = []
      if (['hold_and_tag', 'hold'].includes(gymLevel.level_representation)) {
        this.data.hold_colors = [level.color]
      }
      if (['hold_and_tag', 'tag'].includes(gymLevel.level_representation)) {
        this.data.tag_colors = [level.color]
      }
      if (gymLevel.grade_system !== null && level.average_grade) {
        for (let suggestionGrad = level.average_grade - 2; suggestionGrad <= level.average_grade + 2; suggestionGrad++) {
          this.gradeSuggestions.push(this.gradeValueToText(suggestionGrad))
        }
      }
      this.data.level_color = level.color
      this.data.level_lenght = gymLevel.levels.length
      if (this.submitMethode === 'post') {
        this.data.points = level.default_point
      }
      this.showPoint = this.data.points !== undefined && this.data.points !== null
    },

    getGymLevels () {
      this.loadingLevels = true
      new GymLevelApi(this.$axios, this.$auth)
        .all(
          this.gymSector.gym.id,
          {
            average_for_sector_id: this.gymSector.id
          }
        )
        .then((resp) => {
          this.gymLevels = {
            sport_climbing: null,
            bouldering: null,
            pan: null
          }
          for (const level of resp.data) {
            this.gymLevels[level.climbing_type] = new GymLevel({ attributes: level })
          }
        }).finally(() => {
          this.loadingLevels = false
        })
    },

    changePoint () {
      if (this.showPoint === false) {
        this.data.points = null
      }
    }
  }
}
</script>
