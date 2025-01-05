<template>
  <div>
    <spinner v-if="loadingNewsletterPhotos" />
    <v-container v-else>
      <v-btn
        :to="`/photos/Newsletter/${newsletterId}/new?redirect_to=${$route.fullPath}`"
        text
        color="primary"
      >
        <v-icon left>
          {{ mdiImagePlus }}
        </v-icon>
        {{ $t('actions.addPicture') }}
      </v-btn>
      <v-row
        v-for="(photo, index) in photos"
        :key="`newsletter-photo-${index}`"
      >
        <v-col class="col-3">
          <v-img :src="imageVariant(photo.attachments.picture, { fit: 'scale-down', height: 1920, width: 1920 })" />
        </v-col>
        <v-col class="col-9">
          <div class="text-truncate">
            {{ imageVariant(photo.attachments.picture, { fit: 'scale-down', height: 1920, width: 1920 }) }}
          </div>
          <div>
            <v-btn
              :to="`${photo.path}/edit?redirect_to=${$route.fullPath}`"
              icon
            >
              <v-icon small>
                {{ mdiPencil }}
              </v-icon>
            </v-btn>
            <copy-btn :message="imgBalise(photo)" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiImagePlus, mdiPencil } from '@mdi/js'
import NewsletterApi from '~/services/oblyk-api/NewsletterApi'
import Photo from '~/models/Photo'
import Spinner from '~/components/layouts/Spiner'
import CopyBtn from '~/components/ui/CopyBtn'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  meta: { orphanRoute: true },
  components: { CopyBtn, Spinner },
  mixins: [ImageVariantHelpers],
  middleware: ['auth'],

  data () {
    return {
      mdiImagePlus,
      mdiPencil,
      photos: [],
      loadingNewsletterPhotos: true,
      newsletterId: this.$route.params.newsletterId
    }
  },

  head () {
    return {
      title: 'Photo de la newsletter'
    }
  },

  mounted () {
    this.getNewsletterPhotos()
  },

  methods: {
    getNewsletterPhotos () {
      this.loadingNewsletterPhotos = true
      new NewsletterApi(this.$axios, this.$auth)
        .photos(this.newsletterId)
        .then((resp) => {
          for (const photo of resp.data) {
            this.photos.push(new Photo({ attributes: photo }))
          }
        })
        .finally(() => {
          this.loadingNewsletterPhotos = false
        })
    },

    imgBalise (photo) {
      return `<img style="width: 100%" src="${this.imageVariant(photo.attachments.picture, { fit: 'scale-down', height: 1920, width: 1920 })}" alt="${photo.description}">`
    }
  }
}
</script>
