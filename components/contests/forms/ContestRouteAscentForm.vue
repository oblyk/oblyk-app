<template>
  <div class="remove-btn-active-before">
    <!-- Division -->
    <div v-if="contestStep.ranking_type === 'division'">
      <v-btn-toggle
        v-model="ascent"
        @change="submit"
      >
        <v-btn
          :disabled="loading"
          :value="true"
          class="px-5"
          active-class="green lighten-4"
        >
          <v-icon
            left
            color="green"
          >
            {{ mdiCheck }}
          </v-icon>
          Fait !
        </v-btn>
        <v-btn
          :disabled="loading"
          :value="false"
          class="px-5"
          :ripple="false"
          active-class="red lighten-4"
        >
          <v-icon
            left
            color="red"
          >
            {{ mdiClose }}
          </v-icon>
          Pas fait
        </v-btn>
      </v-btn-toggle>
    </div>

    <!-- Attempts to top -->
    <div v-if="contestStep.ranking_type === 'attempts_to_top'">
      <v-radio-group
        v-model="ascent"
        row
        @change="submit"
      >
        <div
          v-for="attempt in 10"
          :key="`attempt-${attempt}`"
          class="pa-1"
        >
          <v-radio :value="attempt" />
          <div
            :style="`width: ${attempt === 10 ? 'auto' : 24}px;`"
            class="text-center"
          >
            {{ attempt === 10 ? '10 et +' : attempt }}
          </div>
        </div>
      </v-radio-group>
    </div>

    <!-- Zone and top realised -->
    <div
      v-if="contestStep.ranking_type === 'zone_and_top_realised'"
      class="d-flex"
    >
      <v-checkbox
        v-model="ascent.zone_1_attempt"
        label="Zone faite"
        hide-details
        class="mr-7 mt-0"
        @change="submit"
      />
      <v-checkbox
        v-model="ascent.top_attempt"
        label="Top fait"
        hide-details
        class="mt-0"
        @change="submit"
      />
    </div>

    <!-- Attempts to one zone and top -->
    <div
      v-if="contestStep.ranking_type === 'attempts_to_one_zone_and_top'"
      class="d-flex"
    >
      <v-text-field
        v-model="ascent.zone_1_attempt"
        label="Nombre d'essais pour la zone"
        outlined
        hide-details
        type="number"
        class="mr-1"
        @input="submit"
      />
      <v-text-field
        v-model="ascent.top_attempt"
        label="Nombre d'essais pour le top"
        outlined
        hide-details
        type="number"
        class="ml-1"
        @input="submit"
      />
    </div>

    <!-- Highest hold -->
    <div
      v-if="contestStep.ranking_type === 'highest_hold'"
      class="d-flex"
    >
      <v-text-field
        v-model="ascent.hold_number"
        :label="`Prise atteinte / ${contestRoute.number_of_holds} prises`"
        outlined
        hide-details
        type="number"
        class="mr-4 flex-grow-0"
        @blur="submit"
      />
      <v-checkbox
        v-model="ascent.hold_number_plus"
        label="+"
        hide-details
        class="mt-3"
        @change="submit"
      />
    </div>
  </div>
</template>

<script>
import { mdiCheck, mdiClose } from '@mdi/js'
import ContestParticipantAscentApi from '~/services/oblyk-api/ContestParticipantAscentApi'

export default {
  name: 'ContestRouteAscentForm',

  props: {
    contest: {
      type: Object,
      required: true
    },
    contestRoute: {
      type: Object,
      required: true
    },
    contestStep: {
      type: Object,
      required: true
    },
    participantToken: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      ascent: this.setAscentValue(),
      loading: false,
      previousNumberOfHold: null,

      mdiCheck,
      mdiClose
    }
  },

  methods: {
    setAscentValue () {
      if (this.contestRoute.ascent) {
        if (this.contestStep.ranking_type === 'division') {
          return this.contestRoute.ascent.realised
        } else if (this.contestStep.ranking_type === 'attempts_to_top') {
          return this.contestRoute.ascent.top_attempt
        } else if (this.contestStep.ranking_type === 'attempts_to_one_zone_and_top') {
          return {
            top_attempt: this.contestRoute.ascent.top_attempt,
            zone_1_attempt: this.contestRoute.ascent.zone_1_attempt
          }
        } else if (this.contestStep.ranking_type === 'zone_and_top_realised') {
          return {
            top_attempt: this.contestRoute.ascent.top_attempt === 1,
            zone_1_attempt: this.contestRoute.ascent.zone_1_attempt === 1
          }
        } else if (this.contestStep.ranking_type === 'highest_hold') {
          return {
            hold_number: this.contestRoute.ascent.hold_number,
            hold_number_plus: this.contestRoute.ascent.hold_number_plus
          }
        } else {
          return null
        }
      } else if (this.contestStep.ranking_type === 'attempts_to_one_zone_and_top') {
        return {
          top_attempt: null,
          zone_1_attempt: null
        }
      } else if (this.contestStep.ranking_type === 'zone_and_top_realised') {
        return {
          top_attempt: false,
          zone_1_attempt: false
        }
      } else if (this.contestStep.ranking_type === 'highest_hold') {
        return {
          hold_number: null,
          hold_number_plus: false
        }
      } else {
        return null
      }
    },

    submit () {
      this.loading = true
      const data = {
        gym_id: this.contest.gym_id,
        contest_id: this.contest.id,
        contest_route_id: this.contestRoute.id,
        contest_participant_token: this.participantToken
      }

      if (this.contestStep.ranking_type === 'division') {
        data.realised = this.ascent
      }

      if (this.contestStep.ranking_type === 'attempts_to_top') {
        data.top_attempt = this.ascent
      }

      if (this.contestStep.ranking_type === 'attempts_to_one_zone_and_top') {
        data.top_attempt = this.ascent.top_attempt
        data.zone_1_attempt = this.ascent.zone_1_attempt
      }

      if (this.contestStep.ranking_type === 'zone_and_top_realised') {
        data.top_attempt = this.ascent.top_attempt ? 1 : null
        data.zone_1_attempt = this.ascent.zone_1_attempt ? 1 : null
      }

      if (this.contestStep.ranking_type === 'highest_hold') {
        data.hold_number = this.ascent.hold_number
        data.hold_number_plus = this.ascent.hold_number_plus
        if (this.previousNumberOfHold === this.ascent.hold_number) {
          return false
        } else {
          this.previousNumberOfHold = this.ascent.hold_number
        }
      }

      new ContestParticipantAscentApi(this.$auth, this.$axios)
        .create(data)
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
