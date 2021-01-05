<template>
  <v-app v-bind:class="hasPaddingTop ? '' : 'no-padding-top-in-app'">
    <app-bar/>
    <v-main v-bind:class="hasPaddingTop ? '' : 'pt-0'">
      <router-view/>
    </v-main>
    <app-alert/>
  </v-app>
</template>

<script>
import AppBar from '@/components/layouts/AppBar'
import AppAlert from '@/components/layouts/AppAlert'

export default {
  name: 'App',
  components: {
    AppAlert,
    AppBar
  },

  data () {
    return {
      hasPaddingTop: true
    }
  },

  watch: {
    $route: function () {
      this.hasPaddingTopInApp()
    }
  },

  created () {
    const storedLang = (localStorage.getItem('lang') || 'fr')

    // Set dark them
    this.$vuetify.theme.dark = (localStorage.getItem('darkThem') === 'true')

    // Set lang
    this.$vuetify.lang.current = storedLang
    this.$i18n.locale = storedLang

    this.hasPaddingTopInApp()
  },

  methods: {
    hasPaddingTopInApp: function () {
      this.hasPaddingTop = !this.$route.meta.noPaddingTop
    }
  }
}
</script>
<style lang="scss">
@import "src/assets/scss/main";
</style>
