<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      required
      :label="$t('models.author.name')"
    />

    <markdown-input
      v-model="data.description"
      :label="$t('models.author.description')"
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
import AuthorApi from '@/services/oblyk-api/AuthorApi'
import CloseForm from '@/components/forms/CloseForm'
import MarkdownInput from '@/components/forms/MarkdownInput'

export default {
  name: 'AuthorForm',
  components: { MarkdownInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    author: Object
  },

  data () {
    return {
      redirectTo: null,
      data: {
        id: (this.author || {}).id,
        name: (this.author || {}).name,
        description: (this.author || {}).description
      }
    }
  },

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const promise = (this.isEditingForm()) ? AuthorApi.update(this.data) : AuthorApi.create(this.data)

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'author')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
