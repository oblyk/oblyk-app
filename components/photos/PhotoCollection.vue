<template>
  <div
    v-click-outside="closeCollection"
  >
    <div v-show="!collection">
      <v-btn
        icon
        @click="collection = true"
      >
        <v-icon>{{ mdiImageMultiple }}</v-icon>
      </v-btn>
    </div>
    <v-card v-show="collection" class="photo-collection-card">
      <v-card-text
        class="photo-collection-area"
      >
        <div>
          <v-img
            v-for="(photo, index) in photos"
            :key="photo.id"
            class="collection-thumbnail-photo"
            :src="imageVariant(photo.attachments.picture, { fit: 'crop', height: 400, width: 400 })"
            :height="100"
            :width="100"
            @click="changeSelectedPhoto(index)"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mdiImageMultiple } from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'PhotoCollection',
  mixins: [ImageVariantHelpers],
  props: {
    photos: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      mdiImageMultiple,
      collection: false,
      loadingPhotos: true
    }
  },

  methods: {
    closeCollection () {
      this.collection = false
    },

    changeSelectedPhoto (photoIndex) {
      this.$root.$emit('LightBoxChangeSelectedIndex', photoIndex)
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
  cursor: pointer;
}
</style>
