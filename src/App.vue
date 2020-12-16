<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/layouts/AppBar'

export default {
  name: 'App',
  components: { AppBar }
}
</script>
<style lang="scss">
@import "src/assets/scss/main";
</style>
