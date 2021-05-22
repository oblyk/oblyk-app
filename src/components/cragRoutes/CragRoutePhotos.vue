<template>
  <div>
    <p>
      <v-icon left>
        mdi-image
      </v-icon>
      {{ $t('components.gallery.title') }}
    </p>

    <photo-gallery
      environnement-type="cragRoute"
      :environnement-object="cragRoute"
      gallery-type="CragRoute"
      :gallery-id="cragRoute.id"
      :lg-col="lgCol"
    />
    <p class="text-right">
      <v-btn
        :to="`/photos/CragRoute/${cragRoute.id}/new?redirect_to=${this.$route.fullPath}`"
        text
        small
        color="primary"
        v-if="isLoggedIn"
      >
        <v-icon small left>
          mdi-image-plus
        </v-icon>
        {{ $t('actions.addPicture') }}
      </v-btn>
    </p>
  </div>
</template>

<script>
import PhotoGallery from '@/components/photos/PhotoGallery'
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'CragRoutePhotos',
  components: { PhotoGallery },
  mixins: [SessionConcern],
  props: {
    cragRoute: Object,
    lgCol: String
  }
}
</script>
