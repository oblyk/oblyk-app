<template>
  <div>
    <spinner v-if="loadingPhoto" />

    <v-container v-if="!loadingPhoto">
      <v-row justify="center">
        <v-col class="global-form-width">
          <h2 class="mb-4">{{ $t('actions.addPicture') }}</h2>
          <photo-form
            :photo="photo"
            submit-methode="put"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { PhotoConcern } from '@/concerns/PhotoConcern'
import PhotoForm from '@/components/photos/forms/PhotoForm'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'PhotoEditView',
  mixins: [PhotoConcern],
  components: { Spinner, PhotoForm }
}
</script>
