<template>
  <div>
    <home />
  </div>
</template>

<script>
import Home from '@/components/homes/Home'

export default {
  name: 'OblykView',
  components: {
    Home
  },

  head () {
    return {
      title: this.$t('meta.home.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.home.description') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.home.title') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.home.description') },
        { hid: 'og:image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
