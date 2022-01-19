<template>
  <p class="text-center font-italic mt-10">
    Développement en cours ...
  </p>
</template>

<script>
export default {
  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
