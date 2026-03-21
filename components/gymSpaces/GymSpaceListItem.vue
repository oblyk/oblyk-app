<template>
  <v-list-item
    :to="callback ? null : gymSpace.app_path"
    :class="bordered ? 'border rounded' : null"
    @click="callback ? callback(gymSpace) : null"
  >
    <v-list-item-avatar
      v-if="gymSpace.attachments.avatar.attached"
      tile
      size="60"
    >
      <v-img
        :src="imageVariant(gymSpace.attachments.avatar, { fit: 'scale-down', height: 100, width: 100 })"
        contain
      />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>{{ gymSpace.name }}</v-list-item-title>
      <v-list-item-subtitle class="text-truncate" style="max-width: 300px">
        {{ gymSpace.description }}
      </v-list-item-subtitle>
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
  }
}
</script>
