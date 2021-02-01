<template>
  <v-tabs
    show-arrows
  >
    <v-tab to="infos">
      {{ $t('components.area.tabs.info') }}
    </v-tab>
    <v-tab to="crags">
      <v-badge
        color="primary"
        inline
        v-if="area.crags_count"
        :content="area.crags_count"
      >
        {{ $t('components.area.tabs.crags') }}
      </v-badge>
      <span v-else>
        {{ $t('components.area.tabs.crags') }}
      </span>
    </v-tab>
    <v-tab to="photos">
      {{ $t('components.area.tabs.photos') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'AreaTabs',
  props: {
    area: Object
  }
}
</script>
