<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-2">
            {{ $t('actions.addPicture') }}
          </h2>
          <v-alert
            color="blue"
            text
            v-html="$t('components.photo.addWarning')"
          />
          <photo-form submit-methode="post" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PhotoForm from '~/components/photos/forms/PhotoForm'

export default {
  components: { PhotoForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter une photo'
      },
      en: {
        metaTitle: 'Add a photo'
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
