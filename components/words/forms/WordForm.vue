<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      :label="$t('models.word.name')"
    />

    <markdown-input
      v-model="data.definition"
      :label="$t('models.word.definition')"
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
  name: 'WordForm',
  components: { MarkdownInput, CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    word: {
      type: Object,
      required: false,
      default: null
    }
  },

  data () {
    return {
      data: {
        id: this.word?.id,
        name: this.word?.name,
        definition: this.word?.definition
      }
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const promise = (this.isEditingForm())
        ? new OblykApi(this.$axios, this.$auth).put(`/public/words/${this.word.id}`, this.data)
        : new OblykApi(this.$axios, this.$auth).post('/public/words', this.data)

      promise
        .then((resp) => {
          this.$router.push(resp.data.app_path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'word')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
