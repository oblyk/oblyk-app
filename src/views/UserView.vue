<template>
  <div>
    <v-container class="common-page-container">
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
