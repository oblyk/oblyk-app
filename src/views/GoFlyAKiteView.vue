<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king mt-5">
        {{ $t('common.pages.goFlyAKite.title') }}
      </h1>

      <p>
        {{ $t('common.pages.goFlyAKite.strangeBehavior') }}
      </p>
      <p>
        {{ $t('common.pages.goFlyAKite.actHuman') }}
      </p>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'GoFlyAKiteView',
  components: { AppFooter },

  metaInfo () {
    return {
      title: this.$t('meta.goFlyAKiteView.title'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.goFlyAKiteView.description') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.goFlyAKiteView.title') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.goFlyAKiteView.description') },
        { vmid: 'og-image', property: 'og:image', content: `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg` }
      ]
    }
  }
}
</script>
