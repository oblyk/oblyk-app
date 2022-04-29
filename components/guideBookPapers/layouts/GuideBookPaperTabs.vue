<template>
  <v-tabs
    show-arrows
  >
    <!-- Info tabs -->
    <v-tab :to="guideBookPaper.path">
      {{ $t('components.guideBookPaper.tabs.info') }}
    </v-tab>

    <!-- Crags list tabs -->
    <v-tab :to="`${guideBookPaper.path}/crags`">
      <v-badge
        color="primary"
        inline
        value="guideBookPaper.crags_count > 0"
        :content="guideBookPaper.crags_count"
      >
        {{ $t('components.guideBookPaper.tabs.crags') }}
      </v-badge>
    </v-tab>

    <!-- Photos tabs -->
    <v-tab :to="`${guideBookPaper.path}/photos`">
      <v-badge
        color="primary"
        inline
        value="guideBookPaper.photos_count > 0"
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
