<template>
  <div>
    <v-img
      v-if="cragSector.photo.attachments.picture.attached"
      dark
      height="400px"
      class="rounded"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :lazy-src="imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })"
      :src="imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })"
      :srcset="`
        ${imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })} 640w,
        ${imageVariant(picture, { fit: 'scale-down', width: 1080, height: 1080 })} 960w,
        ${imageVariant(picture, { fit: 'scale-down', width: 1920, height: 1920 })} 1200w`
      "
    >
      <crag-sector-head-title
        :crag-sector="cragSector"
        class="crag-sector-header-title-in-picture"
      />
    </v-img>
    <div v-else>
      <crag-sector-head-title
        :crag-sector="cragSector"
        class="crag-sector-header-title-without-picture"
      />
    </div>
  </div>
</template>

<script>
import CragSectorHeadTitle from '~/components/cragSectors/layout/CragSectorHeadTitle'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'CragSectorHead',
  components: { CragSectorHeadTitle },
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

<style lang="scss">
.crag-sector-header-title-in-picture {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    font-size: 3rem;
    margin-bottom: -15px;
  }
}
.crag-sector-header-title-without-picture {
  padding: 1em;
  h1 {
    font-size: 3rem;
    margin-bottom: -10px;
  }
}
</style>
