<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      class="required-field"
      label="Nom"
    />
    <v-select
      v-model="data.contest_type"
      :items="contestTypes"
      item-text="text"
      item-value="value"
      label="Type de contest"
      outlined
      required
      class="required-field"
    />

    <v-sheet
      v-if="data.contest_type"
      class="mb-8 py-2 px-4 back-app-color"
      rounded
    >
      <u>Nom du contest sur les Vertical Series :</u><br>
      Open promotionnel 2 de <mark>{{ contestTypeLabels[data.contest_type] }}</mark> <mark>{{ data.name }}</mark>
    </v-sheet>

    <v-textarea
      v-model="data.description"
      outlined
      counter
      :rules="descriptionRules"
      :label="$t('models.contest.description')"
    />
    <date-picker-input
      v-model="data.start_date"
      required
      :label="$t('models.contest.start_date')"
    />
    <date-picker-input
      v-model="data.end_date"
      required
      :label="$t('models.contest.end_date')"
    />

    <v-text-field
      v-model="data.contact_email"
      outlined
      required
      class="required-field"
      type="email"
      label="Email de contact"
      hint="L'email ne sera pas divulgé, il sera utilisé par la FFME uniquement en cas de problème"
      persistent-hint
    />
    <v-text-field
      v-model="data.contact_phone"
      outlined
      type="tel"
      label="Telephone de contact"
      hint="Le téléphone ne sera pas divulgé, il sera utilisé par la FFME uniquement en cas de problème"
      persistent-hint
    />

    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
      :go-back-btn="false"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '~/mixins/FormHelpers'
import SubmitForm from '~/components/forms/SubmitForm'
import DatePickerInput from '~/components/forms/DatePickerInput'
import FfmeContestApi from '~/services/oblyk-api/FfmeContestApi'

export default {
  name: 'FfmeContestForm',
  components: {
    DatePickerInput,
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    contest: {
      type: Object,
      default: null
    },
    ffmeContest: {
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
        id: this.ffmeContest?.id,
        contest_id: this.contest?.id,
        contest_type: this.ffmeContest?.contest_type || null,
        name: this.ffmeContest?.name || this.contest?.name,
        description: this.ffmeContest?.description || this.contest?.description,
        start_date: this.ffmeContest?.start_date || this.contest?.start_date,
        end_date: this.ffmeContest?.end_date || this.contest?.end_date,
        contact_email: this.ffmeContest?.contact_email || this.$auth.user.email,
        contact_phone: this.ffmeContest?.contact_phone,
        gym_id: this.contest?.gym_id
      },
      contestTypes: [
        { text: 'Voie', value: 'sport_climbing' },
        { text: 'Bloc', value: 'boulder' },
        { text: 'Vitesse', value: 'speed_climbing' },
        { text: 'Combiné', value: 'combined' }
      ],
      contestTypeLabels: {
        sport_climbing: 'difficulté',
        boulder: 'bloc',
        speed_climbing: 'vitesse',
        combined: 'combiné'
      },
      descriptionRules: [v => v?.length <= 2048 || 'Max 2048 characters']
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new FfmeContestApi(this.$axios, this.$auth).update(this.data) : new FfmeContestApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          location.reload()
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'ffmeContest')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
