<template>
  <v-tabs
    show-arrows
  >
    <v-tab to="infos">
      {{ $t('components.guideBookPaper.tabs.info') }}
    </v-tab>
    <v-tab to="crags">
      <v-badge
        color="primary"
        inline
        :content="guideBookPaper.crags_count"
      >
        {{ $t('components.guideBookPaper.tabs.crags') }}
      </v-badge>
    </v-tab>
    <v-tab to="photos">
      <v-badge
        color="primary"
        inline
        :content="guideBookPaper.photos_count"
      >
        {{ $t('components.guideBookPaper.tabs.photos') }}
      </v-badge>
    </v-tab>
    <v-tab to="links">
      <v-badge
        color="primary"
        inline
        :content="guideBookPaper.links_count"
      >
        {{ $t('components.guideBookPaper.tabs.links') }}
      </v-badge>
    </v-tab>
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
