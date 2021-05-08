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

  metaInfo () {
    return {
      title: this.$t('meta.home.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.home.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.home.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.home.description') },
        { vmid: 'og-image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
