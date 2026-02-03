<template>
  <v-list-item
    :to="callback ? null : gymSpace.app_path"
    :class="bordered ? 'border rounded' : null"
    @click="callback ? callback(gymSpace) : null"
  >
    <v-list-item-avatar
      v-if="pictureAttachment()"
      tile
      size="60"
    >
      <v-img :src="imageVariant(pictureAttachment(), { fit: 'scale-down', height: 100, width: 100 })" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ gymSpace.name }}</v-list-item-title>
      <v-list-item-subtitle>{{ gymSpace.description }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GymSpaceListItem',
  mixins: [ImageVariantHelpers],
  props: {
    gymSpace: {
      type: Object,
      required: true
    },
    callback: {
      type: Function,
      default: null
    },
    bordered: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    pictureAttachment () {
      if (this.gymSpace.representation_type === '3d' && this.gymSpace.attachments.three_d_picture.attached) {
        return this.gymSpace.attachments.three_d_picture
      } else if (this.gymSpace.representation_type === '2d_picture' && this.gymSpace.attachments.plan.attached) {
        return this.gymSpace.attachments.plan
      } else {
        return null
      }
    }
  }
}
</script>
