<template>
  <v-tabs show-arrows >
    <!-- Photos -->
    <v-tab :to="`${user.currentUserPath}/media/photos`">
      {{ user.photos_count }}
      {{ $t('components.user.tabs.photos') }}
    </v-tab>

    <!-- Videos -->
    <v-tab :to="`${user.currentUserPath}/media/videos`">
      {{ user.videos_count }}
      {{ $t('components.user.tabs.videos') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'CurrentUserMediaTabs',
  props: {
    user: { type: Object, required: true }
  }
}
</script>
