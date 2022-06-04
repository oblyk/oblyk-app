<template>
  <div>
    <v-container class="common-page-container">
      <h1 v-if="error.statusCode === 404" class="text-center mt-16 pt-16 mb-16 pb-16">
        {{ $t('components.layout.errors.404.title') }}
      </h1>
      <h1 v-if="error.statusCode !== 404" class="text-center mt-16 pt-16 mb-16 pb-16">
        {{ $t('components.layout.errors.500.title') }}
      </h1>
    </v-container>
    <app-footer />
  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter },
  props: {
    error: {
      type: Object,
      required: true
    }
  },

  head () {
    return {
      title: this.$t('meta.error.notFoundTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('meta.error.notFoundDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('meta.error.notFoundTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('meta.error.notFoundDescription') }
      ]
    }
  }
}
</script>
