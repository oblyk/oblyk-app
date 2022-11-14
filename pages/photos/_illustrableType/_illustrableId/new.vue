<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">
            {{ $t('actions.addPicture') }}
          </h2>
          <photo-form
            submit-methode="post"
          />
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

  head () {
    return {
      title: this.$t('meta.photo.new')
    }
  }
}
</script>
