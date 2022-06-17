<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="text-center mb-5">
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
                v-for="(guide, index) in guides"
                :key="`guide-${index}-${guide.id}`"
                cols="12"
                md="6"
                lg="3"
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
          <nuxt-link
            to="/sign-in"
          >
            {{ $t('components.guideBookPaper.recommended.connectYou') }}
          </nuxt-link>
        </p>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import { SessionConcern } from '~/concerns/SessionConcern'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import GuideBookPaper from '~/models/GuideBookPaper'
import GuideBookPaperCoverCard from '~/components/guideBookPapers/GuideBookPaperCoverCard'
import Spinner from '~/components/layouts/Spiner'
import AppFooter from '~/components/layouts/AppFooter'

export default {
  components: { Spinner, GuideBookPaperCoverCard, AppFooter },
  mixins: [SessionConcern, LoadingMoreHelpers],

  data () {
    return {
      guides: [],
      loadingGuide: true
    }
  },

  head () {
    return {
      title: this.$t('meta.recommendedGuides.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.recommendedGuides.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.recommendedGuides.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.recommendedGuides.description') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  },

  created () {
    this.getGuides()
  },

  methods: {
    getGuides () {
      if (!this.isLoggedIn) { return false }

      this.loadingGuide = true
      new CurrentUserApi(this.$axios, this.$auth)
        .ascentsWithoutGuides()
        .then((resp) => {
          for (const guide of resp.data) {
            this.guides.push(new GuideBookPaper({ attributes: guide }))
          }
        }).finally(() => {
          this.loadingGuide = false
        })
    }
  }
}
</script>
