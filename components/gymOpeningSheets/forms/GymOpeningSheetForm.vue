<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.title"
      outlined
      :label="$t('models.gymOpeningSheet.title')"
      class="required-field"
      required
    />

    <v-textarea
      v-model="data.description"
      outlined
      :label="$t('models.gymOpeningSheet.description')"
    />

    <v-text-field
      v-model="data.number_of_columns"
      outlined
      type="number"
      :label="$t('models.gymOpeningSheet.number_of_columns')"
      class="required-field"
      required
    />

    <v-select
      v-model="data.gym_space_id"
      label="Fiche pour l'espace"
      :items="gym.gym_spaces"
      item-text="name"
      item-value="id"
      outlined
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import GymOpeningSheetApi from '~/services/oblyk-api/GymOpeningSheetApi'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GymOpeningSheetForm',
  components: {
    CloseForm,
    SubmitForm
  },
  mixins: [FormHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymOpeningSheet: {
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
        id: this.gymOpeningSheet?.id,
        title: this.gymOpeningSheet?.title,
        description: this.gymOpeningSheet?.description,
        number_of_columns: this.gymOpeningSheet?.number_of_columns || 8,
        gym_id: this.gym.id,
        gym_space_id: null
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new GymOpeningSheetApi(this.$axios, this.$auth).update(this.data) : new GymOpeningSheetApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          if (this.callback) {
            this.callback(resp.data)
          } else {
            this.$router.push(`${this.gym.path}/admins/opening-sheets/${resp.data.id}`)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'GymOpeningSheet')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
