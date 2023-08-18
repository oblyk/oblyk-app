<template>
  <div>
    <!-- Loading -->
    <div v-if="loadingGuides">
      <v-skeleton-loader
        class="mx-auto"
        type="list-item-avatar-two-line, list-item-avatar-two-line"
      />
    </div>

    <!-- Guides list -->
    <div v-if="!loadingGuides">
      <div
        v-for="(guide, index) in guides"
        :key="`guide-${index}`"
        class="guide-box"
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
        v-if="limite && guides_count > 0 && limite < guides_count"
        class="text-center"
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

      <client-only>
        <p
          v-if="guides.length === 0 && $auth.loggedIn"
          class="text-center mt-10"
        >
          {{ $t('components.crag.noGuide') }}<br>
          <add-guide-book-btn :crag="crag" />
        </p>
      </client-only>
    </div>
  </div>
</template>

<script>
import CragApi from '~/services/oblyk-api/CragApi'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPdf from '@/models/GuideBookPdf'
import GuideBookWeb from '@/models/GuideBookWeb'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import GuideBookWebSmallCard from '@/components/guideBookWebs/GuideBookWebSmallCard'
import GuideBookPdfSmallCard from '@/components/guideBookPdfs/GuideBookPdfSmallCard'
import AddGuideBookBtn from '@/components/crags/forms/AddGuideBookBtn'

export default {
  name: 'GuideList',
  components: {
    AddGuideBookBtn,
    GuideBookPdfSmallCard,
    GuideBookWebSmallCard,
    GuideBookPaperSmallCard
  },
  props: {
    crag: {
      type: Object,
      required: true
    },
    limite: {
      type: Number,
      default: null
    },
    linkToMore: {
      type: String,
      default: null
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
    getGuides () {
      this.loadingGuides = true
      new CragApi(this.$axios, this.$auth)
        .guides(this.crag.id)
        .then((resp) => {
          this.guides_count = resp.data.length
          let loop = 0
          for (const guide of resp.data) {
            if (this.limite && this.limite === loop) { break }

            if (guide.guide_type === 'GuideBookPaper') { this.guides.push(new GuideBookPaper({ attributes: guide.guide })) }
            if (guide.guide_type === 'GuideBookPdf') { this.guides.push(new GuideBookPdf({ attributes: guide.guide })) }
            if (guide.guide_type === 'GuideBookWeb') { this.guides.push(new GuideBookWeb({ attributes: guide.guide })) }
            loop++
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'crag')
        })
        .finally(() => {
          this.loadingGuides = false
        })
    }
  }
}
</script>
