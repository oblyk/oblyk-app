<template>
  <v-form @submit.prevent="submit()">
    <v-textarea
      v-model="data.body"
      outlined
      required
      :label="$t('models.report.body')"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      submit-local-key="actions.send"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import ReportApi from '~/services/oblyk-api/ReportApi'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'ReportForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],

  data () {
    return {
      redirectTo: null,
      data: {
        body: null,
        report_from_url: null,
        reportable_type: this.$route.params.reportableType,
        reportable_id: this.$route.params.reportableId
      }
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit () {
      this.submitOverlay = true
      this.data.report_from_url = this.redirectTo

      new ReportApi(this.$axios, this.$auth)
        .create(this.data)
        .then(() => {
          this.$root.$emit('alertSimpleSuccess', this.$t('components.report.success'))
          this.$router.push(this.redirectTo)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'report')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
