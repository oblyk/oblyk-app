<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      :hide-details="!isEditingForm()"
      class="required-field"
      :label="$t('models.contestWave.name')"
    />
    <div
      v-if="!isEditingForm()"
      class="mb-7 mt-2 pl-1"
    >
      <strong>Suggestion :</strong>
      <v-btn
        outlined
        text
        small
        @click="data.name = 'Vague A'"
      >
        Vague A
      </v-btn>
      <v-btn
        outlined
        text
        small
        @click="data.name = 'Vague B'"
      >
        Vague B
      </v-btn>
    </div>

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
import ContestWaveApi from '~/services/oblyk-api/ContestWaveApi'
import ContestStage from '~/models/ContestStage'

export default {
  name: 'ContestWaveForm',
  components: { SubmitForm },
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
    contestWave: {
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
        id: this.contestWave?.id,
        name: this.contestWave?.name,
        gym_id: this.gym.id,
        contest_id: this.contest.id
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ContestWaveApi(this.$axios, this.$auth).update(this.data) : new ContestWaveApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const contestWave = new ContestStage({ attributes: resp.data })
          if (this.callback) {
            this.callback(contestWave)
          } else {
            this.$router.push(contestWave.adminPath)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contestWave')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
