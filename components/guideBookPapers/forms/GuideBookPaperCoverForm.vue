<template>
  <v-form
    enctype="multipart/form-data"
    @submit.prevent="submit()"
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
      :progressable="true"
      :progress-value="uploadPercentage"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GuideBookPaperCoverForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers, AppConcern],

  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      file: null,
      uploadPercentage: 0
    }
  },

  methods: {
    submit () {
      this.submitOverlay = true
      const formData = new FormData()

      formData.append('guide_book_paper[cover]', this.file)

      const url = `${this.baseUrl}/public/guide_book_papers/${this.guideBookPaper.id}/add_cover.json`
      this.$axios.$request({
        method: 'POST',
        url,
        headers: {
          Authorization: this.$auth.$storage.getUniversal('_token.local'),
          HttpApiAccessToken: this.apiAccessToken,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        },
        data: formData
      })
        .then(() => {
          this.$router.push(this.guideBookPaper.path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'guide_book_paper')
        }).then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
