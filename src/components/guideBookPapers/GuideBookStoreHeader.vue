<template>
  <v-card>
    <v-card-title class="loved-by-king">
      <h2>
        {{ $t('components.layout.appDrawer.user.guideBooks') }}
      </h2>
    </v-card-title>
    <v-card-text>
      <v-row>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            icon="mdi-book-multiple"
            :item-title="$t('components.guideBookPaper.figures.numberOfGuides')"
            :item-value="figures.guide_book_count || '...'"
            :item-suffix="$t('components.guideBookPaper.figures.guides')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            icon="mdi-book-open-page-variant-outline"
            :item-title="$t('components.guideBookPaper.figures.pages')"
            :item-value="figures.pages_count || '...'"
            :item-suffix="$t('components.guideBookPaper.figures.pages')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            icon="mdi-currency-usd"
            :item-title="$t('components.guideBookPaper.figures.value')"
            :item-value="figures.sum_price || '...'"
            item-suffix="€"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            icon="mdi-weight"
            :item-title="$t('components.guideBookPaper.figures.weight')"
            :item-value="figures.sum_weight || '...'"
            item-suffix="kg"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            icon="mdi-terrain"
            :item-title="$t('components.guideBookPaper.figures.cragsCount')"
            :item-value="figures.crags_count || '...'"
            :item-suffix="$t('components.guideBookPaper.figures.cragsCovered')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            icon="mdi-source-branch"
            :item-title="$t('components.guideBookPaper.figures.routesCount')"
            :item-value="figures.routes_count || '...'"
            :item-suffix="$t('components.guideBookPaper.figures.routes')"
          />
        </div>
        <div
          class="col-6 col-md-4 col-lg-3"
          v-if="guides.length > 0"
        >
          <p class="mb-1 font-weight-bold">
            <v-icon small left>mdi-bookshelf</v-icon>
            {{ $tc('components.guideBookPaper.figures.missingBook', guides.length, { count: guides.length }) }}
          </p>
          <div class="pl-7">
            <v-btn
              small
              outlined
              to="/guide-book-papers/recommended"
            >
              {{ $t('components.guideBookPaper.figures.seeGuides') }}
            </v-btn>
          </div>
        </div>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        text
        color="primary"
        to="/guide-book-papers/find"
      >
        <v-icon left>mdi-map-marker-radius-outline</v-icon>
        {{ $t('components.guideBookPaper.findGuideBook') }}
      </v-btn>
      <v-btn
        text
        color="primary"
        :to="`/me/${currentUser.slug_name}/guide-books/add`"
      >
        <v-icon left>mdi-book-plus</v-icon>
        {{ $t('components.guideBookPaper.addGuideBook') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CurrentUserApi from '@/services/oblyk-api/CurrentUserApi'
import GuideBookPaper from '@/models/GuideBookPaper'
import DescriptionLine from '@/components/ui/DescriptionLine'

export default {
  name: 'GuideBookStoreHeader',
  components: { DescriptionLine },
  props: {
    figures: Object,
    currentUser: Object
  },

  data () {
    return {
      guides: []
    }
  },

  created () {
    this.getRecommendedGuides()
  },

  methods: {
    getRecommendedGuides: function () {
      CurrentUserApi
        .ascentsWithoutGuides()
        .then(resp => {
          for (const guide of resp.data) {
            this.guides.push(new GuideBookPaper(guide))
          }
        })
    }
  }
}
</script>
