<template>
  <v-form @submit.prevent="submit()">
    <v-text-field
      outlined
      v-model="data.name"
      required
      :label="$t('models.guideBookPdf.name')"
    />

    <v-text-field
      outlined
      v-model="data.author"
      :label="$t('models.guideBookPdf.author')"
    />

    <v-text-field
      outlined
      type="number"
      v-model="data.publication_year"
      :label="$t('models.guideBookPdf.publication_year')"
    />

    <v-textarea
      outlined
      v-model="data.description"
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
      :submit-local-key="submitText()"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import GuideBookPdfApi from '@/services/oblyk-api/GuideBookPdfApi'

export default {
  name: 'GuideBookPdfForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],
  props: {
    guideBookPdf: {
      type: Object,
      required: false
    },
    cragId: [String, Number]
  },

  data () {
    return {
      redirectTo: null,
      file: null,
      data: {
        id: (this.guideBookPdf || {}).id,
        crag_id: (this.guideBookPdf || {}).crag_id || this.cragId,
        name: (this.guideBookPdf || {}).name,
        publication_year: (this.guideBookPdf || {}).publication_year,
        author: (this.guideBookPdf || {}).author,
        description: (this.guideBookPdf || {}).description
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
      const formData = new FormData()
      let promise

      if (this.isEditingForm()) {
        promise = GuideBookPdfApi.update(this.data)
      } else {
        formData.append('guide_book_pdf[description]', this.data.description)
        formData.append('guide_book_pdf[name]', this.data.name)
        formData.append('guide_book_pdf[publication_year]', this.data.publication_year)
        formData.append('guide_book_pdf[crag_id]', this.data.crag_id)
        formData.append('guide_book_pdf[pdf_file]', this.file)
        promise = GuideBookPdfApi.create(formData)
      }

      promise
        .then(() => {
          this.$router.push(this.redirectTo)
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'guideBookPdf')
        })
        .then(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
