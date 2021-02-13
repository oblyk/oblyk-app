<template>
  <v-tabs
    height="30"
    show-arrows
  >
    <v-tab :to="user.mePath('ascents/send-list')">
      {{ $t('components.user.ascentTabs.sendList') }}
    </v-tab>
    <v-tab :to="user.mePath('ascents/tick-list')">
      {{ $t('components.user.ascentTabs.tickList') }}
    </v-tab>
    <v-tab :to="user.mePath('ascents/analytiks')">
      {{ $t('components.user.ascentTabs.analytiks') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'UserAccentsTabs',
  props: {
    user: Object
  }
}
</script>
