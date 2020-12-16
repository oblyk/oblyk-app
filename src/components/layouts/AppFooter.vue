<template>
  <v-footer padless>
    <v-container class="footer-container">
      <v-row>
        <v-col cols="md-4">
          <p>Il est temps de remonter</p>
        </v-col>
        <v-col cols="md-4">
          <p>Plus sur Oblyk</p>
        </v-col>
        <v-col cols="md-4">
          <p>Nous suivre</p>
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Oblyk</strong>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss">
.footer-container {
  max-width: 1200px;
}
</style>
