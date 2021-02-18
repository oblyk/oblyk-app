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
    <submit-form
      :overlay="submitOverlay"
      submit-local-key="actions.upload"
    />
  </v-form>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import { FormHelpers } from '@/mixins/FormHelpers'

export default {
  name: 'UserImageForm',
  mixins: [FormHelpers],
  components: { CloseForm, SubmitForm },
  props: {
    user: {
      type: Object,
      required: false
    },
    uploadType: String
  },

  data () {
    return {
      file: null
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const formData = new FormData()
      let promise

      if (this.uploadType === 'avatar') {
        formData.append('user[avatar]', this.file)
        promise = CurrentUserApi.avatar(formData)
      } else {
        formData.append('user[banner]', this.file)
        promise = CurrentUserApi.banner(formData)
      }

      promise
        .then(() => {
          this.$router.push('/')
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'user')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
