<template>
  <v-tabs
    height="30"
    show-arrows
  >
    <v-tab :to="user.currentUserPath('community/followers')">
      Followers
    </v-tab>
    <v-tab :to="user.currentUserPath('community/subscribes')">
      Abonnements
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: 'UserCommunityTabs',
  props: {
    user: Object
  }
}
</script>
