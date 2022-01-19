<template>
  <v-tabs show-arrows >
    <v-tab :to="`${user.currentUserPath}/favorites/crags`">
      {{ $t('components.user.tabs.crags') }}
    </v-tab>
    <v-tab :to="`${user.currentUserPath}/favorites/gyms`">
      {{ $t('components.user.tabs.gyms') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'UserFavoriteTabs',
  props: {
    user: { type: Object, required: true }
  }
}
</script>
