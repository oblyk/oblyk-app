<template>
  <div>
    <spinner v-if="loadingNewsletterPhotos" />
    <v-container v-else>
      <v-btn
        :to="`/a/photos/Newsletter/${newsletterId}/new?redirect_to=${$route.fullPath}`"
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
          <v-img :src="photo.thumbnailUrl" />
        </v-col>
        <v-col class="col-9">
          <div class="text-truncate">
            {{ photo.pictureUrl }}
          </div>
          <div>
            <v-btn
              :to="`/a${photo.path}/edit?redirect_to=${$route.fullPath}`"
              icon
            >
              <v-icon small>
                {{ mdiPencil }}
              </v-icon>
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
import { mdiImagePlus, mdiPencil } from '@mdi/js'
import NewsletterApi from '~/services/oblyk-api/NewsletterApi'
import Photo from '~/models/Photo'
import Spinner from '~/components/layouts/Spiner'
import CopyBtn from '~/components/ui/CopyBtn'

export default {
  components: { CopyBtn, Spinner },
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
      title: this.$t('meta.newsletter.photos')
    }
  },

  mounted () {
    this.getNewsletterPhotos()
    this.$store.commit('layout/LAYOUT_PADDING', true)
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
      return `<img style="width: 100%" src="${photo.pictureUrl}" alt="${photo.description}">`
    }
  }
}
</script>
