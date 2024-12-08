<template>
  <div>
    <v-skeleton-loader
      v-if="loadingParticipant"
      type="text"
    />
    <div v-else>
      <v-sheet class="pa-4 rounded mt-4">
        <h3>{{ participant.first_name }} {{ participant.last_name }}</h3>
        <p class="subtitle-2">
          {{ participant.wave }} | Catégorie : {{ participant.category }}
        </p>
      </v-sheet>

      <v-sheet
        v-for="(step, stepIndex) in participant.steps"
        :key="`step-index-${stepIndex}`"
        class="pa-4 rounded mt-4"
      >
        <contest-my-step
          :participant-token="token"
          :contest-step="step"
          :contest="contest"
        />
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mdiCheck, mdiClose } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import ContestMyStep from '~/components/contests/ContestMyStep.vue'

export default {
  components: { ContestMyStep },
  mixins: [DateHelpers],
  props: {
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      token: null,
      participant: null,
      loadingParticipant: true,

      mdiCheck,
      mdiClose
    }
  },

  mounted () {
    this.token = this.$store.getters['contestToken/getContestToken'](this.$route.params.contestId)
    if (this.token) {
      this.getParticipant()
    }
  },

  methods: {
    getParticipant () {
      this.loadingParticipant = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .participant(this.contest.gym_id, this.contest.id, this.token)
        .then((resp) => {
          this.participant = resp.data
        })
        .finally(() => {
          this.loadingParticipant = false
        })
    }
  }
}
</script>
