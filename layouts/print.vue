<template>
  <Nuxt />
</template>

<script>
export default {
  head () {
    return {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
      ]
    }
  }
}
</script>
<style>
body {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  background-color: white;
}
</style>
