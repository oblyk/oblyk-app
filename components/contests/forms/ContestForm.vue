<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      class="required-field"
      :label="$t('models.contest.name')"
    />

    <markdown-input
      v-model="data.description"
      :label="$t('models.contest.description')"
    />

    <v-row>
      <v-col cols="6">
        <date-picker-input
          v-model="data.start_date"
          required
          hide-details
          :icon="mdiCalendarArrowRight"
          :label="$t('models.contest.start_date')"
          @input="setDates()"
        />
        <p class="text--disabled mb-0">
          {{ $t('components.contest.startDateExplain') }}
        </p>
      </v-col>
      <v-col cols="6">
        <date-picker-input
          v-model="data.end_date"
          required
          :icon="mdiCalendarArrowRight"
          :label="$t('models.contest.end_date')"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <date-picker-input
          v-model="data.subscription_start_date"
          required
          hide-details
          :icon="mdiPen"
          :label="$t('models.contest.subscription_start_date')"
        />
        <p class="text--disabled">
          {{ $t('components.contest.subscriptionOpenExplain') }}
        </p>
      </v-col>
      <v-col cols="6">
        <date-picker-input
          v-model="data.subscription_end_date"
          required
          :icon="mdiPenOff"
          :label="$t('models.contest.subscription_end_date')"
        />
      </v-col>
    </v-row>

    <contest-categories-input
      v-if="!isEditingForm()"
      v-model="data.categorization_type"
      required
    />

    <v-text-field
      v-model="data.total_capacity"
      type="number"
      outlined
      :label="$t('models.contest.total_capacity')"
      hide-details
    />
    <p
      class="text--disabled"
      v-html="$t('components.contest.capacityExplain')"
    />

    <div class="pa-2 border rounded-sm">
      <v-checkbox
        v-model="data.team_contest"
        :label="$t('models.contest.team_contest')"
        hint="Faite des équipes de 2, 3, 4, etc. et ayez un classement par équipe plutôt que par participant !"
        class="mt-n1"
        persistent-hint
      />
      <v-text-field
        v-if="data.team_contest"
        v-model="data.participant_per_team"
        :label="$t('models.contest.participant_per_team')"
        outlined
        hide-details
        type="number"
        class="mt-2"
      />
    </div>

    <div class="pa-2 my-4 border rounded-sm">
      <v-checkbox
        v-model="data.authorise_public_subscription"
        :label="$t('models.contest.authorise_public_subscription')"
        hint="Les participants pourrons être inscrit uniquement par vous via l'administration ou l'import d'un fichier de participant."
        class="mt-n1"
        persistent-hint
      />
    </div>

    <div class="pa-2 my-4 border rounded-sm">
      <v-checkbox
        v-model="data.private"
        :label="$t('models.contest.private')"
        hint="Le contest ne sera pas mis en évidence sur Oblyk. Seul les grimpeurs ayant le lien pourront aller sur la page du contest."
        class="mt-n1"
        persistent-hint
      />
    </div>

    <div class="pa-2 my-4 border rounded-sm">
      <v-checkbox
        v-model="data.hide_results"
        :label="$t('models.contest.hide_results')"
        hint="La page publique de votre contest ne comportera pas de page Résultat"
        class="mt-n1"
        persistent-hint
      />
    </div>

    <div class="pa-2 my-4 border rounded-sm">
      <v-checkbox
        v-model="data.optional_gender"
        :label="$t('models.contest.optional_gender')"
        hint="Rendre optionnel le genre à l'inscription (contest mixte uniquement)"
        class="mt-n1"
        persistent-hint
      />
    </div>

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
      :go-back-btn="!isEditingForm()"
    />
  </v-form>
</template>
<script>
import {
  mdiCalendarArrowRight,
  mdiCalendarArrowLeft,
  mdiPen,
  mdiPenOff
} from '@mdi/js'
import { FormHelpers } from '~/mixins/FormHelpers'
import CloseForm from '~/components/forms/CloseForm'
import MarkdownInput from '~/components/forms/MarkdownInput'
import SubmitForm from '~/components/forms/SubmitForm'
import ContestApi from '~/services/oblyk-api/ContestApi'
import Contest from '~/models/Contest'
import DatePickerInput from '~/components/forms/DatePickerInput'
import ContestCategoriesInput from '~/components/forms/ContestCategoriesInput'

export default {
  name: 'ContestForm',
  components: {
    ContestCategoriesInput,
    DatePickerInput,
    SubmitForm,
    MarkdownInput,
    CloseForm
  },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    contest: {
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
        id: this.contest?.id,
        name: this.contest?.name,
        description: this.contest?.description,
        start_date: this.contest?.start_date,
        end_date: this.contest?.end_date,
        subscription_start_date: this.contest?.subscription_start_date,
        subscription_end_date: this.contest?.subscription_end_date,
        total_capacity: this.contest?.total_capacity,
        categorization_type: this.contest?.categorization_type,
        authorise_public_subscription: this.contest?.authorise_public_subscription === undefined ? true : this.contest?.authorise_public_subscription,
        private: this.contest?.private,
        hide_results: this.contest?.hide_results,
        team_contest: this.contest?.team_contest,
        participant_per_team: this.contest?.participant_per_team,
        optional_gender: this.contest?.optional_gender,
        gym_id: this.gym.id
      },

      mdiCalendarArrowRight,
      mdiCalendarArrowLeft,
      mdiPen,
      mdiPenOff
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new ContestApi(this.$axios, this.$auth).update(this.data) : new ContestApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          const contest = new Contest({ attributes: resp.data })
          if (this.callback) {
            this.callback(contest)
          } else {
            this.$router.push(contest.adminPath)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'contest')
        }).then(() => {
          this.submitOverlay = false
        })
    },

    setDates () {
      if (this.data.start_date !== null && !this.data.end_date) {
        this.data.end_date = this.data.start_date
      }
      if (this.data.start_date !== null && !this.data.subscription_end_date) {
        this.data.subscription_end_date = this.data.start_date
      }
    }
  }
}
</script>
