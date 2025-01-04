<template>
  <div>
    <v-img
      v-if="picture.attached"
      dark
      height="400px"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      :lazy-src="imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })"
      :src="imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })"
      :srcset="`
        ${imageVariant(picture, { fit: 'scale-down', width: 720, height: 720 })} 640w,
        ${imageVariant(picture, { fit: 'scale-down', width: 1080, height: 1080 })} 960w,
        ${imageVariant(picture, { fit: 'scale-down', width: 1920, height: 1920 })} 1200w`
      "
    >
      <p
        v-if="cragRoute.coverFrom"
        class="text-right pr-5"
      >
        <small>{{ $t(`components.${cragRoute.coverFrom}.coverFrom`) }}</small>
      </p>
      <crag-route-title
        :crag-route="cragRoute"
        class="crag-route-header-title-in-picture"
      />
    </v-img>
    <div
      v-else
      class="crag-route-header-title-without-picture"
    >
      <crag-route-title :crag-route="cragRoute" />
    </div>
  </div>
</template>

<script>
import CragRouteTitle from '~/components/cragRoutes/shared/CragRouteTitle'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'CragRouteHead',
  components: { CragRouteTitle },
  mixins: [ImageVariantHelpers],
  props: {
    cragRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      picture: this.cragRoute.photo.attachments.picture
    }
  },

  mounted () {
    this.$root.$on('updateCragRouteBannerSrc', (picture) => {
      this.picture = picture
    })
  },

  beforeDestroy () {
    this.$root.$off('updateCragRouteBannerSrc')
  }
}
</script>

<style lang="scss">
.crag-route-header-title-in-picture {
  position: absolute;
  width: 100%;
  padding: 0.5em 0.5em 1em 1em;
  bottom: 0;
  h1 {
    font-size: 2.5rem;
    margin-bottom: -5px;
  }
}
.crag-route-header-title-without-picture {
  padding: 1em;
  h1 {
    font-size: 2.5rem;
  }
}
</style>
