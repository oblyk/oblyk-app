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
      submit-local-key="actions.unsubscribeMe"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import NewsletterApi from '~/services/oblyk-api/NewsletterApi'

export default {
  name: 'NewsletterUnsubscribeForm',
  components: { SubmitForm },
  mixins: [FormHelpers],
  props: {
    email: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      redirectTo: null,
      oblyk_full_name: null,
      data: {
        email: this.email
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
        .unsubscribe(data)
        .then(() => {
          this.$router.push('/newsletters/successful-unsubscribe')
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
