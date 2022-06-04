<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="mb-10 mt-5 text-center">
        {{ $t('components.library.title') }}
      </h1>

      <p class="mb-10" v-html="$t('components.library.intro')" />

      <v-sheet
        v-if="!$fetchState.pending"
        rounded
        class="row pa-5"
      >
        <v-select
          v-model="orderBy"
          outlined
          dense
          hide-details
          :items="groupItems"
          item-text="text"
          item-value="value"
          :label="$t('components.library.orderBy')"
        />
      </v-sheet>

      <!-- Loading guide book -->
      <div v-if="$fetchState.pending || loading">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-4">
            <v-skeleton-loader
              class="mx-auto"
              type="image, list-item-two-line"
            />
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <v-skeleton-loader
              class="mx-auto"
              type="image, list-item-two-line"
            />
          </div>
          <div class="col-12 col-md-6 col-lg-4">
            <v-skeleton-loader
              class="mx-auto"
              type="image, list-item-two-line"
            />
          </div>
        </div>
      </div>

      <div v-if="!loading">
        <div
          v-for="(group, index) in groupGuides"
          :key="`guides-group-${index}`"
          class="row"
        >
          <v-sheet
            class="col-12 mt-10 mb-3"
            rounded
          >
            <h3 class="border-bottom">
              {{ group.title }}
              <small class="font-weight-regular">
                {{ $tc('components.library.guides', group.guides.length, { count: group.guides.length } ) }}
              </small>
            </h3>
          </v-sheet>
          <div
            v-for="(guide, guideIndex) in group.guides"
            :key="`guide-book-${guideIndex}`"
            class="col-12 col-md-6 col-lg-4"
          >
            <guide-book-paper-cover-card
              :guide-book-paper="toGuideObject(guide)"
            />
          </div>
        </div>
      </div>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'
import GuideBookPaperApi from '~/services/oblyk-api/GuideBookPaperApi'
import GuideBookPaper from '~/models/GuideBookPaper'
import GuideBookPaperCoverCard from '~/components/guideBookPapers/GuideBookPaperCoverCard'

export default {
  components: {
    GuideBookPaperCoverCard,
    AppFooter
  },

  data () {
    return {
      loading: false,
      orderBy: 'publication_year',
      groupGuides: [],
      groupItems: [
        { text: this.$t('components.library.groupItems.year'), value: 'publication_year' },
        { text: this.$t('components.library.groupItems.alphabetic'), value: 'alphabetic' }
      ]
    }
  },

  async fetch () {
    await new GuideBookPaperApi(
      this.$axios,
      this.$auth
    )
      .grouped()
      .then((resp) => {
        this.groupGuides = resp.data
      })
  },

  head () {
    return {
      title: this.$t('meta.library.title'),
      description: this.$t('meta.library.description'),
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og:title', property: 'og:title', content: this.title },
        { hid: 'og:description', property: 'og:description', content: this.description },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  },

  watch: {
    orderBy () {
      this.getGuideBook()
    }
  },

  methods: {
    toGuideObject (guide) {
      return new GuideBookPaper({ attributes: guide })
    },

    getGuideBook () {
      const direction = this.orderBy === 'publication_year' ? 'desc' : 'asc'
      this.loading = true
      new GuideBookPaperApi(
        this.$axios,
        this.$auth
      )
        .grouped(this.orderBy, direction)
        .then((resp) => {
          this.groupGuides = resp.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
