<template>
  <div
    v-click-outside="closeCollection"
  >
    <div v-show="!collection">
      <v-btn
        icon
        @click="collection = true"
      >
        <v-icon>mdi-image-multiple</v-icon>
      </v-btn>
    </div>
    <v-card class="photo-collection-card" v-show="collection">
      <v-card-text
        class="photo-collection-area"
      >
        <p
          class="text-center"
          v-if="loadingPhotos"
        >
          <spinner
            :size="40"
            :full-height="false"
          />
        </p>
        <div
          v-if="!loadingPhotos"
        >
          <router-link
            v-for="photo in photos"
            :key="photo.id"
            :to="`/photos/${photo.id}?photos=${photosGallery.join('-')}&redirect_to=${backToUrl}`"
          >
            <v-img
              class="collection-thumbnail-photo"
              :src="photo.thumbnailUrl()"
              :height="100"
              :width="100"
            />
          </router-link>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Spinner from '@/components/layouts/Spiner'
import PhotoApi from '@/services/oblyk-api/PhotoApi'
import Photo from '@/models/Photo'

export default {
  name: 'PhotoCollection',
  components: { Spinner },
  props: {
    photosGallery: Array,
    backToUrl: String
  },

  data () {
    return {
      collection: false,
      loadingPhotos: true,
      photos: null
    }
  },

  watch: {
    collection: function () {
      if (this.collection && this.photos === null) {
        this.getCollection()
      }
    }
  },

  methods: {
    closeCollection: function () {
      this.collection = false
    },

    getCollection: function () {
      this.loadingPhotos = true
      this.photos = []
      PhotoApi
        .collection(this.photosGallery)
        .then(resp => {
          for (const photo of resp.data) {
            this.photos.push(new Photo(photo))
          }
        })
        .finally(() => {
          this.loadingPhotos = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-collection-area {
  padding-top: 22px;
  p {
    margin-top: 130px;
  }
}
.photo-collection-card {
  width: 375px;
  height: 375px;
  overflow-y: auto;
}
.collection-thumbnail-photo {
  display: inline-block;
  margin-right: 5px;
  margin-left: 5px;
  border-radius: 4px;
}
</style>
