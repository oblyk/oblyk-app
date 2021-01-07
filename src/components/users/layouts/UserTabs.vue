<template>
  <v-tabs show-arrows >
    <v-tab to="/">
      {{ $t('components.user.tabs.feed') }}
    </v-tab>
    <v-tab :to="user.meUrl('settings')">
      {{ $t('components.user.tabs.settings') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'UserTabs',
  props: {
    user: Object
  }
}
</script>
