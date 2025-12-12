<template>
  <div
    v-if="selectedRoutes.length > 0"
    style="position: sticky;"
    :style="$vuetify.breakpoint.mobile ? 'bottom: 70px' : 'bottom: 10px'"
  >
    <v-btn
      color="primary"
      elevation="5"
      block
      large
      @click="openMultiCheckModal()"
    >
      {{ $tc('components.ascentGymRoute.addXAscent', selectedRoutes.length, { count: selectedRoutes.length }) }}
    </v-btn>
    <v-dialog
      v-model="multiCheckModal"
      max-width="500"
      :fullscreen="$vuetify.breakpoint.mobile"
      @close="offMultiSelectionCallback"
    >
      <v-card class="d-flex flex-column">
        <v-card-title class="d-flex px-4 pt-2 pb-0 flex-shrink-0">
          <div>
            {{ $tc('components.ascentGymRoute.addXAscentInLogbook', selectedRoutes.length, { count: selectedRoutes.length }) }}
          </div>
          <v-btn
            icon
            class="ml-auto"
            @click="multiCheckModal = false"
          >
            <v-icon>
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-skeleton-loader
          v-if="loadingAscentForGymRoutes"
          type="list-item-two-line"
        />
        <div
          v-else
          class="flex-grow-1 px-4"
        >
          <p class="subtitle-2 text--disabled mt-n1">
            {{ newOrRepetitionLabel }}
          </p>

          <!-- GLOBAL INFORMATION STEP  -->
          <div v-if="newRouteIds.length > 0 || haveSportClimbing">
            <ascent-status-input
              v-if="newRouteIds.length > 0"
              v-model="ascentStatus"
              :with-project="false"
              :with-sent="false"
              :with-repetition="false"
              label-key="components.input.ascentsStatus"
              @input="setAscentStatusAttributes"
            />
            <roping-status-input
              v-if="haveSportClimbing"
              v-model="ropingStatus"
              :multi-pith-roping-statuses="false"
              @input="setRopingStatusAttributes"
            />
          </div>

          <!-- COMMENT AND EVALUATION STEP  -->
          <div class="mt-2 mb-6">
            <template v-for="(_ascent, gymRouteIndex) in data.ascents">
              <ascent-gym-multi-check-item
                :key="`gym-route-index-${gymRouteIndex}`"
                v-model="data.ascents[gymRouteIndex]"
                :repetition-route-ids="repetitionRouteIds"
                :gym-route="gymRouteByIds[data.ascents[gymRouteIndex].gym_route_id]"
              />
            </template>
            <v-sheet class="back-app-color pa-2 rounded mb-2">
              <p class="mb-0">
                <u class="font-italic">{{ $t('common.legend') }} :</u>
              </p>
              <ul>
                <li>{{ $t('models.hardnessStatus.easy_for_the_grade') }}</li>
                <li>{{ $t('models.hardnessStatus.this_grade_is_accurate') }}</li>
                <li>{{ $t('models.hardnessStatus.sandbagged') }}</li>
              </ul>
            </v-sheet>
          </div>

          <date-picker-input
            v-model="realisedAt"
            required
            :label="$t('components.ascentGymRoute.IMadeThisAscentsAt')"
            @input="setRealisedAtAttributes"
          />

          <div class="pb-4" style="position: sticky; bottom: 0">
            <v-btn
              color="primary"
              large
              elevation="0"
              :loading="loadingSubmitData"
              block
              @click="submit"
            >
              {{ $t('actions.add') }} !
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiClose } from '@mdi/js'
import DatePickerInput from '~/components/forms/DatePickerInput'
import AscentStatusInput from '~/components/forms/AscentStatusInput'
import RopingStatusInput from '~/components/forms/RopingStatusInput'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import AscentGymMultiCheckItem from '~/components/ascentGymRoutes/AscentGymMultiCheckItem'

export default {
  name: 'AscentGymMultiCheckDialog',
  components: {
    AscentGymMultiCheckItem,
    RopingStatusInput,
    AscentStatusInput,
    DatePickerInput
  },
  props: {
    selectedRoutes: {
      type: Array,
      required: true
    },
    offMultiSelectionCallback: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      loadingAscentForGymRoutes: true,
      loadingSubmitData: false,
      newRouteIds: [],
      repetitionRouteIds: [],
      multiCheckModal: false,
      climbingTypes: null,
      currentStep: 'globalInformation',
      gymRoutes: [],
      gymRouteByIds: {},

      realisedAt: new Date().toISOString().substring(0, 10),
      ascentStatus: null,
      ropingStatus: localStorage.getItem('defaultAscentGymRouteRopingStatus') || 'lead_climb',

      data: {
        ascents: []
      },

      mdiClose
    }
  },

  computed: {
    haveSportClimbing () {
      return this.climbingTypes?.sport_climbing && this.climbingTypes?.sport_climbing > 0
    },

    newOrRepetitionLabel () {
      const labels = []
      if (this.newRouteIds.length > 0) {
        labels.push(this.$tc('components.ascentGymRoute.newAscentsCount', this.newRouteIds.length, { count: this.newRouteIds.length }))
      }
      if (this.repetitionRouteIds.length > 0) {
        labels.push(this.$tc('components.ascentGymRoute.repetitionAscentsCount', this.repetitionRouteIds.length, { count: this.repetitionRouteIds.length }))
      }
      return labels.join(' + ')
    }
  },

  methods: {
    setRealisedAtAttributes () {
      if (this.realisedAt === undefined) {
        return
      }

      for (const ascent of this.data.ascents) {
        ascent.released_at = this.realisedAt
      }
    },

    setRopingStatusAttributes () {
      if (this.ropingStatus === undefined) {
        return
      }

      for (const ascent of this.data.ascents) {
        ascent.roping_status = this.ropingStatus
      }

      localStorage.setItem('defaultAscentGymRouteRopingStatus', this.ropingStatus)
    },

    setAscentStatusAttributes () {
      if (this.ascentStatus === undefined) {
        return
      }

      for (const ascent of this.data.ascents) {
        if (this.repetitionRouteIds.includes(parseInt(ascent.gym_route_id))) {
          ascent.ascent_status = 'repetition'
        } else {
          ascent.ascent_status = this.ascentStatus
        }
      }
    },

    openMultiCheckModal () {
      this.multiCheckModal = true
      this.currentStep = 'globalInformation'
      this.realisedAt = new Date().toISOString().substring(0, 10)
      this.ascentStatus = 'red_point'
      this.ropingStatus = localStorage.getItem('defaultAscentGymRouteRopingStatus') || 'lead_climb'
      this.getAscentsForGymRoutes()
    },

    getAscentsForGymRoutes () {
      this.loadingAscentForGymRoutes = true
      this.data.ascents = []
      new AscentGymRouteApi(this.$axios, this.$auth)
        .gymRoutesInfosInLogbook(this.selectedRoutes)
        .then((resp) => {
          this.newRouteIds = resp.data.new
          this.repetitionRouteIds = resp.data.made
          this.climbingTypes = resp.data.climbing_types
          this.gymRoutes = resp.data.gym_routes
          this.ascentStatus = resp.data.new.length === 0 ? 'repetition' : 'red_point'
          for (const gymRoute of this.gymRoutes) {
            this.data.ascents.push({
              gym_route_id: gymRoute.id,
              like: false,
              hardness_status: null,
              ascent_status: this.repetitionRouteIds.includes(parseInt(gymRoute.id)) ? 'repetition' : 'red_point',
              roping_status: gymRoute.climbing_type === 'sport_climbing' ? this.ropingStatus : null,
              released_at: new Date().toISOString().substring(0, 10),
              comment: null,
              ascent_comment: { body: null }
            })
            this.gymRouteByIds[gymRoute.id] = gymRoute
          }
        })
        .finally(() => {
          this.loadingAscentForGymRoutes = false
        })
    },

    submit () {
      this.loadingSubmitData = true
      new AscentGymRouteApi(this.$axios, this.$auth)
        .addBulk(this.data.ascents)
        .then((resp) => {
          this.$store.dispatch('ascentsPusher/updateGymAscents', resp.data)
          this.multiCheckModal = false
          this.offMultiSelectionCallback(this.selectedRoutes.length)
          for (const ascent of this.data.ascents) {
            this.$localforage.gymRoutes.removeItem(ascent.gym_route_id)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'ascentGymRoute')
        })
        .finally(() => {
          this.loadingSubmitData = false
        })
    }
  }
}
</script>
