<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      required
      :label="$t('models.newsletter.name')"
    />

    <v-textarea
      outlined
      :rows="11"
      v-model="data.body"
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
import NewsletterApi from '@/services/oblyk-api/NewsletterApi'
import CloseForm from '@/components/forms/CloseForm'
import Newsletter from '@/models/Newsletter'

export default {
  name: 'NewsletterForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    newsletter: Object
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
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? NewsletterApi.update(this.data) : NewsletterApi.create(this.data)

      promise
        .then(resp => {
          if (this.isEditingForm()) {
            this.$root.$emit('alertSimpleSuccess', this.$t('components.newsletter.newsletterUpdate'))
          } else {
            const newsletter = new Newsletter(resp.data)
            this.$router.push(newsletter.path())
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'newsletter')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
