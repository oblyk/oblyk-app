<template>
  <v-container v-if="photo">
    <v-row justify="center">
      <v-col class="global-form-width">
        <h2 class="mb-4">
          {{ $t('actions.addPicture') }}
        </h2>
        <photo-form
          :photo="photo"
          submit-methode="put"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { PhotoConcern } from '~/concerns/PhotoConcern'
import PhotoForm from '~/components/photos/forms/PhotoForm'

export default {
  components: { PhotoForm },
  mixins: [PhotoConcern],
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Modifier la photo'
      },
      en: {
        metaTitle: 'Edit photo'
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
