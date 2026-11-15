<template>
  <v-list-item
    three-line
    :to="sprayWall.app_path"
    class="border rounded pl-0"
  >
    <v-list-item-avatar
      tile
      size="88"
      class="my-0 mr-4 pl-0"
    >
      <v-img
        :src="imageVariant(sprayWall.attachments.picture, { fit: 'scale-down', width: 720, height: 720 })"
        max-height="88"
        max-width="88"
        style="border-radius: 10px 0 0 10px;"
      />
    </v-list-item-avatar>
    <v-list-item-content class="py-0 align-self-center">
      <v-list-item-title>
        <v-icon color="primary" class="mr-1 mb-1">
          {{ oblykSprayWall }}
        </v-icon>
        {{ sprayWall.name || 'Spray Wall' }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ sprayWall.spray_wall_routes_count }} blocs
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        {{ sprayWall.spray_wall_routes_count }} ouvreurs
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { oblykSprayWall } from '~/assets/oblyk-icons'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'SprayWallListItem',
  mixins: [ImageVariantHelpers],
  props: {
    sprayWall: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      oblykSprayWall
    }
  }
}
</script>
