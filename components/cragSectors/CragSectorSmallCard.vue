<template>
  <div>
    <v-card
      link
      flat
      :to="linkable ? cragSector.path : null"
    >
      <v-list-item three-line>
        <v-list-item-avatar
          v-if="cragSector.photo.attachments.picture.attached"
          size="70"
        >
          <v-avatar
            size="70"
            tile
          >
            <v-img :src="imageVariant(cragSector.photo.attachments.picture, { fit: 'crop', height: 100, width: 100 })" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold">
            <span class="vertical-align-middle">
              {{ cragSector.name }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle class="mt-n3 mb-4">
            <v-alert
              dense
              text
              class="d-inline-block mr-1 mb-0 pl-2 pr-2 pt-0 pb-0"
            >
              Secteur
            </v-alert>
            {{ cragSector.Crag.name }}, {{ cragSector.Crag.city }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'CragSectorSmallCard',
  mixins: [ImageVariantHelpers],
  props: {
    cragSector: {
      type: Object,
      required: true
    },
    linkable: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>
