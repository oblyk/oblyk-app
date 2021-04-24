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
        v-if="guideBookPaper.crags_count > 0"
        :content="guideBookPaper.crags_count"
      >
        {{ $t('components.guideBookPaper.tabs.crags') }}
      </v-badge>
      <span v-else>
        {{ $t('components.guideBookPaper.tabs.crags') }}
      </span>
    </v-tab>

    <!-- Photos tabs -->
    <v-tab to="photos">
      <v-badge
        color="primary"
        inline
        v-if="guideBookPaper.photos_count > 0"
        :content="guideBookPaper.photos_count"
      >
        {{ $t('components.guideBookPaper.tabs.photos') }}
      </v-badge>
      <span v-else>
        {{ $t('components.guideBookPaper.tabs.photos') }}
      </span>
    </v-tab>

    <!-- Links tabs -->
    <v-tab to="links">
      <v-badge
        color="primary"
        inline
        :content="guideBookPaper.links_count"
        v-if="guideBookPaper.links_count > 0"
      >
        {{ $t('components.guideBookPaper.tabs.links') }}
      </v-badge>
      <span v-else>
        {{ $t('components.guideBookPaper.tabs.links') }}
      </span>
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
