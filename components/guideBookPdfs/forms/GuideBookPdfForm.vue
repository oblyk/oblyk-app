<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      v-model="data.name"
      outlined
      required
      :label="$t('models.guideBookPdf.name')"
    />

    <v-text-field
      v-model="data.author"
      outlined
      :label="$t('models.guideBookPdf.author')"
    />

    <v-text-field
      v-model="data.publication_year"
      outlined
      type="number"
      :label="$t('models.guideBookPdf.publication_year')"
    />

    <v-textarea
      v-model="data.description"
      outlined
      :label="$t('models.guideBookPdf.description')"
    />

    <v-file-input
      v-if="!isEditingForm()"
      v-model="file"
      outlined
      truncate-length="15"
      :placeholder="$t('actions.browse')"
    />

    <close-form />
    <submit-form
      :overlay="submitOverlay"
      :progressable="!isEditingForm()"
      :progress-value="uploadPercentage"
      :submit-local-key="submitText()"
    />
  </v-form>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import GuideBookPdfApi from '~/services/oblyk-api/GuideBookPdfApi'

export default {
  name: 'GuideBookPdfForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers, AppConcern],
  props: {
    guideBookPdf: {
      type: Object,
      default: null
    },
    cragId: {
      type: [String, Number],
      default: null
    }
  },

  data () {
    return {
      redirectTo: null,
      file: null,
      uploadPercentage: 0,
      data: {
        id: this.guideBookPdf?.id,
        crag_id: this.guideBookPdf?.crag?.id || this.cragId,
        name: this.guideBookPdf?.name,
        publication_year: this.guideBookPdf?.publication_year,
        author: this.guideBookPdf?.author,
        description: this.guideBookPdf?.description
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

      if (this.isEditingForm()) {
        new GuideBookPdfApi(this.$axios, this.$auth)
          .update(this.data)
          .then(() => {
            this.$router.push(this.redirectTo)
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'guideBookPdf')
          })
          .then(() => {
            this.submitOverlay = false
          })
      } else {
        const formData = new FormData()
        formData.append('guide_book_pdf[description]', this.data.description)
        formData.append('guide_book_pdf[name]', this.data.name)
        formData.append('guide_book_pdf[author]', this.data.author)
        formData.append('guide_book_pdf[publication_year]', this.data.publication_year)
        formData.append('guide_book_pdf[crag_id]', this.data.crag_id)
        formData.append('guide_book_pdf[pdf_file]', this.file)
        const url = `${this.baseUrl}/public/guide_book_pdfs.json`
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
            this.$router.push(this.redirectTo)
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'guideBookPdf')
          })
          .then(() => {
            this.submitOverlay = false
          })
      }
    }
  }
}
</script>
