<template>
  <div>
    <spinner v-if="loadingArticlePhotos" />
    <v-container v-else>
      <div class="mb-5">
        <v-btn
          :to="`/a/photos/Article/${articleId}/new?redirect_to=${$route.fullPath}`"
          text
          color="primary"
        >
          <v-icon left>
            {{ mdiImagePlus }}
          </v-icon>
          {{ $t('actions.addPicture') }}
        </v-btn>
      </div>
      <v-row
        v-for="(photo, index) in photos"
        :key="`article-photo-${index}`"
      >
        <v-col class="col-3">
          <v-img :src="photo.thumbnailUrl" />
        </v-col>
        <v-col class="col-9">
          <div class="text-truncate">
            {{ photo.description }}
          </div>
          <div class="mt-2">
            <v-text-field
              outlined
              hide-details
              :value="imgBalise(photo)"
            />
          </div>
          <div class="text-right mt-2">
            <v-btn
              :to="`/a${photo.path}/edit?redirect_to=${$route.fullPath}`"
              depressed
            >
              {{ $t('actions.edit') }}
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mdiImagePlus, mdiPencil } from '@mdi/js'
import ArticleApi from '@/services/oblyk-api/ArticleApi'
import Photo from '@/models/Photo'
import Spinner from '@/components/layouts/Spiner'

export default {
  components: { Spinner },

  data () {
    return {
      mdiImagePlus,
      mdiPencil,
      photos: [],
      loadingArticlePhotos: true,
      articleId: this.$route.params.articleId
    }
  },

  head () {
    return {
      title: this.$t('meta.article.photoList')
    }
  },

  mounted () {
    this.getArticlePhotos()
  },

  methods: {
    getArticlePhotos () {
      this.loadingArticlePhotos = true
      new ArticleApi(this.$axios, this.$auth)
        .photos(this.articleId)
        .then((resp) => {
          for (const photo of resp.data) {
            this.photos.push(new Photo({ attributes: photo }))
          }
        })
        .finally(() => {
          this.loadingArticlePhotos = false
        })
    },

    imgBalise (photo) {
      return `<img src="${photo.pictureUrl}" alt="${photo.description}">`
    }
  }
}
</script>
