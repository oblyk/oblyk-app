<template>
  <div>
    <div class="mb-10">
      <guide-book-paper-search-form
        :callback="addGuideBookPaper"
        :linkable-result="false"
      />
    </div>
    <close-form />
    <overlay-form :overlay="submitOverlay" />
  </div>
</template>

<script>
import { FormHelpers } from '@/mixins/FormHelpers'
import CloseForm from '@/components/forms/CloseForm'
import OverlayForm from '@/components/forms/OverlayForm'
import GuideBookPaperSearchForm from '@/components/guideBookPapers/forms/GuideBookPaperSearchForm'
import ArticleApi from '~/services/oblyk-api/ArticleApi'

export default {
  name: 'AddGuideBookInArticleForm',
  components: { GuideBookPaperSearchForm, OverlayForm, CloseForm },
  mixins: [FormHelpers],
  props: {
    article: {
      type: Object,
      required: true
    }
  },

  methods: {
    addGuideBookPaper (guideBookPaper) {
      new ArticleApi(this.$axios, this.$auth)
        .addGuideBookPaper(this.article.id, guideBookPaper.id)
        .then(() => {
          this.$router.push(this.article.path)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'article')
        })
    }
  }
}
</script>
