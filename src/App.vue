<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view/>
    </v-main>
    <app-alert />
  </v-app>
</template>

<script>
import AppBar from '@/components/layouts/AppBar'
import AppAlert from '@/components/layouts/AppAlert'

export default {
  name: 'App',
  components: { AppAlert, AppBar },

  created () {
    const storedLang = (localStorage.getItem('lang') || 'fr')

    // Set dark them
    this.$vuetify.theme.dark = (localStorage.getItem('darkThem') === 'true')

    // Set lang
    this.$vuetify.lang.current = storedLang
    this.$i18n.locale = storedLang
  }
}
</script>
<style lang="scss">
@import "src/assets/scss/main";
</style>
