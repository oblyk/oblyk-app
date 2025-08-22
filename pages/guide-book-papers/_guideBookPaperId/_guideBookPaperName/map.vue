<template>
  <div class="guide-book-paper-map">
    <client-only>
      <leaflet-map
        map-style="outdoor"
        :geo-jsons="geoJsons"
        :clustered="false"
        :track-location="false"
        :options="{ rounded: true }"
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
  scrollToTop: true,
  props: {
    guideBookPaper: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      geoJsons: null,
      guideBookPaperMetaTitle: this.$t('metaTitle', {
        name: this.guideBookPaper?.name
      }),
      guideBookPaperMetaDescription: this.$t('metaDescription', {
        name: this.guideBookPaper?.name
      })
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "La carte de %{name}, topo d'escalade",
        metaDescription: "Voir la carte du topo d'escalade %{name}."
      },
      en: {
        metaTitle: 'Map of %{name}, climbing guide book',
        metaDescription: 'See the map of %{name} climbing guide book'
      }
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

  created () {
    this.$store.dispatch('oblykEnvironment/pushHubs', { hub: this.guideBookPaper.path, page: this.$route.path })
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
  height: calc(100vh - 160px);
  width: 100%;
}
</style>
