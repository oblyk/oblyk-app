<template>
  <v-footer padless class="mt-15">
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
