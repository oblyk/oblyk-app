<template>
  <v-container>
    <photo-gallery
      v-if="area"
      environnement-type="area"
      :environnement-object="area"
      gallery-type="Area"
      :gallery-id="area.id"
    />
  </v-container>
</template>

<script>
import { SessionConcern } from '@/concerns/SessionConcern'
import PhotoGallery from '@/components/photos/PhotoGallery'

export default {
  components: { PhotoGallery },
  mixins: [SessionConcern],
  props: {
    area: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      areaPhotosMetaTitle: `${this.$t('meta.generics.pictures')} ${this.$t('meta.crag.title', {
        name: (this.area || {}).name,
        region: (this.area || {}).region
      })}`,
      areaPhotosMetaDescription: `${this.$t('meta.generics.pictures')} ${this.$t('meta.crag.description', {
        name: (this.area || {}).name,
        region: (this.area || {}).region,
        city: (this.area || {}).city
      })}`
    }
  },

  head () {
    return {
      titleTemplate: this.areaPhotosMetaTitle,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.areaPhotosMetaTitle
        },
        {
          hid: 'description',
          name: 'description',
          content: this.areaPhotosMetaDescription
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.areaPhotosMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.area.path}/photos`
        }
      ]
    }
  }
}
</script>
