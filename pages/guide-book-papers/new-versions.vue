<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="text-center mb-5">
        {{ $t('components.guideBookPaper.newVersion.title') }}
      </h1>
      <div v-if="isLoggedIn">
        <div v-if="!loadingGuide">
          <div v-if="guides.length > 0">
            <v-row
              v-for="(version, index) in guides"
              :key="`guide-${index}`"
              class="mb-13"
            >
              <v-col cols="12">
                <span
                  v-html="$t('components.guideBookPaper.newVersion.new_version_explain', { old_name: version.old_version.name, year: version.new_version.publication_year })"
                />
              </v-col>
              <v-col cols="6" md="4" lg="3">
                <guide-book-paper-cover-card
                  :subscribe-btn="true"
                  :guide-book-paper="version.old_version"
                  :show-author="false"
                  :show-year="true"
                />
              </v-col>
              <v-col cols="6" md="4" lg="3">
                <guide-book-paper-cover-card
                  :subscribe-btn="true"
                  :guide-book-paper="version.new_version"
                  :show-author="false"
                  :show-year="true"
                />
              </v-col>
            </v-row>
          </div>
        </div>
        <spinner v-if="loadingGuide" />
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
import AppFooter from '@/components/layouts/AppFooter'

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
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  },

  created () {
    this.getGuides()
  },

  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  },

  methods: {
    getGuides () {
      if (!this.isLoggedIn) { return false }

      this.loadingGuide = true
      new CurrentUserApi(this.$axios, this.$auth)
        .newGuideBooksVersion()
        .then((resp) => {
          this.guides = []
          for (const version of resp.data) {
            this.guides.push({
              old_version: new GuideBookPaper({ attributes: version.old_guide }),
              new_version: new GuideBookPaper({ attributes: version.new_guide })
            })
          }
        }).finally(() => {
          this.loadingGuide = false
        })
    }
  }
}
</script>
