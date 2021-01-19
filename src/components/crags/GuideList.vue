<template>
  <div>
    <spinner
      class="mt-7"
      v-if="loadingGuides"
      :full-height="false"
    />

    <div v-if="!loadingGuides">
      <div
        class="guide-box"
        v-for="(guide, index) in guides"
        :key="`guide-${index}`"
      >
        <div v-if="guide.className === 'GuideBookPaper'">
          <guide-book-paper-small-card :guide-book-paper="guide" />
        </div>

        <div v-if="guide.className === 'GuideBookWeb'">
          <guide-book-web-small-card :guide-book-web="guide" />
        </div>

        <div v-if="guide.className === 'GuideBookPdf'">
          <guide-book-pdf-small-card :guide-book-pdf="guide" />
        </div>
      </div>

      <div
        class="text-center"
        v-if="limite && guides_count > 0 && limite < guides_count"
      >
        <v-btn
          :to="linkToMore"
          text
          small
          color="primary"
        >
          {{ $t('actions.seeNumberMore', { number: guides_count - limite }) }}
        </v-btn>
      </div>

      <p
        class="text-center mt-10"
        v-if="guides.length === 0"
      >
        {{ $t('components.crag.noGuide') }}<br>
        <add-guide-book-btn :crag="crag" />
      </p>
    </div>
  </div>
</template>

<script>
import CragApi from '@/services/oblyk-api/CragApi'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPdf from '@/models/GuideBookPdf'
import GuideBookWeb from '@/models/GuideBookWeb'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import GuideBookWebSmallCard from '@/components/guideBookWebs/GuideBookWebSmallCard'
import GuideBookPdfSmallCard from '@/components/guideBookPdfs/GuideBookPdfSmallCard'
import AddGuideBookBtn from '@/components/crags/forms/AddGuideBookBtn'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'GuideList',
  components: { Spinner, AddGuideBookBtn, GuideBookPdfSmallCard, GuideBookWebSmallCard, GuideBookPaperSmallCard },
  props: {
    crag: Object,
    limite: {
      type: Number,
      required: false
    },
    linkToMore: {
      type: String,
      required: false
    }
  },

  data () {
    return {
      guides: [],
      loadingGuides: true,
      guides_count: 0
    }
  },

  mounted () {
    this.getGuides()
  },

  methods: {
    getGuides: function () {
      this.loadingGuides = true
      CragApi
        .guides(this.crag.id)
        .then(resp => {
          this.guides_count = resp.data.length
          let loop = 0
          for (const guide of resp.data) {
            if (this.limite && this.limite === loop) break

            if (guide.guide_type === 'GuideBookPaper') this.guides.push(new GuideBookPaper(guide.guide))
            if (guide.guide_type === 'GuideBookPdf') this.guides.push(new GuideBookPdf(guide.guide))
            if (guide.guide_type === 'GuideBookWeb') this.guides.push(new GuideBookWeb(guide.guide))
            loop++
          }
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'crag')
        })
        .finally(() => {
          this.loadingGuides = false
        })
    }
  }
}
</script>
