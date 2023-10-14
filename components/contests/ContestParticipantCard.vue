<template>
  <div>
    <p
      v-if="loadingParticipant"
      class="text-center text--disabled my-4"
    >
      {{ $t('common.loading') }}
    </p>
    <div v-else>
      <div class="d-flex mb-4">
        <h2>
          {{ participant.first_name }} {{ participant.last_name }}
        </h2>
        <v-btn
          icon
          class="ml-auto"
          @click="closeModal"
        >
          <v-icon>
            {{ mdiClose }}
          </v-icon>
        </v-btn>
      </div>
      <p class="mb-1">
        Catégorie : <strong>{{ participant.contest_category.name }} - {{ participant.genre }}</strong>
      </p>
      <p>
        Référence : <strong>{{ participant.token }}</strong>
        <copy-btn
          :message="participant.token"
          small
        />
      </p>
      <v-tabs v-model="tabIndex">
        <v-tab
          v-for="(tabStep, tabStepIndex) in participant.steps"
          :key="`tab-step-index-${tabStepIndex}`"
        >
          {{ tabStep.name }} - {{ $t(`models.climbs.${tabStep.climbing_type}`) }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabIndex">
        <v-tab-item
          v-for="(step, stepIndex) in participant.steps"
          :key="`step-index-${stepIndex}`"
        >
          <contest-routes-realised
            :contest-step="step"
            :contest="contest"
            :participant-token="participant.token"
          />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import { mdiClose } from '@mdi/js'
import CopyBtn from '~/components/ui/CopyBtn.vue'
import ContestParticipantApi from '~/services/oblyk-api/ContestParticipantApi'
import ContestParticipant from '~/models/ContestParticipant'
import ContestRoutesRealised from '~/components/contests/forms/ContestRoutesRealised.vue'

export default {
  name: 'ContestParticipantCard',
  components: { ContestRoutesRealised, CopyBtn },
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestParticipantId: {
      type: Number,
      required: true
    },
    closeModal: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      tabIndex: 0,
      loadingParticipant: true,
      participant: this.contestParticipant,

      mdiClose
    }
  },

  mounted () {
    this.getParticipant()
  },

  methods: {
    getParticipant () {
      this.loadingParticipant = true
      new ContestParticipantApi(this.$axios, this.$auth)
        .find(this.contest.gym_id, this.contest.id, this.contestParticipantId)
        .then((resp) => {
          this.participant = new ContestParticipant({ attributes: resp.data })
          this.tabIndex = this.participant.steps.length - 1
        })
        .finally(() => {
          this.loadingParticipant = false
        })
    }
  }
}
</script>
