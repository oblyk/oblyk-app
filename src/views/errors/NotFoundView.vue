<template>
  <div>
    <v-container class="common-page-container">
      <h1 class="loved-by-king text-center mt-16 pt-16 mb-16 pb-16">
        {{ $t('components.layout.errors.404.title') }}
      </h1>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
const AppFooter = () => import('@/components/layouts/AppFooter')

export default {
  name: 'NotFoundView',
  components: { AppFooter },

  metaInfo () {
    return {
      title: this.$t('meta.error.notFoundTitle'),
      meta: [
        { vmid: 'description', name: 'description', content: this.$t('meta.error.notFoundDescription') },
        { vmid: 'og-title', property: 'og:title', content: this.$t('meta.error.notFoundTitle') },
        { vmid: 'og-description', property: 'og:description', content: this.$t('meta.error.notFoundDescription') }
      ]
    }
  }
}
</script>
