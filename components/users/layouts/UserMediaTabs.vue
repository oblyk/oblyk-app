<template>
  <v-tabs
    show-arrows
    height="30"
    class="transparent-tabs"
  >
    <!-- Photos -->
    <v-tab :to="`${user.userPath}/media/photos`">
      {{ user.photos_count }}
      {{ $t('components.user.tabs.photos') }}
    </v-tab>

    <!-- Videos -->
    <v-tab :to="`${user.userPath}/media/videos`">
      {{ user.videos_count }}
      {{ $t('components.user.tabs.videos') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'UserMediaTabs',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
