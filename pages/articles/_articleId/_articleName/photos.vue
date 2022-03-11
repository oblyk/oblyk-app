<template>
  <div>
    <spinner v-if="loadingArticlePhotos" />
    <v-container v-else>
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
      <v-row
        v-for="(photo, index) in photos"
        :key="`article-photo-${index}`"
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
import ArticleApi from '@/services/oblyk-api/ArticleApi'
import Photo from '@/models/Photo'
import Spinner from '@/components/layouts/Spiner'
import CopyBtn from '@/components/ui/CopyBtn'

export default {
  components: { CopyBtn, Spinner },

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
    this.$store.commit('layout/LAYOUT_PADDING', true)
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
