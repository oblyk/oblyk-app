<template>
  <nuxt-child />
</template>
<script>
export default {
  mounted () {
    this.$store.commit('layout/LAYOUT_PADDING', true)
  }
}
</script>
