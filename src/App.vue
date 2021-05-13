<template>
  <v-app v-bind:class="hasPaddingTop ? '' : 'no-padding-top-in-app'">
    <app-bar/>
    <v-main v-bind:class="hasPaddingTop ? '' : 'pt-0'">
      <router-view/>
    </v-main>
    <app-alert/>

    <!-- About cookies -->
    <v-snackbar
      v-model="cookiesMessage"
      timeout="-1"
    >
      <v-icon
        left
        color="#b77121"
      >
        mdi-cookie
      </v-icon>
      {{ $t('common.pages.cookies') }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="acceptedCookies()"
        >
          {{ $t('actions.ok') }}
        </v-btn>
      </template>
    </v-snackbar>
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

  metaInfo: {
    htmlAttrs: {
      lang: localStorage.getItem('lang') || 'fr'
    },
    meta: [
      { property: 'og:site_name', content: 'Oblyk' },
      { vmid: 'og-type', property: 'og:type', content: 'website' },
      { vmid: 'og-image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` },
      { vmid: 'og-url', property: 'og:url', content: process.env.VUE_APP_OBLYK_APP_URL }
    ]
  },

  data () {
    return {
      appModal: true,
      hasPaddingTop: true,
      cookiesMessage: (localStorage.getItem('oblykCookiesAccepted') || 'false') === 'false'
    }
  },

  watch: {
    $route: function () {
      this.hasPaddingTopInApp()
    }
  },

  mounted () {
    // hide splash screen
    document.getElementById('oblyk-splash-screen').style.display = 'none'
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
    },

    acceptedCookies: function () {
      localStorage.setItem('oblykCookiesAccepted', 'true')
      this.cookiesMessage = false
    }
  }
}
</script>
<style lang="scss">
@import "src/assets/scss/main";
</style>
