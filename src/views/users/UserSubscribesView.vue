<template>
  <v-container>
    Les abonnements de {{ user.full_name }}
  </v-container>
</template>

<script>
export default {
  name: 'UserSubscribesView',
  props: {
    user: Object
  }
}
</script>
