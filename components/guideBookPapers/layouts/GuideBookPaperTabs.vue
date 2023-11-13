<template>
  <v-tabs
    show-arrows
    class="rounded-sm mt-2 mb-3"
  >
    <!-- Info tabs -->
    <v-tab :to="guideBookPaper.path">
      {{ $t('components.guideBookPaper.tabs.info') }}
    </v-tab>

    <!-- Point of sales -->
    <v-tab :to="`${guideBookPaper.path}/points-of-sale`">
      <v-badge
        color="primary"
        inline
        :value="guideBookPaper.place_of_sales_count > 0"
        :content="guideBookPaper.place_of_sales_count"
      >
        {{ $t('components.guideBookPaper.tabs.pointsOfSale') }}
      </v-badge>
    </v-tab>

    <!-- Photos tabs -->
    <v-tab :to="`${guideBookPaper.path}/photos`">
      <v-badge
        color="primary"
        inline
        :value="guideBookPaper.photos_count > 0"
        :content="guideBookPaper.photos_count"
      >
        {{ $t('components.guideBookPaper.tabs.photos') }}
      </v-badge>
    </v-tab>

    <!-- Links tabs -->
    <v-tab :to="`${guideBookPaper.path}/links`">
      <v-badge
        color="primary"
        inline
        :value="guideBookPaper.links_count > 0"
        :content="guideBookPaper.links_count"
      >
        {{ $t('components.guideBookPaper.tabs.links') }}
      </v-badge>
    </v-tab>

    <!-- Map tabs -->
    <v-tab :to="`${guideBookPaper.path}/map`">
      {{ $t('components.guideBookPaper.tabs.map') }}
    </v-tab>

    <!-- Alternatives -->
    <v-tab :to="`${guideBookPaper.path}/alternatives`">
      {{ $t('components.guideBookPaper.tabs.alternatives') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'GuideBookPaperTabs',
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  }
}
</script>
