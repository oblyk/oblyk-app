<template>
  <v-row class="full-height" v-if="photo">
    <v-card class="photo-information">
      <photo-card-info :photo="photo" />
    </v-card>
    <v-col class="full-height pb-0 pt-0">
      <photo-viewer :photo="photo" />
    </v-col>
  </v-row>
</template>

<script>
import { PhotoConcern } from '@/concerns/PhotoConcern'
import PhotoViewer from '@/components/photos/PhotoViewer'
import PhotoCardInfo from '@/components/photos/PhotoCardInfo'

export default {
  name: 'LightBoxView',
  components: { PhotoCardInfo, PhotoViewer },
  mixins: [PhotoConcern]
}
</script>

<style lang="scss" scoped>
.photo-information {
  left: 10px;
  top: 10px;
  z-index: 10;
  max-width: 100%;
  position: absolute;
}
</style>
