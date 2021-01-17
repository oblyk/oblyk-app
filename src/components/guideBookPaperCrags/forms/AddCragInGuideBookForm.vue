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
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'

export default {
  name: 'AddCragInGuideBookForm',
  components: { OverlayForm, CloseForm, CragSearchForm },
  mixins: [FormHelpers],

  props: {
    guideBookPaper: Object
  },

  methods: {
    addCrag: function (crag) {
      this.submitOverlay = true

      GuideBookPaperApi
        .addCrag(this.guideBookPaper.id, crag.id)
        .then(() => {
          this.$router.push(this.guideBookPaper.path('crags'))
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
        })
        .finally(() => {
          this.submitOverlay = false
        })
    }
  }
}
</script>
