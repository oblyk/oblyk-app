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

export default {
  name: 'AddGuideBookOnLibraryForm',
  components: { GuideBookPaperSearchForm, OverlayForm, CloseForm },
  mixins: [FormHelpers],

  methods: {
    addGuideBookPaper (guide) {
      return false
    }
  }
}
</script>
