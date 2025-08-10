<template>
  <v-img
    v-if="cragSector.photo.attachments.picture.attached"
    dark
    height="300px"
    class="rounded mb-4 align-end"
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    :lazy-src="imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })"
    :src="imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })"
    :srcset="`
      ${imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })} 640w,
      ${imageVariant(picture, { fit: 'scale-down', width: 1080, height: 1080 })} 960w,
      ${imageVariant(picture, { fit: 'scale-down', width: 1920, height: 1920 })} 1200w`
    "
  >
    <div class="px-3 pb-2">
      <h1 class="text-h6 mb-n2">
        <cite class="font-weight-regular">{{ $t('components.cragSector.sector') }}</cite>
        {{ cragSector.name }}
      </h1>
      <small>
        {{ $t('components.cragSector.sectorOf') }} {{ cragSector.crag.name }}
      </small>
    </div>
  </v-img>
</template>

<script>
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'CragSectorHead',
  mixins: [ImageVariantHelpers],
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      picture: this.cragSector.photo.attachments.picture
    }
  },

  mounted () {
    this.$root.$on('updateCragSectorBannerSrc', (picture) => {
      this.picture = picture
    })
  },

  beforeDestroy () {
    this.$root.$off('updateCragSectorBannerSrc')
  }
}
</script>
