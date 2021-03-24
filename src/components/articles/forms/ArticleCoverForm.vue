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
import ArticleApi from '@/services/oblyk-api/ArticleApi'
import Article from '@/models/Article'

export default {
  name: 'ArticleCoverForm',
  components: { CloseForm, SubmitForm },
  mixins: [FormHelpers],

  props: {
    article: Object
  },

  data () {
    return {
      redirectTo: null,
      file: null
    }
  },

  methods: {
    submit: function () {
      this.submitOverlay = true
      const formData = new FormData()

      formData.append('article[cover]', this.file)

      ArticleApi
        .cover(
          formData,
          this.article.id
        )
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
