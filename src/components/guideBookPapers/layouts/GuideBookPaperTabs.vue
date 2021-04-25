<template>
  <v-tabs
    show-arrows
  >

    <!-- Info tabs -->
    <v-tab to="infos">
      {{ $t('components.guideBookPaper.tabs.info') }}
    </v-tab>

    <!-- Crags list tabs -->
    <v-tab to="crags">
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
    <v-tab to="photos">
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
    <v-tab to="links">
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
    <v-tab to="map">
      {{ $t('components.guideBookPaper.tabs.map') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'GuideBookPaperTabs',
  props: {
    guideBookPaper: Object
  }
}
</script>
