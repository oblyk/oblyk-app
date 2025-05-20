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
import { ThemeColorMixin } from '~/mixins/ThemeColorMixin'
import AppFooter from '@/components/layouts/AppFooter'

export default {
  components: { AppFooter },
  mixins: [ThemeColorMixin],
  props: {
    error: {
      type: Object,
      required: true
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Page introuvable',
        metaDescription: 'La page que vous demandez est introuvable'
      },
      en: {
        metaTitle: 'Page not found',
        metaDescription: 'The page you requested cannot be found'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('metaDescription') },
        { hid: 'og:title', property: 'og:title', content: this.$t('metaTitle') },
        { hid: 'og:description', property: 'og:description', content: this.$t('metaDescription') }
      ]
    }
  }
}
</script>
