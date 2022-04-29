<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      :label="$t('models.newsletter.name')"
    />

    <v-textarea
      v-model="data.body"
      outlined
      :rows="11"
      :label="$t('models.newsletter.body')"
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
import NewsletterApi from '~/services/oblyk-api/NewsletterApi'
import CloseForm from '@/components/forms/CloseForm'
import Newsletter from '@/models/Newsletter'

export default {
  name: 'NewsletterForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    newsletter: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      redirectTo: null,
      data: {
        id: (this.newsletter || {}).id,
        name: (this.newsletter || {}).name,
        body: (this.newsletter || {}).body
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? new NewsletterApi(this.$axios, this.$auth).update(this.data) : new NewsletterApi(this.$axios, this.$auth).create(this.data)

      promise
        .then((resp) => {
          if (this.isEditingForm()) {
            this.$root.$emit('alertSimpleSuccess', this.$t('components.newsletter.newsletterUpdate'))
          } else {
            const newsletter = new Newsletter({ attributes: resp.data })
            this.$router.push(newsletter.path)
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'newsletter')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
