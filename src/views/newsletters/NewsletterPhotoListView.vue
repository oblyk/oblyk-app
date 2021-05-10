<template>
  <div>
    <spinner v-if="loadingNewsletterPhotos" />
    <v-container v-else>
      <v-btn
        :to="`/photos/Newsletter/${newsletterId}/new?redirect_to=${this.$route.fullPath}`"
        text
        color="primary"
      >
        <v-icon left>
          mdi-image-plus
        </v-icon>
        {{ $t('actions.addPicture') }}
      </v-btn>
      <v-row
        v-for="(photo, index) in photos"
        :key="`newsletter-photo-${index}`"
      >
        <v-col class="col-3">
          <v-img :src="photo.thumbnailUrl()" />
        </v-col>
        <v-col class="col-9">
          <div class="text-truncate">
            {{ photo.pictureUrl() }}
          </div>
          <div>
            <v-btn
              :to="`${photo.path('edit')}?redirect_to=${$route.fullPath}`"
              icon
            >
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <copy-btn
              :small="false"
              :message="imgBalise(photo)"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NewsletterApi from '@/services/oblyk-api/NewsletterApi'
import Photo from '@/models/Photo'
import Spinner from '@/components/layouts/Spiner'
import CopyBtn from '@/components/ui/CopyBtn'

export default {
  name: 'NewsletterPhotoListView',
  components: { CopyBtn, Spinner },

  metaInfo () {
    return {
      title: this.$t('meta.newsletter.photos')
    }
  },

  data () {
    return {
      photos: [],
      loadingNewsletterPhotos: true,
      newsletterId: this.$route.params.newsletterId
    }
  },

  mounted () {
    this.getNewsletterPhotos()
  },

  methods: {
    getNewsletterPhotos: function () {
      this.loadingNewsletterPhotos = true
      NewsletterApi
        .photos(this.newsletterId)
        .then(resp => {
          for (const photo of resp.data) {
            this.photos.push(new Photo(photo))
          }
        })
        .finally(() => {
          this.loadingNewsletterPhotos = false
        })
    },

    imgBalise: function (photo) {
      return `<img style="width: 100%" src="${photo.pictureUrl()}" alt="${photo.description}">`
    }
  }
}
</script>
