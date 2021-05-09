<template>
  <div class="guide-book-paper-map">
    <leaflet-map
      map-style="outdoor"
      :geo-jsons="geoJsons"
      :clustered="false"
      :trackLocation="false"
    />
  </div>
</template>

<script>
import LeafletMap from '@/components/maps/LeafletMap'
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'

export default {
  name: 'GuideBookPaperMapView',
  components: { LeafletMap },
  props: {
    guideBookPaper: Object
  },

  data () {
    return {
      geoJsons: null,
      guideBookPaperMetaTitle: `
      ${this.$t('meta.generics.map')}
      ${this.$t('meta.guideBookPaper.title', {
        name: (this.guideBookPaper || {}).name
      })}`,
      guideBookPaperMetaDescription: `
      ${this.$t('meta.generics.map')}
      ${this.$t('meta.guideBookPaper.description', {
        name: (this.guideBookPaper || {}).name
      })}`
    }
  },

  metaInfo () {
    return {
      title: this.guideBookPaperMetaTitle,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.guideBookPaperMetaDescription
        },
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.guideBookPaperMetaTitle
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.guideBookPaperMetaDescription
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path('map')}`
        }
      ]
    }
  },

  mounted () {
    this.getGeoJson()
  },

  methods: {
    getGeoJson: function () {
      GuideBookPaperApi
        .geoJson(this.guideBookPaper.id)
        .then(resp => {
          this.geoJsons = { features: resp.data.features }
          setTimeout(() => {
            this.$root.$emit('fitMapOnGeoJsonBounds')
          }, 1000)
        })
    }
  }
}
</script>

<style scoped>
.guide-book-paper-map {
  height: calc(100vh - 113px);
  width: 100%;
}
</style>
