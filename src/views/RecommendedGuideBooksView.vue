<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="text-center loved-by-king mb-5">
        {{ $t('components.guideBookPaper.recommended.title') }}
      </h1>
      <div v-if="isLoggedIn">
        <div v-if="!loadingGuide">
          <div v-if="guides.length > 0">
            <p class="text-center mb-10">
              {{ $tc('components.guideBookPaper.recommended.guidesFound', guides.length, { count: guides.length }) }}
              <cite>{{ $t('components.guideBookPaper.recommended.relationToAscents') }}</cite>
            </p>
            <v-row>
              <v-col
                cols="12" md="6" lg="3"
                v-for="(guide, index) in guides"
                :key="`guide-${index}-${guide.id}`"
              >
                <guide-book-paper-cover-card
                  :subscribe-btn="true"
                  :guide-book-paper="guide"
                />
              </v-col>
            </v-row>
          </div>
          <div v-if="guides.length === 0">
            <p>
              {{ $t('components.guideBookPaper.recommended.completYouAscent') }}
            </p>
          </div>
        </div>
        <spinner v-if="loadingGuide" />
      </div>

      <!-- If not login -->
      <div v-if="!isLoggedIn">
        <p class="text-center mt-16 text--disabled">
          {{ $t('components.guideBookPaper.recommended.thisPageFind') }}<cite>{{ $t('components.guideBookPaper.recommended.relationToAscents') }}</cite><br>
          <router-link
            to="/sign-in"
          >
            {{ $t('components.guideBookPaper.recommended.connectYou') }}
          </router-link>
        </p>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import { LoadingMoreHelpers } from '@/mixins/LoadingMoreHelpers'
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import GuideBookPaper from '@/models/GuideBookPaper'
import GuideBookPaperCoverCard from '@/components/guideBookPapers/GuideBookPaperCoverCard'
import Spinner from '@/components/layouts/Spiner'
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'GlossaryView',
  components: { Spinner, GuideBookPaperCoverCard, AppFooter },
  mixins: [SessionConcern, LoadingMoreHelpers],

  metaInfo () {
    return {
      title: this.$t('meta.recommendedGuides.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.recommendedGuides.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.recommendedGuides.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.recommendedGuides.description') },
        { vmid: 'og-image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  },

  data () {
    return {
      guides: [],
      loadingGuide: true
    }
  },

  created () {
    this.getGuides()
  },

  methods: {
    getGuides: function () {
      if (!this.isLoggedIn) return false

      this.loadingGuide = true
      CurrentUserApi
        .ascentsWithoutGuides()
        .then(resp => {
          for (const guide of resp.data) {
            this.guides.push(new GuideBookPaper(guide))
          }
        }).finally(() => {
          this.loadingGuide = false
        })
    }
  }
}
</script>
