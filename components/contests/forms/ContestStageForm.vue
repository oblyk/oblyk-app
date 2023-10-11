<template>
  <v-form @submit.prevent="submit()">
    <v-select
      v-model="data.climbing_type"
      :items="climbs"
      item-text="text"
      item-value="value"
      label="Type d'escalade de l'épreuve"
      class="required-field"
      outlined
    />

    <contest-ranking-input
      v-model="data.default_ranking_type"
      required
    />

    <v-text-field
      v-if="isEditingForm()"
      v-model="data.stage_order"
      type="number"
      outlined
      :label="$t('models.contestStage.stage_order')"
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
import ContestStageApi from '~/services/oblyk-api/ContestStageApi'
import ContestRankingInput from '~/components/forms/ContestRankingInput'
import ContestStage from '~/models/ContestStage'

export default {
  name: 'ContestStageForm',
  components: {
    ContestRankingInput,
    SubmitForm
  },
  mixins: [FormHelpers],
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
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: this.contestStage?.id,
        climbing_type: this.contestStage?.climbing_type,
        description: this.contestStage?.description,
        default_ranking_type: this.contestStage?.default_ranking_type,
        stage_order: this.contestStage?.stage_order,
        gym_id: this.gym.id,
        contest_id: this.contest.id
      },
      climbs: [
        { text: this.$t('models.climbs.sport_climbing'), value: 'sport_climbing' },
        { text: this.$t('models.climbs.bouldering'), value: 'bouldering' }
        // { text: this.$t('models.climbs.speed_climbing'), value: 'speed_climbing' }
      ]
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ContestStageApi(this.$axios, this.$auth).update(this.data) : new ContestStageApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const contestStage = new ContestStage({ attributes: resp.data })
          if (this.callback) {
            this.callback(contestStage)
          } else {
            this.$router.push(contestStage.adminPath)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contestStage')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
