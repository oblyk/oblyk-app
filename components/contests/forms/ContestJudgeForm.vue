<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      class="required-field"
      :label="$t('models.contestJudge.name')"
    />

    <v-text-field
      v-model="data.code"
      outlined
      required
      class="required-field"
      :label="$t('models.contestJudge.code')"
      persistent-hint
      hint="Le code serre à déverrouiller l'interface de jugement, un code simple et mémorisable est suffisant."
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
import { DateHelpers } from '~/mixins/DateHelpers'
import SubmitForm from '~/components/forms/SubmitForm'
import ContestJudgeApi from '~/services/oblyk-api/ContestJudgeApi'

export default {
  name: 'ContestJudgeForm',
  components: { SubmitForm },
  mixins: [FormHelpers, DateHelpers],

  props: {
    contest: {
      type: Object,
      required: true
    },
    contestJudge: {
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
      subscribing: false,
      data: {
        id: this.contestJudge?.id,
        name: this.contestJudge?.name,
        code: this.contestJudge?.code,
        contest_id: this.contest.id,
        gym_id: this.contest.gym_id
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ContestJudgeApi(this.$axios, this.$auth).update(this.data) : new ContestJudgeApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          this.callback(resp.data)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contestJudge')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
