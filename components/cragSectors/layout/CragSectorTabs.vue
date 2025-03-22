<template>
  <v-tabs
    show-arrows
  >
    <v-tab :to="cragSector.path">
      {{ $t('components.crag.tabs.info') }}
    </v-tab>
    <v-tab :to="`${cragSector.path}/photos`">
      <v-badge
        color="primary"
        inline
        :value="cragSector.photo_count > 0"
        :content="cragSector.photo_count"
      >
        {{ $t('components.crag.tabs.media') }}
      </v-badge>
    </v-tab>
    <v-tab :to="`${cragSector.path}/maps`">
      {{ $t('components.crag.tabs.map') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'CragSectorTabs',
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  }
}
</script>
