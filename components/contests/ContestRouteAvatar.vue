<template>
  <div v-if="picture()">
    <v-avatar
      :size="size"
      rounded
      @click="openModal()"
    >
      <v-img :src="picture()" />
    </v-avatar>
    <v-dialog
      v-if="withModal"
      v-model="pictureModal"
      width="700"
    >
      <v-img :src="picture(1080)" />
    </v-dialog>
  </div>
</template>

<script>
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'ContestRouteAvatar',
  mixins: [ImageVariantHelpers],
  props: {
    contestRoute: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 32
    },
    withModal: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      pictureModal: false
    }
  },

  methods: {
    picture (forceSize = null) {
      const size = forceSize || this.size + 30
      let picture = null
      if (this.contestRoute.attachments.picture.attached) {
        picture = this.contestRoute.attachments.picture
      } else if (this.contestRoute.attachments.gym_route_thumbnail.attached) {
        picture = this.contestRoute.attachments.gym_route_thumbnail
      }
      return picture ? this.imageVariant(picture, { fit: 'scale-down', height: size, width: size }) : false
    },

    openModal () {
      if (this.withModal) {
        this.pictureModal = true
      }
    }
  }
}
</script>
