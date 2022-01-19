<template>
  <v-form @submit.prevent="submit()">
    <markdown-input
      v-model="data.description"
      :label="$t('models.alert.description')"
    />

    <v-select
      v-model="data.alert_type"
      :items="alertTypes"
      item-text="text"
      item-value="value"
      :label="$t('models.alert.alert_type')"
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
import SubmitForm from '@/components/forms/SubmitForm'
import AlertApi from '~/services/oblyk-api/AlertApi'
import CloseForm from '@/components/forms/CloseForm'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'AlertForm',
  components: { MarkdownInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    alert: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      redirectTo: null,
      data: {
        id: (this.alert || {}).id,
        description: (this.alert || {}).description,
        alert_type: (this.alert || {}).alert_type,
        alertable_type: (this.alert || {}).alertable_type || this.$route.params.alertableType,
        alertable_id: (this.alert || {}).alertable_id || this.$route.params.alertableId
      },
      alertTypes: [
        { value: 'good', text: this.$t('components.alert.types.good') },
        { value: 'warning', text: this.$t('components.alert.types.warning') },
        { value: 'info', text: this.$t('components.alert.types.info') },
        { value: 'bad', text: this.$t('components.alert.types.bad') }
      ]
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new AlertApi(this.$axios, this.$auth).update(this.data) : new AlertApi(this.$axios, this.$auth).create(this.data)

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'alert')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
