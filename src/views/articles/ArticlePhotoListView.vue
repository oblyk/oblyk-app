<template>
  <div>
    <spinner v-if="loadingArticlePhotos" />
    <v-container v-else>
      <v-btn
        :to="`/photos/Article/${articleId}/new?redirect_to=${this.$route.fullPath}`"
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
        :key="`article-photo-${index}`"
      >
        <v-col class="col-3">
          <v-img :src="photo.thumbnailUrl()" />
        </v-col>
        <v-col class="col-9">
          {{ photo.pictureUrl() }}
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ArticleApi from '@/services/oblyk-api/ArticleApi'
import Photo from '@/models/Photo'
import Spinner from '@/components/layouts/Spiner'

export default {
  name: 'ArticlePhotoListView',
  components: { Spinner },
  data () {
    return {
      photos: [],
      loadingArticlePhotos: true,
      articleId: this.$route.params.articleId
    }
  },

  mounted () {
    this.getArticlePhotos()
  },

  methods: {
    getArticlePhotos: function () {
      this.loadingArticlePhotos = true
      ArticleApi
        .photos(this.articleId)
        .then(resp => {
          for (const photo of resp.data) {
            this.photos.push(new Photo(photo))
          }
        })
        .finally(() => {
          this.loadingArticlePhotos = false
        })
    }
  }
}
</script>
