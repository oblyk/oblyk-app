<template>
  <v-tabs
    show-arrows
  >
    <v-tab to="infos">
      {{ $t('components.crag.tabs.info') }}
    </v-tab>
    <v-tab to="photos">
      <v-badge
        color="primary"
        inline
        :value="cragSector.photo_count > 0"
        :content="cragSector.photo_count"
      >
        {{ $t('components.crag.tabs.media') }}
      </v-badge>
    </v-tab>
    <v-tab to="maps">
      {{ $t('components.crag.tabs.map') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'CragSectorTabs',
  props: {
    cragSector: Object
  }
}
</script>
