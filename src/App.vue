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
import { Cable } from '@/channels/Cable'

export default {
  name: 'App',
  mixins: [Cable],
  components: {
    AppAlert,
    AppBar
  },

  data () {
    return {
      appModal: true,
      hasPaddingTop: true
    }
  },

  watch: {
    $route: function () {
      this.hasPaddingTopInApp()
    }
  },

  mounted () {
    document.getElementById('oblyk-splash-screen').style.display = 'none'
  },

  created () {
    const storedLang = (localStorage.getItem('lang') || 'fr')

    // Set dark them
    this.$vuetify.theme.dark = (localStorage.getItem('darkThem') === 'true')

    // Set lang
    this.$vuetify.lang.current = storedLang
    this.$i18n.locale = storedLang

    // Connect cable
    this.connectCable()

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
