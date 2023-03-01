<template>
  <v-container class="common-page-container">
    <p class="my-15 text-center">
      Vous n'avez pas les droits nécessaire pour accéder à cette ressource.
    </p>
  </v-container>
</template>
<script>
export default {
  head () {
    return {
      title: 'Droits requis',
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
