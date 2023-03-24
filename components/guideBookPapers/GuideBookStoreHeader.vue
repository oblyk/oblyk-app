<template>
  <v-card>
    <v-card-title>
      <h2>
        {{ $t('components.layout.appDrawer.user.guideBooks') }}
      </h2>
    </v-card-title>
    <v-card-text>
      <v-row>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            :icon="mdiBookMultiple"
            :item-title="$t('components.guideBookPaper.figures.numberOfGuides')"
            :item-value="figures.guide_book_count || '...'"
            :item-suffix="$t('components.guideBookPaper.figures.guides')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            :icon="mdiBookOpenPageVariantOutline"
            :item-title="$t('components.guideBookPaper.figures.pages')"
            :item-value="figures.pages_count || '...'"
            :item-suffix="$t('components.guideBookPaper.figures.pages')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            :icon="mdiCurrencyEur"
            :item-title="$t('components.guideBookPaper.figures.value')"
            :item-value="figures.sum_price || '...'"
            item-suffix="€"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            :icon="mdiWeight"
            :item-title="$t('components.guideBookPaper.figures.weight')"
            :item-value="figures.sum_weight || '...'"
            item-suffix="kg"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            :icon="mdiTerrain"
            :item-title="$t('components.guideBookPaper.figures.cragsCount')"
            :item-value="figures.crags_count || '...'"
            :item-suffix="$t('components.guideBookPaper.figures.cragsCovered')"
          />
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <description-line
            :icon="mdiSourceBranch"
            :item-title="$t('components.guideBookPaper.figures.routesCount')"
            :item-value="figures.routes_count || '...'"
            :item-suffix="$t('components.guideBookPaper.figures.routes')"
          />
        </div>
        <div
          v-if="suggestGuides.length > 0"
          class="col-6 col-md-4 col-lg-3"
        >
          <p class="mb-1 font-weight-bold">
            <v-icon small left>
              {{ mdiBookshelf }}
            </v-icon>
            {{ $tc('components.guideBookPaper.figures.missingBook', suggestGuides.length, { count: suggestGuides.length }) }}
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
        <div
          v-if="newGuides.length > 0"
          class="col-6 col-md-4 col-lg-3"
        >
          <p class="mb-1 font-weight-bold">
            <v-icon small left>
              {{ mdiBookshelf }}
            </v-icon>
            {{ $t('components.guideBookPaper.figures.newGuides') }}
          </p>
          <div class="pl-7">
            <v-btn
              small
              outlined
              to="/guide-book-papers/new-versions"
            >
              {{ $tc('components.guideBookPaper.figures.seeNewGuides', newGuides.length, { count: newGuides.length }) }}
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
        <v-icon left>
          {{ mdiMapMarkerRadiusOutline }}
        </v-icon>
        {{ $t('components.guideBookPaper.findGuideBook') }}
      </v-btn>
      <v-btn
        text
        color="primary"
        to="/home/guide-books/add"
      >
        <v-icon left>
          {{ mdiBookPlus }}
        </v-icon>
        {{ $t('components.guideBookPaper.addGuideBook') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  mdiBookMultiple,
  mdiBookOpenPageVariantOutline,
  mdiCurrencyEur,
  mdiWeight,
  mdiTerrain,
  mdiSourceBranch,
  mdiBookshelf,
  mdiMapMarkerRadiusOutline,
  mdiBookPlus
} from '@mdi/js'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import DescriptionLine from '@/components/ui/DescriptionLine'

export default {
  name: 'GuideBookStoreHeader',
  components: { DescriptionLine },
  props: {
    figures: {
      type: Object,
      default: null
    },
    currentUser: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      mdiBookMultiple,
      mdiBookOpenPageVariantOutline,
      mdiCurrencyEur,
      mdiWeight,
      mdiTerrain,
      mdiSourceBranch,
      mdiBookshelf,
      mdiMapMarkerRadiusOutline,
      mdiBookPlus,
      suggestGuides: [],
      newGuides: []
    }
  },

  created () {
    this.getRecommendedGuides()
    this.newGuidesVersion()
  },

  methods: {
    getRecommendedGuides () {
      new CurrentUserApi(this.$axios, this.$auth)
        .ascentsWithoutGuides()
        .then((resp) => {
          this.suggestGuides = resp.data
        })
    },

    newGuidesVersion () {
      new CurrentUserApi(this.$axios, this.$auth)
        .newGuideBooksVersion()
        .then((resp) => {
          this.newGuides = resp.data
        })
    }
  }
}
</script>
