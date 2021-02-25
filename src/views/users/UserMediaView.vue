<template>
  <v-container>
    Les photos de {{ user.full_name }}
  </v-container>
</template>

<script>
export default {
  name: 'UserMediaView',
  props: {
    user: Object
  }
}
</script>
