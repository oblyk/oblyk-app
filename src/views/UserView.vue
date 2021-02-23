<template>
  <div>
    <v-container class="user-page-container">
      <p>En tête</p>
      <p>Bio</p>
      <p>Croix</p>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'

export default {
  name: 'UserView',
  components: { AppFooter }
}
</script>

<style lang="scss" scoped>
.user-page-container {
  max-width: 1000px;
}
</style>
