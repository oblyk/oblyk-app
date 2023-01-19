<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.addVideo') }}
          </h2>
          <video-form
            submit-methode="post"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VideoForm from '~/components/videos/forms/VideoForm'

export default {
  meta: { orphanRoute: true },
  components: { VideoForm },
  middleware: ['auth'],

  i18n: {
    messages: {
      fr: {
        metaTitle: 'Ajouter une video'
      },
      en: {
        metaTitle: 'Add a video'
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
