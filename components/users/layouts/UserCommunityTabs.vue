<template>
  <v-tabs show-arrows>
    <v-tab :to="`${user.currentUserPath}/community/followers`">
      {{ $t('components.user.tabs.followers') }}
    </v-tab>
    <v-tab :to="`${user.currentUserPath}/community/subscribes`">
      {{ $t('components.user.tabs.subscribes') }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'UserCommunityTabs',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
