<template>
  <div>
    <h4>
      {{ contestStep.name }}
      <span v-if="contest.contest_stages.length > 1">
        {{ contestStep.stage_name ? contestStep.stage_name : $t(`models.climbs.${contestStep.climbing_type}`).toLowerCase() }}
      </span>
    </h4>
    <p class="subtitle-2 mb-0 pb-1 border-bottom">
      Du {{ humanizeDate(contestStep.start_date) }} à {{ humanizeDate(contestStep.start_time, 'TIME_SIMPLE') }} au {{ humanizeDate(contestStep.end_date) }} à {{ humanizeDate(contestStep.end_time, 'TIME_SIMPLE') }}
    </p>

    <!-- The step has not yet begun -->
    <p
      v-if="isHappens"
      class="mb-0 mt-2"
    >
      <v-icon
        left
        color="amber"
        class="vertical-align-bottom"
      >
        {{ mdiPlayBoxOutline }}
      </v-icon>
      Commence <strong>{{ start.toRelative({ base: now }) }}</strong>
    </p>

    <!-- The step is now set -->
    <div v-if="isNow || isRegistrationTolerance">
      <p
        v-if="isNow"
        class="mb-0 mt-2"
      >
        <v-icon
          left
          color="red"
          class="vertical-align-bottom"
        >
          {{ mdiCloseBoxOutline }}
        </v-icon>
        Fin <strong>{{ end.toRelative({ base: now }) }}</strong>
      </p>
      <div v-if="isRegistrationTolerance">
        <p class="mb-0 mt-2">
          <v-icon
            left
            color="red"
            class="vertical-align-bottom"
          >
            {{ mdiCloseBoxOutline }}
          </v-icon>
          C'est fini !
        </p>
        <p class="mb-0 mt-1">
          <v-icon
            left
            class="vertical-align-bottom"
          >
            {{ mdiTimerSand }}
          </v-icon>
          <strong>{{ capitalize(registrationTolerance.toRelative({ base: now })) }}</strong> nous fermons l'enregistrement pour cette étape. Notez vos réalisations avant qu'il ne soit trop tard !
        </p>
      </div>
      <contest-routes-realised
        v-if="contestStep.self_reporting"
        :contest-step="contestStep"
        :contest="contest"
        :participant-token="participantToken"
        :admin="false"
        class="mx-n4"
      />
      <div
        v-else
        class="text-center text--disabled mt-3 mb-2"
      >
        Vos réalisations sont renseignées par des juges sur cette étape du contest.
      </div>
    </div>

    <!-- The step is finish -->
    <p
      v-if="isFinish"
      class="mt-3 mb-0"
    >
      <v-icon
        left
        class="vertical-align-bottom"
      >
        {{ mdiClose }}
      </v-icon>
      {{ contestStep.name }} terminé(e)
    </p>
  </div>
</template>

<script>
import { mdiPlayBoxOutline, mdiCloseBoxOutline, mdiClose, mdiTimerSand } from '@mdi/js'
import ContestRoutesRealised from '~/components/contests/forms/ContestRoutesRealised.vue'
import { DateHelpers } from '~/mixins/DateHelpers'
import { TextHelpers } from '~/mixins/TextHelpers'
const { DateTime } = require('luxon')

export default {
  name: 'ContestMyStep',
  components: { ContestRoutesRealised },
  mixins: [DateHelpers, TextHelpers],

  props: {
    contest: {
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
      now: DateTime.now(),
      start: DateTime.fromISO(this.contestStep.start_datetime),
      end: DateTime.fromISO(this.contestStep.end_datetime),
      registrationTolerance: DateTime.fromISO(this.contestStep.registration_end_at),
      interval: null,

      mdiPlayBoxOutline,
      mdiCloseBoxOutline,
      mdiClose,
      mdiTimerSand
    }
  },

  computed: {
    isHappens () {
      return this.now < this.start
    },

    isNow () {
      return this.now >= this.start && this.now <= this.end
    },

    isRegistrationTolerance () {
      return this.now >= this.end && this.now <= this.registrationTolerance
    },

    isFinish () {
      return this.now > this.registrationTolerance
    }
  },

  mounted () {
    this.interval = setInterval(() => {
      this.now = DateTime.now()
    }, 5000)
  },

  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>
