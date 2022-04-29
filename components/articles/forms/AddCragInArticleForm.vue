<template>
  <div>
    <crag-search-form
      :linkable-result="false"
      :callback="addCrag"
    />
    <close-form />
    <overlay-form :overlay="submitOverlay" />
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import CragSearchForm from '@/components/crags/forms/CragSearchForm'
import CloseForm from '@/components/forms/CloseForm'
import OverlayForm from '@/components/forms/OverlayForm'
import ArticleApi from '~/services/oblyk-api/ArticleApi'

export default {
  name: 'AddCragInArticleForm',
  components: { OverlayForm, CloseForm, CragSearchForm },
  mixins: [FormHelpers],

  props: {
    article: {
      type: Object,
      required: true
    }
  },

  methods: {
    addCrag (crag) {
      this.submitOverlay = true

      new ArticleApi(this.$axios, this.$auth)
        .addCrag(this.article.id, crag.id)
        .then(() => {
          this.$router.push(this.article.path)
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
