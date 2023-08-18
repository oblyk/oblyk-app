<template>
  <div>
    <p>
      <v-icon left>
        {{ mdiImage }}
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
            v-if="$auth.loggedIn"
            :to="`/photos/CragRoute/${cragRoute.id}/new?redirect_to=${$route.fullPath}`"
            text
            outlined
            color="primary"
          >
            <v-icon small left>
              {{ mdiImagePlus }}
            </v-icon>
            {{ $t('actions.addPicture') }}
          </v-btn>
        </p>
      </client-only>
    </client-only>
  </div>
</template>

<script>
import { mdiImage, mdiImagePlus } from '@mdi/js'
import PhotoGallery from '@/components/photos/PhotoGallery'

export default {
  name: 'CragRoutePhotos',
  components: { PhotoGallery },
  props: {
    cragRoute: {
      type: Object,
      required: true
    },
    lgCol: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      mdiImage,
      mdiImagePlus
    }
  }
}
</script>
