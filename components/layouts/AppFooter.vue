<template>
  <v-footer padless class="app-footer">
    <lazy-hydrate when-visible>
      <footer-lazy />
    </lazy-hydrate>
  </v-footer>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
const FooterLazy = () => import('~/components/layouts/partial/FooterLazy')

export default {
  name: 'AppFooter',
  components: {
    FooterLazy,
    LazyHydrate
  }
}
</script>

<style lang="scss">
.app-footer {
  margin-top: 3em;
  background-color: rgb(18, 18, 18) !important;
  border-top-style: solid;
  border-color: rgb(50, 50, 50) !important;
  border-width: 1px;
  padding-top: 15px !important;
  color: white !important;
  a {
    color: white !important;
    border-radius: 6px;
    padding: 12px 12px;
    &:hover {
      background-color: #303030;
    }
  }
  .v-icon {
    color: white;
  }
}
</style>
