<template>
  <div class="remove-btn-active-before">
    <!-- Division -->
    <div v-if="contestStep.ranking_type === 'division' || contestStep.ranking_type === 'fixed_points'">
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
          v-for="attempt in 11"
          :key="`attempt-${attempt}`"
          class="pa-1"
        >
          <v-radio :value="attempt" />
          <div
            :style="`width: ${attempt === 11 ? 'auto' : 24}px;`"
            class="text-center"
          >
            {{ attempt === 11 ? '+ de 10' : attempt }}
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

    <!-- Division and zone -->
    <div
      v-if="contestStep.ranking_type === 'division_and_zone'"
      class="d-flex"
    >
      <v-checkbox
        v-if="contestRoute.additional_zone"
        v-model="ascent.zone_1_attempt"
        label="Zone faite"
        hide-details
        class="mr-7 mt-0"
        @change="submit"
      />
      <v-checkbox
        v-model="ascent.top_attempt"
        :label="contestRoute.additional_zone ? 'Top fait !' : 'Fait !'"
        hide-details
        class="mt-0"
        @change="submit"
      />
    </div>

    <!-- Division and attempts -->
    <div
      v-if="contestStep.ranking_type === 'division_and_attempt'"
      class="d-flex"
    >
      <v-checkbox
        v-model="ascent.realised"
        label="Fait !"
        hide-details
        class="mr-7 mt-0 align-self-center"
        @change="submit"
      />
      <v-text-field
        v-if="ascent.realised"
        v-model="ascent.top_attempt"
        label="Nombre d'essais fait"
        outlined
        hide-details
        type="number"
        class="ml-1"
        :rules="[rules.greatThanZero]"
        @input="submit"
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

export default {
  name: 'ContestRouteAscentForm',

  props: {
    value: {
      type: Object,
      default: null
    },
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
      rules: {
        greatThanZero: value => value >= 1 || 'Doit être supérieur à 1'
      },

      mdiCheck,
      mdiClose
    }
  },

  methods: {
    setAscentValue () {
      if (this.contestRoute.ascent) {
        // If contest route is registered
        if (['division', 'fixed_points'].includes(this.contestStep.ranking_type)) {
          return this.contestRoute.ascent.realised
        } else if (this.contestStep.ranking_type === 'attempts_to_top') {
          return this.contestRoute.ascent.top_attempt
        } else if (this.contestStep.ranking_type === 'attempts_to_one_zone_and_top') {
          return {
            top_attempt: this.contestRoute.ascent.top_attempt,
            zone_1_attempt: this.contestRoute.ascent.zone_1_attempt
          }
        } else if (['zone_and_top_realised', 'division_and_zone'].includes(this.contestStep.ranking_type)) {
          return {
            top_attempt: this.contestRoute.ascent.top_attempt === 1,
            zone_1_attempt: this.contestRoute.ascent.zone_1_attempt === 1
          }
        } else if (['division_and_attempt'].includes(this.contestStep.ranking_type)) {
          return {
            realised: this.contestRoute.ascent.realised,
            top_attempt: this.contestRoute.ascent.realised ? this.contestRoute.ascent.top_attempt : 1
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
        // If contest route is not registered
        return {
          top_attempt: null,
          zone_1_attempt: null
        }
      } else if (['zone_and_top_realised', 'division_and_zone'].includes(this.contestStep.ranking_type)) {
        return {
          top_attempt: false,
          zone_1_attempt: false
        }
      } else if (['division_and_attempt'].includes(this.contestStep.ranking_type)) {
        return {
          realised: false,
          top_attempt: 1
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

      if (['division', 'fixed_points'].includes(this.contestStep.ranking_type)) {
        data.realised = this.ascent
      }

      if (this.contestStep.ranking_type === 'attempts_to_top') {
        data.top_attempt = this.ascent
      }

      if (this.contestStep.ranking_type === 'division_and_attempt') {
        data.realised = this.ascent.realised
        data.top_attempt = this.ascent.realised ? this.ascent.top_attempt : null
      }

      if (this.contestStep.ranking_type === 'attempts_to_one_zone_and_top') {
        data.top_attempt = this.ascent.top_attempt
        data.zone_1_attempt = this.ascent.zone_1_attempt
      }

      if (['zone_and_top_realised', 'division_and_zone'].includes(this.contestStep.ranking_type)) {
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

      this.$emit('input', data)
    }
  }
}
</script>
