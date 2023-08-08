<template>
  <div>
    <div class="mb-10">
      <guide-book-paper-search-form
        :callback="addGuideBookPaper"
        :linkable-result="false"
      />
    </div>

    <p class="text-decoration-underline">
      {{ $t('components.crag.guideAroundThisCrag') }} : {{ crag.name }}
    </p>

    <spinner v-if="loadingAroundGuideBooks" :full-height="false" />

    <div v-if="!loadingAroundGuideBooks">
      <div
        v-for="guideBookPaper in aroundGuideBooks"
        :key="`around-guide-book-${guideBookPaper.id}`"
        @click="addGuideBookPaper(guideBookPaper)"
      >
        <guide-book-paper-small-card
          class="mb-3"
          :guide-book-paper="guideBookPaper"
          :linkable="false"
        />
      </div>

      <p
        v-if="aroundGuideBooks.length === 0"
        class="text-center text--disabled"
      >
        {{ $t('components.guideBookPaper.noGuideAround') }}
      </p>

      <p class="text-decoration-underline mt-10 mb-5">
        {{ $t('components.guideBookPaper.explainNewTopo') }}
      </p>

      <div class="text-right">
        <v-btn
          text
          color="primary"
          :to="`/guide-book-papers/new?add_crag_id=${crag.id}`"
        >
          <v-icon
            left
          >
            {{ mdiPlus }}
          </v-icon>
          {{ $t('actions.addGuideBook') }}
        </v-btn>
      </div>
    </div>
    <close-form />
    <overlay-form :overlay="submitOverlay" />
  </div>
</template>

<script>
import { mdiPlus } from '@mdi/js'
import { FormHelpers } from '@/mixins/FormHelpers'
import CragApi from '~/services/oblyk-api/CragApi'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPaperSmallCard from '@/components/guideBookPapers/GuideBookPaperSmallCard'
import Spinner from '@/components/layouts/Spiner'
import CloseForm from '@/components/forms/CloseForm'
import OverlayForm from '@/components/forms/OverlayForm'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import GuideBookPaperSearchForm from '@/components/guideBookPapers/forms/GuideBookPaperSearchForm'

export default {
  name: 'AddGuideBookOnCragForm',
  components: { GuideBookPaperSearchForm, OverlayForm, CloseForm, Spinner, GuideBookPaperSmallCard },
  mixins: [FormHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPlus,
      loadingAroundGuideBooks: true,
      aroundGuideBooks: []
    }
  },

  mounted () {
    this.getGuideBookAround()
  },

  methods: {
    getGuideBookAround () {
      this.loadingAroundGuideBooks = true
      new CragApi(this.$axios, this.$auth)
        .guideBooksAround(this.crag.id)
        .then((resp) => {
          for (const guideBook of resp.data) {
            this.aroundGuideBooks.push(new GuideBookPaper({ attributes: guideBook }))
          }
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
        })
        .finally(() => {
          this.loadingAroundGuideBooks = false
        })
    },

    addGuideBookPaper (guideBookPaper) {
      new GuideBookPaperApi(this.$axios, this.$auth)
        .addCrag(guideBookPaper.id, this.crag.id)
        .then(() => {
          this.$router.push(`${this.crag.path}/guide-books`)
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
        })
    }
  }
}
</script>
