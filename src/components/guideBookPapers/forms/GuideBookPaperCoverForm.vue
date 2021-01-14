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
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'

export default {
  name: 'GuideBookPaperCoverForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],

  props: {
    guideBookPaper: Object
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

      formData.append('guide_book_paper[cover]', this.file)

      GuideBookPaperApi
        .cover(
          formData,
          this.guideBookPaper.id
        )
        .then(() => {
          this.$router.push(this.guideBookPaper.url())
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
