<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.email"
      required
      hide-details
      :label="$t('models.subscribe.email')"
      class="mb-2"
    />

    <submit-form
      :go-back-btn="false"
      :overlay="submitOverlay"
      submit-local-key="actions.subscribeMe"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import NewsletterApi from '@/services/oblyk-api/NewsletterApi'

export default {
  name: 'NewsletterSubscribeForm',
  components: { SubmitForm },
  mixins: [FormHelpers],

  data () {
    return {
      redirectTo: null,
      data: {
        email: null
      }
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true

      NewsletterApi
        .subscribe(this.data)
        .then(() => {
          this.$router.push({
            path: '/newsletters/successful-subscribe',
            params: { email: this.data.email }
          })
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'subscribe')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
