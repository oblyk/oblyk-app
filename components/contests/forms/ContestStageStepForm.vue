<template>
  <v-form @submit.prevent="submit()">
    <v-row>
      <v-col
        v-if="isEditingForm()"
        class="pt-0"
        cols="4"
        lg="3"
      >
        <v-text-field
          v-model="data.step_order"
          type="number"
          outlined
          :label="$t('models.contestStageStep.step_order')"
        />
      </v-col>
      <v-col class="pt-0">
        <v-text-field
          v-model="data.name"
          outlined
          required
          :hide-details="!isEditingForm()"
          class="required-field"
          :label="$t('models.contestStageStep.name')"
        />
        <div
          v-if="!isEditingForm()"
          class="mb-7 mt-1 pl-1"
        >
          <strong>Suggestion :</strong>
          <v-btn
            outlined
            text
            small
            @click="data.name = 'Qualification'"
          >
            Qualification
          </v-btn>
          <v-btn
            outlined
            text
            small
            @click="data.name = 'Demi-finale'"
          >
            Demi-finale
          </v-btn>
          <v-btn
            outlined
            text
            small
            @click="data.name = 'Finale'"
          >
            Finale
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <contest-ranking-input
      v-model="data.ranking_type"
      required
    />

    <v-text-field
      v-if="data.ranking_type === 'fixed_points'"
      v-model="data.ascents_limit"
      class="mb-4"
      type="number"
      outlined
      persistent-hint
      :label="$t('models.contestStageStep.ascents_limit', { count: data.ascents_limit || '[x]' })"
      :hint="$t('models.contestStageStep.ascents_limit_explain')"
    />

    <v-text-field
      v-model="data.default_participants_for_next_step"
      type="number"
      hide-details
      outlined
      :label="$t('models.contestStageStep.default_participants_for_next_step')"
    />

    <v-checkbox
      v-model="data.self_reporting"
      hide-details
      :label="$t('models.contestStageStep.self_reporting')"
    />

    <submit-form
      :go-back-btn="false"
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '~/mixins/FormHelpers'
import SubmitForm from '~/components/forms/SubmitForm'
import ContestRankingInput from '~/components/forms/ContestRankingInput'
import ContestStageStepApi from '~/services/oblyk-api/ContestStageStepApi'
import ContestStageStep from '~/models/ContestStageStep'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'ContestStageStepForm',
  components: {
    ContestRankingInput,
    SubmitForm
  },
  mixins: [FormHelpers, DateHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    contest: {
      type: Object,
      required: true
    },
    contestStage: {
      type: Object,
      default: null
    },
    contestStageStep: {
      type: Object,
      default: null
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: this.contestStageStep?.id,
        name: this.contestStageStep?.name,
        ranking_type: this.contestStageStep?.ranking_type || this.contestStage.default_ranking_type,
        ascents_limit: this.contestStageStep?.ascents_limit,
        step_order: this.contestStageStep?.step_order,
        self_reporting: this.contestStageStep?.self_reporting || true,
        default_participants_for_next_step: this.contestStageStep?.default_participants_for_next_step,
        gym_id: this.gym.id,
        contest_id: this.contest.id,
        contest_stage_id: this.contestStage.id
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ContestStageStepApi(this.$axios, this.$auth).update(this.data) : new ContestStageStepApi(this.$axios, this.$auth).create(this.data)
      promise
        .then((resp) => {
          const contestStageStep = new ContestStageStep({ attributes: resp.data })
          if (this.callback) {
            this.callback(contestStageStep)
          } else {
            this.$router.push(contestStageStep.adminPath)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contestStageStep')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
