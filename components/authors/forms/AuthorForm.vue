<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
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
import CloseForm from '@/components/forms/CloseForm'
import MarkdownInput from '@/components/forms/MarkdownInput'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'AuthorForm',
  components: { MarkdownInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    author: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      redirectTo: null,
      data: {
        id: this.author?.id,
        name: this.author?.name,
        description: this.author?.description
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
      const promise = this.isEditingForm()
        ? new OblykApi(this.$axios, this.$auth).put(`/authors/${this.data.id}`, { author: this.data })
        : new OblykApi(this.$axios, this.$auth).post('/authors', { author: this.data })

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'author')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
