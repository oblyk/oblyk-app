<template>
  <v-container>
    <h3 class="mb-4">
      <v-icon color="primary" left>
        {{ mdiPen }}
      </v-icon>
      {{ $t('components.publication.shareSomething') }}
    </h3>
    <v-skeleton-loader
      v-if="!currentUser"
      type="article"
    />
    <publication-form
      v-else
      publishable-type="User"
      :publishable="currentUser"
    />
  </v-container>
</template>

<script>
import { mdiPen } from '@mdi/js'
import PublicationForm from '~/components/publications/forms/PublicationForm'
import { CurrentUserConcern } from '~/concerns/CurrentUserConcern'

export default {
  components: { PublicationForm },
  mixins: [CurrentUserConcern],
  middleware: ['auth'],

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

  data () {
    return {
      mdiPen
    }
  },

  head () {
    return {
      title: this.$t('metaTitle')
    }
  }
}
</script>
