<template>
  <home />
</template>

<script>
import Home from '~/components/homes/Home'

export default {
  components: {
    Home
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  },

  beforeCreate () {
    if (this.$auth.loggedIn) {
      const environnement = this.$store.getters['oblykEnvironment/getOblykEnvironnement']
      if (environnement === 'outdoor') {
        this.$router.replace('/outdoor')
      } else if (environnement === 'indoor') {
        this.$router.replace('/indoor')
      } else if (environnement === 'community') {
        this.$router.replace('/community')
      } else {
        this.$router.replace('/home')
      }
    }
  },

  mounted () {
    this.$store.dispatch('oblykEnvironment/clearHubs')
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Oblyk - Escalade, Carnet de croix & Carte des grimpeur·euse·s',
        metaDescription: "Oblyk est un site communautaire d'escalade outdoor et indoor, on peut : voir les informations des falaises, noter ses croix, trouver un partenaire d'escalade, etc."
      },
      en: {
        metaTitle: 'Oblyk - Climbing community, Log book & Partner search',
        metaDescription: 'Oblyk is an outdoor and indoor climbing community site, you can: see crag information, keep a logbook, find a climbing partner, etc.'
      }
    }
  }
}
</script>
