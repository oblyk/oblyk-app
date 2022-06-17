<template>
  <div class="guide-book-paper-map">
    <client-only>
      <leaflet-map
        map-style="outdoor"
        :geo-jsons="geoJsons"
        :clustered="false"
        :track-location="false"
      />
    </client-only>
  </div>
</template>

<script>
import GuideBookPaperApi from '@/services/oblyk-api/GuideBookPaperApi'
const LeafletMap = () => import('@/components/maps/LeafletMap')

export default {
  name: 'GuideBookPaperMapView',
  components: { LeafletMap },
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
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

  head () {
    return {
      title: this.guideBookPaperMetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.guideBookPaperMetaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.guideBookPaperMetaTitle
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.guideBookPaperMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path}/map`
        }
      ]
    }
  },

  mounted () {
    this.getGeoJson()
  },

  methods: {
    getGeoJson () {
      new GuideBookPaperApi(this.$axios, this.$auth)
        .geoJson(this.guideBookPaper.id)
        .then((resp) => {
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
