<template>
  <div class="map">
    <mgl-map
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      @load="onMapLoaded"
      :center="[defaultLongitude, defaultLatitude]"
      :zoom="defaultZoom"
      :pitch="defaultPitch"
      :bearing="defaultBearing"
    />
  </div>
</template>
<script>
import Mapbox from 'mapbox-gl'
import { MglMap } from 'vue-mapbox'
import { MapHelpers } from '@/mixins/MapHelpers'
import CragApi from '@/services/oblyk-api/CragApi'
import GymApi from '@/services/oblyk-api/GymApi'
import RulerControl from 'mapbox-gl-controls/lib/ruler'
import StylesControl from 'mapbox-gl-controls/lib/styles'
import CompassControl from 'mapbox-gl-controls/lib/compass'
import ZoomControl from 'mapbox-gl-controls/lib/zoom'
import MapBox3DControl from '@/services/mapbox/3d-control'
import MapBoxOblykLegend from '@/services/mapbox/oblyk-legend'
import '@/services/mapbox/3d-control/style.scss'
import '@/services/mapbox/oblyk-legend/style.scss'
import Crag from '@/models/Crag'
import Gym from '@/models/Gym'

export default {
  name: 'Map',
  components: {
    MglMap
  },
  mixins: [MapHelpers],
  props: {
    mapStyleType: {
      type: String,
      default: 'outdoor',
      required: false
    },
    geoJsonType: String
  },

  created () {
    this.mapbox = Mapbox
  },

  data () {
    return {
      accessToken: process.env.VUE_APP_OBLYK_MAPBOX_TOKEN,
      mapStyle: 'mapbox://styles/clucien/ckingo0rf3thf17qovbo16s3b?optimize=true',
      geoJsonLayer: {},
      defaultLatitude: parseFloat(localStorage.getItem('map-latitude') || '4.5'),
      defaultLongitude: parseFloat(localStorage.getItem('map-longitude') || '45'),
      defaultPitch: parseFloat(localStorage.getItem('map-pitch') || '0'),
      defaultBearing: parseFloat(localStorage.getItem('map-bearing') || '0'),
      defaultZoom: parseFloat(localStorage.getItem('map-zoom') || '10')
    }
  },

  beforeMount () {
    if (this.mapStyleType === 'outdoor') {
      this.mapStyle = 'mapbox://styles/clucien/ckingo0rf3thf17qovbo16s3b?optimize=true'
    } else if (this.mapStyleType === 'street') {
      this.mapStyle = 'mapbox://styles/clucien/ckioe0rsh08q417p52hr76t8q?optimize=true'
    }
  },

  methods: {
    onMapLoaded: async function (event) {
      const map = event.map

      map.addControl(new ZoomControl(), 'top-right')
      map.addControl(new CompassControl(), 'top-right')

      map.addControl(new RulerControl(), 'top-right')
      map.on('ruler.on', () => console.log('ruler: on'))
      map.on('ruler.off', () => console.log('ruler: off'))
      map.on('style.load', () => {
        this.loadMarkers(map)
        this.addMapRelief(map)
        this.addDataLayer(map)
      })

      map.on('zoom', () => { this.setMapLocalStorage(map) })
      map.on('move', () => { this.setMapLocalStorage(map) })
      map.on('pitch', () => { this.setMapLocalStorage(map) })
      map.on('bearing', () => { this.setMapLocalStorage(map) })

      map.addControl(new MapBox3DControl(), 'top-right')
      map.addControl(new MapBoxOblykLegend({
        boulder: this.$t('components.map.legend.boulder'),
        sportClimbing: this.$t('components.map.legend.sportClimbing'),
        multiPitch: this.$t('components.map.legend.multiPitch'),
        deepWater: this.$t('components.map.legend.deepWater'),
        viaFerrata: this.$t('components.map.legend.viaFerrata'),
        funClimbing: this.$t('components.map.legend.funClimbing')
      }), 'bottom-right')

      // with custom styles:
      map.addControl(new StylesControl({
        styles: [
          {
            label: 'Carte',
            styleName: 'Mapbox Streets',
            styleUrl: this.mapStyle
          }, {
            label: 'Satellite',
            styleName: 'Satellite',
            styleUrl: 'mapbox://styles/clucien/ckjulgum0007217plefa1328h'
          }
        ],
        onChange: (style) => {
          map.setStyle(style.styleUrl)
        }
      }), 'top-left')

      // No world copy
      map.setRenderWorldCopies(false)

      this.loadMarkers(map)
      this.addMapRelief(map)
      await this.addDataLayer(map)
    },

    addDataLayer: async function (map) {
      let geoJson = []
      if (this.geoJsonType === 'Crags') {
        await CragApi.geoJson().then(resp => { geoJson = resp.data })
      } else if (this.geoJsonType === 'Gyms') {
        await GymApi.geoJson().then(resp => { geoJson = resp.data })
      }

      map.addSource('geoJsonData', {
        type: 'geojson',
        data: geoJson,
        cluster: true,
        clusterMaxZoom: 9, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      })

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'geoJsonData',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#81c784',
            50,
            '#66bb6a',
            100,
            '#4caf50',
            750,
            '#2e7d32',
            1250,
            '#1b5e20'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      })

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'geoJsonData',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      })

      map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'geoJsonData',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-allow-overlap': true,
          'icon-image': ['get', 'icon'],
          'icon-size': 1,
          'icon-anchor': 'bottom'
        }
      })

      // inspect a cluster on click
      map.on('click', 'clusters', function (e) {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        })

        const clusterId = features[0].properties.cluster_id
        map.getSource('geoJsonData').getClusterExpansionZoom(
          clusterId,
          function (err, zoom) {
            if (err) return

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            })
          }
        )
      })

      map.on('click', 'unclustered-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        let model

        if (this.geoJsonType === 'Crags') {
          model = new Crag(this.convertNull(e.features[0].properties))
        } else if (this.geoJsonType === 'Gyms') {
          model = new Gym(this.convertNull(e.features[0].properties))
        }

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }

        const uniqueId = `${this.geoJsonType}-${model.id}`
        const routeCount = model.route_count || 0

        let linePart = ''
        if (this.geoJsonType === 'Crags' && routeCount > 0) {
          linePart = `
            <tr>
              <th>${this.$t('components.map.lines')}</th>
              <td>
                ${routeCount} ${this.$t('components.map.lines')},
                ${this.$t('components.map.rangingFrom')} ${model.grade_min_text || '?'}
                ${this.$t('components.map.to')} ${model.grade_max_text || '?'}
              </td>
            </tr>
          `
        }

        new Mapbox
          .Popup()
          .setLngLat(coordinates)
          .setHTML(
            `
            <div class="map-popup-cover" style="background-image: url(${model.mapThumbnailCoverUrl()})"></div>
            <table class="map-popup-information-table">
              <tr>
                <td colspan="2" class="${this.geoJsonType === 'Crags' ? 'loved-by-king' : 'gym-map-title'}">${model.name}</td>
              </tr>
              <tr>
                <th>${this.$t('components.map.place')}</th>
                <td>${model.localization}</td>
              </tr>
              <tr>
                <th>${this.$t('components.map.type')}</th>
                <td>${model.climbingTypes().map((climb) => { return this.$t(`models.climbs.${climb}`) }).join(', ')}</td>
              </tr>
              ${linePart}
            </table>
            <div class="map-popup-link-area">
              <button id="see-map-model-${uniqueId}">${this.$t('actions.see')}</button>
            </div>
            `
          )
          .addTo(map)

        document
          .getElementById(`see-map-model-${uniqueId}`)
          .addEventListener('click', () => {
            this.$router.push(model.url())
          })
      })

      map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = ''
      })
    }
  }
}
</script>
<style lang="scss">
#map, .map {
  width: 100%;
  height: 100%;
}
.mapboxgl-popup {
  max-width: 350px !important;
}
.mapboxgl-popup-content {
  display: block;
  border: none;
  cursor: pointer;
  padding: 0;
}
.mapboxgl-ctrl-group.mapboxgl-ctrl-styles > button {
  color: #505050;
  padding: 0 7px !important;
  width: auto !important;
}
.mapboxgl-popup-close-button {
  width: 20px;
}
.map-popup-cover {
  background-color: rgb(240, 240, 240);
  border-radius: 4px 4px 0 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 300px;
  height: 150px;
}
.map-popup-information-table {
  width: 300px;
  th {
    width: 10px;
    text-align: right;
    white-space: nowrap;
    padding-right: 5px;
    padding-left: 5px;
  }
  .gym-map-title {
    font-weight: bold;
    padding: 10px;
    font-size: 1.2em;
  }
  .loved-by-king {
    padding: 10px;
    font-size: 2em;
  }
}
.map-popup-link-area {
  text-align: right;
  margin-top: 5px;
  padding: 7px 10px 7px 7px;
  border-top-style: solid;
  border-top-color: rgb(230,230,230);
  border-width: 1px;
  button {
    color: #1e88e5;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
  }
}
</style>
