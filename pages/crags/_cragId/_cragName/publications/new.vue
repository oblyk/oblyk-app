<template>
  <v-container>
    <v-skeleton-loader
      v-if="!crag"
      type="article"
    />
    <publication-form
      v-else
      publishable-type="Crag"
      :publishable="crag"
    />
  </v-container>
</template>

<script>
import PublicationForm from '~/components/publications/forms/PublicationForm'

export default {
  components: { PublicationForm },

  props: {
    crag: {
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
