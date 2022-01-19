<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="oblyk_full_name"
      outlined
      required
      hide-details
      tabindex="-1"
      autocomplete="off"
      :label="$t('models.oblyk_full_name')"
      class="mb-2 full-name-field-form"
    />

    <v-text-field
      v-model="data.email"
      outlined
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
import NewsletterApi from '~/services/oblyk-api/NewsletterApi'

export default {
  name: 'NewsletterSubscribeForm',
  components: { SubmitForm },
  mixins: [FormHelpers],

  data () {
    return {
      redirectTo: null,
      oblyk_full_name: null,
      data: {
        email: null
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const data = {
        oblyk_full_name: this.oblyk_full_name,
        subscribe: this.data
      }

      new NewsletterApi(this.$axios, this.$auth)
        .subscribe(data)
        .then(() => {
          this.$router.push({
            path: '/newsletters/successful-subscribe',
            params: { email: this.data.email }
          })
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'subscribe')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
