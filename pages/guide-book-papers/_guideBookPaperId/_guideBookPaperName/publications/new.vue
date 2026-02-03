<template>
  <v-container>
    <v-skeleton-loader
      v-if="!guideBookPaper"
      type="article"
    />
    <publication-form
      v-else
      publishable-type="GuideBookPaper"
      :publishable="guideBookPaper"
    />
  </v-container>
</template>

<script>
import PublicationForm from '~/components/publications/forms/PublicationForm'

export default {
  components: { PublicationForm },
  middleware: ['auth'],
  scrollToTop: true,

  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Publier'
      },
      en: {
        metaTitle: 'Write'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
