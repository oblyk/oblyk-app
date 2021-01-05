<template>
  <v-container class="terms-of-use-container">
    <h1>{{ $t('termsOfUser.title') }}</h1>
    <h2 class="mt-10">{{ $t('termsOfUser.summary') }}</h2>
  </v-container>
</template>

<script>
export default {
  name: 'TermsOfUseView'
}
</script>

<style lang="scss" scoped>
.terms-of-use-container {
  max-width: 1100px;
}
</style>
