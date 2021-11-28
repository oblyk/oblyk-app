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
          <p class="mb-1 font-weight-bold">
            <v-icon small left>mdi-book-multiple</v-icon>
            {{ $t('components.guideBookPaper.figures.numberOfGuides') }}
          </p>
          <div class="pl-7">
            {{ figures.guide_book_count || '...' }} {{ $t('components.guideBookPaper.figures.guides') }}
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <p class="mb-1 font-weight-bold">
            <v-icon small left>mdi-book-open-page-variant-outline</v-icon>
            {{ $t('components.guideBookPaper.figures.pages') }}
          </p>
          <div class="pl-7">
            {{ figures.pages_count || '...' }} {{ $t('components.guideBookPaper.figures.pages') }}
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <p class="mb-1 font-weight-bold">
            <v-icon small left>mdi-currency-usd</v-icon>
            {{ $t('components.guideBookPaper.figures.value') }}
          </p>
          <div class="pl-7">
            {{ figures.sum_price || '...' }} €
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <p class="mb-1 font-weight-bold">
            <v-icon small left>mdi-weight</v-icon>
            {{ $t('components.guideBookPaper.figures.weight') }}
          </p>
          <div class="pl-7">
            {{ figures.sum_weight || '...' }} kg
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <p class="mb-1 font-weight-bold">
            <v-icon small left>mdi-terrain</v-icon>
            {{ $t('components.guideBookPaper.figures.cragsCount') }}
          </p>
          <div class="pl-7">
            {{ figures.crags_count || '...' }} {{ $t('components.guideBookPaper.figures.cragsCovered') }}
          </div>
        </div>
        <div class="col-6 col-md-4 col-lg-3">
          <p class="mb-1 font-weight-bold">
            <v-icon small left>mdi-source-branch</v-icon>
            {{ $t('components.guideBookPaper.figures.routesCount') }}
          </p>
          <div class="pl-7">
            {{ figures.routes_count || '...' }} {{ $t('components.guideBookPaper.figures.routes') }}
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
export default {
  name: 'GuideBookStoreHeader',
  props: {
    figures: Object,
    currentUser: Object
  }
}
</script>
