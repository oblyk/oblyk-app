<template>
  <v-container>
    Les abonnés de {{ user.full_name }}
  </v-container>
</template>

<script>
export default {
  name: 'UserFollowersView',
  props: {
    user: Object
  }
}
</script>
