<template>
  <v-sheet
    class="pa-2 back-app-color mt-2"
    style="border-radius: 10px"
  >
    <!-- Title -->
    <p class="px-1 mb-0 font-weight-medium">
      {{ contestStep.name }}
      <span v-if="isNow" class="text--disabled">
        · fin <strong>{{ end.toRelative({ base: now }) }}</strong>
      </span>
      <span v-if="isHappens" class="text--disabled">
        · commence <strong>{{ start.toRelative({ base: now }) }}</strong>
      </span>
    </p>

    <!-- The step is now set -->
    <div
      v-if="isNow || isRegistrationTolerance"
      class="mt-2"
    >
      <p
        v-if="isRegistrationTolerance"
        class="mb-2 px-1"
      >
        L'étape est terminée, <strong>{{ registrationTolerance.toRelative({ base: now }) }}</strong> vous ne pourrez plus renseigner les résultats.
      </p>
      <div class="sheet-background-color rounded-sm py-1">
        <contest-routes-realised
          :contest-step="contestStep"
          :contest="contest"
          :participant-token="participantToken"
          :admin="false"
          :save-callback="saveCallback"
          :change-callback="changeCallback"
          :only-route-ids="onlyRouteIds"
        />
      </div>
    </div>

    <!-- The step is finish -->
    <p
      v-if="isFinish"
      class="mb-1 mt-2 font-italic text-center text--disabled"
    >
      L'étape est terminée.
    </p>
  </v-sheet>
</template>

<script>
import { mdiPlayBoxOutline, mdiCloseBoxOutline, mdiClose, mdiTimerSand } from '@mdi/js'
import ContestRoutesRealised from '~/components/contests/forms/ContestRoutesRealised'
import { DateHelpers } from '~/mixins/DateHelpers'
import { TextHelpers } from '~/mixins/TextHelpers'
const { DateTime } = require('luxon')

export default {
  name: 'ContestJudgeStep',
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
    },
    saveCallback: {
      type: Function,
      default: null
    },
    changeCallback: {
      type: Function,
      default: null
    },
    onlyRouteIds: {
      type: Array,
      default: null
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
