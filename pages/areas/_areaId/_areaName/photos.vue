<template>
  <div>
    <skeleton-loader-page-head v-if="$fetchState.pending" />
    <div v-else>
      <area-page-header :area="area" />
      <v-container class="area-container">
        <photo-gallery
          v-if="area"
          environnement-type="area"
          :environnement-object="area"
          gallery-type="Area"
          :gallery-id="area.id"
        />
      </v-container>
    </div>
  </div>
</template>

<script>
import { AreaConcern } from '~/concerns/AreaConcern'
import PhotoGallery from '@/components/photos/PhotoGallery'
import SkeletonLoaderPageHead from '~/components/layouts/SkeletonLoaderPageHead'
import AreaPageHeader from '~/components/areas/layouts/AreaPageHeader.vue'

export default {
  components: { AreaPageHeader, SkeletonLoaderPageHead, PhotoGallery },
  mixins: [AreaConcern],

  data () {
    return {
      areaPhotosMetaTitle: this.$t('metaTitle', {
        name: this.area?.name,
        region: this.area?.region
      }),
      areaPhotosMetaDescription: this.$t('metaDescription', {
        name: this.area?.name,
        region: this.area?.region,
        city: this.area?.city
      })
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "Les photos de %{name}, Groupe de sites d'escalade",
        metaDescription: "Voir les photos du groupe de sites d'escalade de %{name}, quels spots de grimpe il présente ou encore quelle variété de cotations on y trouve"
      },
      en: {
        metaTitle: 'Pictures of %{name}, climbing crags group',
        metaDescription: 'See the pictures of the group of climbing sites of %{name}, what kind of climbing spots it offers or what variety of grades can be found there'
      }
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
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.area?.path}/photos`
        }
      ]
    }
  }
}
</script>
