<template>
  <v-img
    class="rounded"
    height="100%"
    width="100%"
    :src="cragSector.Crag.staticMapUrl"
  >
    <v-row
      class="fill-height ma-0"
      align="center"
      justify="center"
    >
      <v-col class="text-center">
        <div>
          <v-btn
            elevation="0"
            dark
            rounded
            large
            color="rgba(0,0,0,0.5)"
            :to="`/maps/crags?lat=${cragSector.crag.latitude}&lng=${cragSector.crag.longitude}&zoom=16&crag_id=${cragSector.crag.id}&crag_sector_id=${cragSector.id}`"
          >
            {{ $t('actions.seeMap') }}
          </v-btn>
        </div>
        <div>
          <small
            class="d-inline-block font-weight-bold px-4 px-3 rounded mt-1"
            style="background-color: rgba(255, 255, 255, 0.4)"
          >
            {{ $t('models.park.names') }} · {{ $t('models.rockBar.sunshine') }} · {{ $t('components.approach.names') }}
          </small>
        </div>
      </v-col>
    </v-row>
  </v-img>
</template>

<script>
export default {
  name: 'CragSectorMapView',
  props: {
    cragSector: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      geoJsons: null
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "La carte de %{name}, secteur d'escalade de %{crag}",
        metaDescription: "La carte de  %{name}, secteur d'escalade %{crag} situé à %{city} en %{region}."
      },
      en: {
        metaTitle: 'Map of %{name}, climbing sector of %{crag}',
        metaDescription: 'Map of %{name}, climbing sector of %{crag} located at %{city} in %{region}'
      }
    }
  },

  head () {
    return {
      title: this.cragSectorMetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.cragSectorMetaDescription
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.cragSectorMetaTitle
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.cragSectorMetaDescription
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: this.cragSectorMetaUrl
        }
      ]
    }
  },

  computed: {
    cragSectorMetaTitle () {
      if (this.cragSector) {
        return this.$t('metaTitle', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name
        })
      }
      return ''
    },
    cragSectorMetaDescription () {
      if (this.cragSector) {
        return this.$t('metaDescription', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name,
          region: this.cragSector.Crag.region,
          city: this.cragSector.Crag.city
        })
      }
      return ''
    },
    cragSectorMetaUrl () {
      if (this.cragSector) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.cragSector.path}/maps`
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.crag-sector-map {
  height: 600px;
}
</style>
