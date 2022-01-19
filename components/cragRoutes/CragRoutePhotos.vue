<template>
  <div>
    <p>
      <v-icon left>
        mdi-image
      </v-icon>
      {{ $t('components.gallery.title') }}
    </p>

    <client-only>
      <photo-gallery
        environnement-type="cragRoute"
        :environnement-object="cragRoute"
        gallery-type="CragRoute"
        :gallery-id="cragRoute.id"
        :lg-col="lgCol"
      />
      <client-only>
        <p class="text-right">
          <v-btn
            v-if="isLoggedIn"
            :to="`/a/photos/CragRoute/${cragRoute.id}/new?redirect_to=${$route.fullPath}`"
            text
            small
            color="primary"
          >
            <v-icon small left>
              mdi-image-plus
            </v-icon>
            {{ $t('actions.addPicture') }}
          </v-btn>
        </p>
      </client-only>
    </client-only>
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
    cragRoute: {
      type: Object,
      required: true
    },
    lgCol: {
      type: String,
      default: null
    }
  }
}
</script>
