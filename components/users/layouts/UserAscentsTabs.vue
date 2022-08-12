<template>
  <v-tabs
    show-arrows
    class="border-bottom"
  >
    <v-tab :to="`${user.currentUserPath}/ascents/send-list`">
      {{ $t('components.user.ascentTabs.sendList') }}
    </v-tab>
    <v-tab :to="`${user.currentUserPath}/ascents/tick-list`">
      {{ $t('components.user.ascentTabs.tickList') }}
    </v-tab>
    <v-tab :to="`${user.currentUserPath}/ascents/projects`">
      {{ $t('components.user.ascentTabs.projects') }}
    </v-tab>
    <v-tab :to="`${user.currentUserPath}/ascents/analytiks`">
      {{ $t('components.user.ascentTabs.analytiks') }}
    </v-tab>
    <v-tab to="/maps/my-map">
      {{ $t('components.user.ascentTabs.myMap') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'UserAccentsTabs',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
