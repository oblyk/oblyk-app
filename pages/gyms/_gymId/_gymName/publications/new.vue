<template>
  <v-container>
    <v-skeleton-loader
      v-if="!gym"
      type="article"
    />
    <publication-form
      v-else
      publishable-type="Gym"
      :publishable="gym"
    />
  </v-container>
</template>

<script>
import PublicationForm from '~/components/publications/forms/PublicationForm'

export default {
  components: { PublicationForm },
  middleware: ['auth', 'gymAdmin'],
  scrollToTop: true,

  props: {
    gym: {
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
