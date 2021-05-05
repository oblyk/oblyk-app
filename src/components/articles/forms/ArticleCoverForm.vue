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
      :progressable="true"
      :progress-value="uploadPercentage"
    />
  </v-form>
</template>
<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import { AppConcern } from '@/concerns/AppConcern'
import { SessionConcern } from '@/concerns/SessionConcern'
import SubmitForm from '@/components/forms/SubmitForm'
import CloseForm from '@/components/forms/CloseForm'
import Article from '@/models/Article'
import axios from 'axios'

export default {
  name: 'ArticleCoverForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers, AppConcern, SessionConcern],

  props: {
    article: Object
  },

  data () {
    return {
      redirectTo: null,
      uploadPercentage: 0,
      file: null
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const formData = new FormData()

      formData.append('article[cover]', this.file)

      axios({
        method: 'POST',
        url: `${this.baseUrl}/articles/${this.article.id}/add_cover.json`,
        headers: {
          Authorization: this.getToken,
          HttpApiAccessToken: this.apiAccessToken,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
        },
        data: formData
      })
        .then(resp => {
          const article = new Article(resp.data)
          this.$router.push(article.path())
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'article')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
