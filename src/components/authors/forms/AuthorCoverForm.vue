<template>
  <v-form
    @submit.prevent="submit()"
    enctype="multipart/form-data"
  >
    <v-file-input
      v-model="file"
      outlined
      truncate-length="15"
      :placeholder="$t('actions.browse')"
    />
    <close-form />
    <submit-form :overlay="submitOverlay" />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import AuthorApi from '@/services/oblyk-api/AuthorApi'

export default {
  name: 'AuthorCoverForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],

  props: {
    author: Object
  },

  data () {
    return {
      redirectTo: null,
      file: null
    }
  },

  created () {
    const urlParams = new URLSearchParams(window.location.search)
    this.redirectTo = urlParams.get('redirect_to')
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const formData = new FormData()

      formData.append('author[cover]', this.file)

      AuthorApi
        .cover(
          formData,
          this.author.id
        )
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
