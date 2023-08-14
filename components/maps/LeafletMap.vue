<template>
  <client-only>
    <div
      class="leaflet-map"
      :class="options.rounded ? 'rounded-leaflet' : ''"
    >
      <div
        v-if="magicCard || searchPlace || loadingCrag || crag"
        class="leaflet-map-search-card pa-2"
      >
        <v-sheet
          v-if="crag && !sunController"
          class="rounded mb-2"
        >
          <v-list-item>
            <v-list-item-icon class="mr-3">
              <v-btn
                :to="crag.path"
                large
                icon
              >
                <v-icon>
                  {{ mdiArrowLeft }}
                </v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ crag.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ crag.city }}, {{ crag.region }} ({{ crag.country }})
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="mt-n5 pb-1">
            <v-list-item-icon class="my-0" />
            <v-list-item-title class="pt-0">
              <v-btn
                text
                outlined
                @click="setSunOnCrag"
              >
                <v-icon
                  left
                  color="#ffcc00"
                >
                  {{ mdiSunCompass }}
                </v-icon>
                {{ $t('models.rockBar.sunshine') }}
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-sheet>
        <search-place-input
          v-if="searchPlace && !crag && !sunController"
          class="leaflet-search-in-map mb-1"
          :callback="goToPlace"
          :solo-style="true"
        />
        <div v-if="cragMapFilter" class="mb-1">
          <v-card
            rounded
            :loading="loadingFilter"
          >
            <div>
              <v-btn
                text
                @click="showMapFilter = !showMapFilter"
              >
                <v-icon left class="vertical-align-top">
                  {{ mdiFilter }}
                </v-icon>
                {{ $t('common.pages.find.crags.map.filter.btnTile') }}
              </v-btn>
            </div>
            <div
              v-if="showMapFilter"
              class="pa-2"
            >
              <v-select
                v-model="filter.climbing_style"
                outlined
                dense
                hide-details
                :label="$t('common.pages.find.crags.map.filter.styleLabel')"
                class="mb-2"
                chips
                clearable
                :items="climbingStyles"
              >
                <template #selection="data">
                  <v-chip
                    small
                    v-bind="data.attrs"
                    :input-value="data.selected"
                  >
                    <span
                      class="vertical-align-middle"
                      :class="`climbs-pastille ${data.item.value}`"
                    >
                      {{ data.item.text }}
                    </span>
                  </v-chip>
                </template>
              </v-select>
              <v-row>
                <v-col
                  cols="5"
                  md="4"
                  class="pr-0"
                >
                  <v-select
                    v-model="filter.altitudeSwitch"
                    outlined
                    hide-details
                    dense
                    :label="$t('common.pages.find.crags.map.filter.upOrDow')"
                    :items="moreOrLess"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="filter.altitude"
                    outlined
                    hide-details
                    dense
                    clearable
                    step="50"
                    type="number"
                    :label="$t('common.pages.find.crags.map.filter.elevation')"
                  />
                </v-col>
              </v-row>
              <p class="mb-0 mt-2">
                {{ $t('common.pages.find.crags.map.filter.orientation') }}
              </p>
              <v-row
                class="mt-0 mb-3"
                no-gutters
              >
                <v-col>
                  <v-checkbox
                    v-model="filter.orientations"
                    class="mt-0"
                    :label="$t('models.orientations.east')"
                    hide-details
                    value="east"
                  />
                </v-col>
                <v-col>
                  <v-checkbox
                    v-model="filter.orientations"
                    class="mt-0"
                    :label="$t('models.orientations.north')"
                    hide-details
                    value="north"
                  />
                </v-col>
                <v-col>
                  <v-checkbox
                    v-model="filter.orientations"
                    class="mt-0"
                    :label="$t('models.orientations.west')"
                    hide-details
                    value="west"
                  />
                </v-col>
                <v-col>
                  <v-checkbox
                    v-model="filter.orientations"
                    class="mt-0"
                    :label="$t('models.orientations.south')"
                    hide-details
                    value="south"
                  />
                </v-col>
              </v-row>
              <p class="mb-n1 pl-2">
                {{ gradeRangeLabel }}
              </p>
              <v-range-slider
                v-model="filter.gradeRange"
                min="0"
                max="52"
                step="2"
                hide-details
                class="mb-2"
              />
              <div class="text-center">
                <v-btn
                  icon
                  @click="showMapFilter = false"
                >
                  <v-icon>
                    {{ mdiChevronUp }}
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
        </div>
        <div v-if="magicCard">
          <small
            v-if="!magicPlace"
            class="d-block pl-1"
            style="color: black"
          >
            {{ $t('components.map.magicCard.clicForTool') }} ...
          </small>
          <v-card
            v-if="magicPlace"
            :loading="loadingMagicPlace"
            class="border"
          >
            <div v-if="!sunController">
              <v-list-item>
                <v-list-item-icon class="mr-4">
                  <v-icon>
                    {{ mdiAutoFix }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content class="py-1">
                  <v-list-item-title>
                    {{ $t('components.map.magicCard.title') }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ magicPlace.lat.toFixed(6) }}, {{ magicPlace.lng.toFixed(6) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    icon
                    @click="closeMagicCard"
                  >
                    <v-icon>
                      {{ mdiClose }}
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-card-text class="px-2 py-0">
                <p
                  v-if="loadingMagicPlace"
                  class="text--disabled text-center my-2"
                >
                  {{ $t('components.map.magicCard.fetchData') }} ...
                </p>
                <div v-if="!loadingMagicPlace && showMagicActions">
                  <p class="mx-2 mb-2">
                    {{ magicPlace.city }}, {{ magicPlace.address }}, {{ magicPlace.region }} <cite>({{ magicPlace.code_country }})</cite>
                  </p>
                  <v-row
                    no-gutters
                  >
                    <v-col class="mr-1">
                      <v-sheet
                        rounded
                        class="activable-v-sheet pa-2 text-center border"
                        @click="openSunController"
                      >
                        <v-icon
                          color="#ffcc00"
                          size="30"
                        >
                          {{ mdiSunCompass }}
                        </v-icon>
                        <p class="mb-0 mt-1 font-weight-bold">
                          {{ $t('components.map.magicCard.sun') }}
                        </p>
                      </v-sheet>
                    </v-col>
                    <v-col class="mx-1">
                      <v-menu>
                        <template #activator="{ on, attrs }">
                          <v-sheet
                            rounded
                            class="activable-v-sheet pa-2 text-center border"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon
                              color="primary"
                              size="30"
                            >
                              {{ mdiMagnifyPlusOutline }}
                            </v-icon>
                            <p class="mb-0 mt-1 font-weight-bold">
                              {{ $t('actions.search') }}
                            </p>
                          </v-sheet>
                        </template>
                        <v-list>
                          <v-list-item
                            :to="`/crags/search${addQueryParams}`"
                          >
                            <v-list-item-icon>
                              <v-icon>
                                {{ mdiTerrain }}
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                              {{ $t('common.pages.find.somethingElse.crag') }}
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            :to="`/guide-book-papers/find${addQueryParams}`"
                          >
                            <v-list-item-icon>
                              <v-icon>
                                {{ mdiBookshelf }}
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                              {{ $t('common.pages.find.somethingElse.guideBook') }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                    <v-col
                      v-if="$auth.loggedIn"
                      class="ml-1"
                    >
                      <v-menu>
                        <template #activator="{ on, attrs }">
                          <v-sheet
                            rounded
                            class="activable-v-sheet pa-2 text-center border"
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon size="30">
                              {{ mdiPlus }}
                            </v-icon>
                            <p class="mb-0 mt-1 font-weight-bold">
                              {{ $t('actions.add') }}
                            </p>
                          </v-sheet>
                        </template>
                        <v-list>
                          <v-list-item
                            :to="`/crags/new${addQueryParams}`"
                          >
                            <v-list-item-icon>
                              <v-icon>
                                {{ mdiTerrain }}
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                              {{ $t('actions.addCrag') }}
                            </v-list-item-title>
                          </v-list-item>
                          <v-list-item
                            :to="`/gyms/new${addQueryParams}`"
                          >
                            <v-list-item-icon>
                              <v-icon>
                                {{ mdiOfficeBuilding }}
                              </v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>
                              {{ $t('actions.addGym') }}
                            </v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </div>
              </v-card-text>
            </div>
            <div v-if="sunController">
              <v-list-item>
                <v-list-item-icon class="mr-4">
                  <v-icon>
                    {{ mdiSunCompass }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content class="py-1">
                  <v-list-item-title>
                    {{ $t('components.map.magicCard.sunshineAt') }} :
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    icon
                    @click="closeSunController"
                  >
                    <v-icon>
                      {{ mdiClose }}
                    </v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-card-text
                v-if="showMagicActions"
                class="px-2 py-0"
              >
                <v-row no-gutters>
                  <v-col cols="9">
                    <v-sheet
                      rounded
                      class="border activable-v-sheet text-center pa-2 mr-1"
                      @click="timeModal = true; dateTimeModalType = 'date'"
                    >
                      {{ sunData.date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' }) }}
                    </v-sheet>
                  </v-col>
                  <v-col cols="3">
                    <v-sheet
                      rounded
                      class="border activable-v-sheet text-center pa-2 ml-1"
                      @click="timeModal = true; dateTimeModalType = 'time'"
                    >
                      {{ sunData.date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }) }}
                    </v-sheet>
                  </v-col>
                </v-row>
                <v-dialog
                  v-model="timeModal"
                  width="290"
                >
                  <v-card>
                    <v-date-picker
                      v-if="dateTimeModalType === 'date'"
                      v-model="dateTimeModalDate"
                    />
                    <v-time-picker
                      v-if="dateTimeModalType === 'time'"
                      v-model="dateTimeModalTime"
                      format="24hr"
                    />
                    <v-card-actions>
                      <v-spacer />
                      <v-btn
                        text
                        @click="timeModal = false"
                      >
                        {{ $t('actions.close') }}
                      </v-btn>
                      <v-btn
                        elevation="0"
                        color="primary"
                        @click="selectDateTime"
                      >
                        {{ $t('actions.valid') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-text>
            </div>
            <div
              class="text-center py-0 collapse-magic-card"
              @click="showMagicActions = !showMagicActions"
            >
              <v-icon :class="showMagicActions ? '' : '--animate-arrow'">
                {{ showMagicActions ? mdiChevronUp : mdiChevronDown }}
              </v-icon>
            </div>
          </v-card>
        </div>
      </div>
      <v-sheet
        v-if="magicCard && sunController"
        class="leaflet-sun-time-line pa-1 border-top"
      >
        <div class="slide-and-times-bar">
          <div class="times-bar">
            <div
              v-if="sunData.durations.beforeSunrise !== 0"
              style="background-color: #162d50"
              :style="`width: ${sunData.durations.beforeSunrise / 1440 * 100}%;`"
              title="Nuit"
            /><div
              v-if="sunData.durations.day !== 0"
              style="background-color: #ffcc00"
              :style="`width: ${sunData.durations.day / 1440 * 100}%;`"
              title="Jour"
            /><div
              v-if="sunData.durations.afterSunset !== 0"
              style="background-color: #162d50"
              :style="`width: ${sunData.durations.afterSunset / 1440 * 100}%;`"
              title="Nuit"
            />
          </div>
          <v-slider
            v-model="minute"
            class="hours-slide"
            color="rgba(255,255,255,0)"
            track-color="rgba(255,255,255,0)"
            thumb-color="white"
            :max="1440"
            :min="0"
            hide-details
          />
        </div>
      </v-sheet>
      <l-map
        ref="leafletMap"
        :zoom="zoom"
        :center="center"
        :options="{
          zoomControl: false,
          worldCopyJump: true,
          scrollWheelZoom: scrollWheelZoom
        }"
        @click="onClickMap"
        @move="onMoveMap"
        @moveend="getBoundsFeatures"
        @zoom="onZoomMap"
      >
        <!-- Zoom Control -->
        <l-control-zoom position="topright" />

        <!-- Layer Selector -->
        <l-control position="topright">
          <leaflet-layer-selector
            ref="leafletLayerSelector"
            v-model="layerIndex"
            :layers="layers"
          />
        </l-control>

        <!-- Set center to localization -->
        <l-control position="topright">
          <leaflet-localization-center
            :set-map-view="setView"
          />
        </l-control>

        <!-- Legend -->
        <l-control position="bottomright">
          <leaflet-legend ref="leafletLegend" />
        </l-control>

        <!-- Layer -->
        <l-tile-layer
          :url="layer.url"
          :attribution="layer.attribution"
          :options="{ maxZoom: 20 }"
        />

        <!-- GeoJson & Marker cluster if clustered -->
        <v-marker-cluster
          v-if="clusteredMarker"
          :options="{ disableClusteringAtZoom: 12 }"
        >
          <l-geo-json
            :key="`cluster-geo-json-${rerenderGeoJsonKey}`"
            :geojson="geoJsons"
            :options="geoJsonOptions"
          />
        </v-marker-cluster>

        <!-- GeoJson & Marker cluster if not clustered -->
        <l-geo-json
          v-if="!clusteredMarker"
          :key="`un-cluster-geo-json-${rerenderGeoJsonKey}`"
          :geojson="geoJsons"
          :options="geoJsonOptions"
        />

        <!-- Additional Geo json features-->
        <l-geo-json
          v-if="zoom >= 14"
          :key="`additional-geo-json-${rerenderAddGeoJsonKey}`"
          :geojson="additionalGeoJson"
          :options="geoJsonOptions"
        />

        <!-- Circle -->
        <l-circle
          v-if="circleProperties"
          :lat-lng="circleProperties.center"
          :radius="circleProperties.radius"
          :color="circleProperties.color || 'blue'"
          :dash-array="circleProperties.dashArray.toString() || null"
          :fill="circleProperties.fill || false"
          :fill-color="circleProperties.fillColor || 'blue'"
          :fill-opacity="circleProperties.fillOpacity || 0.2"
          :weight="circleProperties.weight || 3"
        />

        <!-- Locality users -->
        <l-circle
          v-for="(localityUser, localityUserIndex) in localityUsers"
          :key="`locality-user-index-${localityUserIndex}`"
          :lat-lng="[localityUser.locality.latitude, localityUser.locality.longitude]"
          :radius="localityUser.radius * 1000"
          color="rgb(49, 153, 78)"
          :fill="false"
          :interactive="false"
          :weight="1"
        />

        <l-marker
          v-if="showLocalization && IAmGeolocated"
          :lat-lng="myLatLng"
          :icon="myLocationIcon"
        >
          <l-tooltip>
            {{ $t('components.localization.IAmHere') }}
          </l-tooltip>
        </l-marker>

        <!-- Magic place marker --->
        <l-marker
          v-if="magicPlace"
          :lat-lng="[magicPlace.lat, magicPlace.lng]"
          :icon="magicMarkerIcon"
        />

        <!-- Sun on the map -->
        <l-marker
          v-if="sunLocation"
          :lat-lng="[sunLocation.lat, sunLocation.lng]"
          :icon="sunMarker"
        />

        <l-polyline
          v-if="sunLocation && magicPlace && showSunRay"
          :lat-lngs="[[magicPlace.lat, magicPlace.lng], [sunLocation.lat, sunLocation.lng]]"
          :options="{ color: '#ffcc00', weight: 5, dashArray: [10, 10] }"
        />

        <!-- Shadow -->
        <template v-for="(sunnyPart, sunnyPartIndex) in sunnyPartOfRocks">
          <l-polyline
            v-if="sunData != null && ((!sunnyPart.useOr && (sunData.alpha >= sunnyPart.minAlpha && sunData.alpha <= sunnyPart.maxAlpha)) || (sunnyPart.useOr && (sunData.alpha <= sunnyPart.minAlpha || sunData.alpha >= sunnyPart.maxAlpha))) && minute >= sunTimes.sunrise && minute <= sunTimes.sunset"
            :key="`sunny-part-index-${sunnyPartIndex}`"
            :lat-lngs="sunnyPart.latLngs"
            :options="{ color: '#ffcc00', weight: 5 }"
          />
        </template>
      </l-map>
    </div>
  </client-only>
</template>

<script>
import {
  mdiAutoFix,
  mdiTerrain,
  mdiOfficeBuilding,
  mdiPlus,
  mdiSunCompass,
  mdiMagnifyPlusOutline,
  mdiChevronUp,
  mdiChevronDown,
  mdiClose,
  mdiBookshelf,
  mdiArrowLeft,
  mdiFilter
} from '@mdi/js'
import L, { icon } from 'leaflet'
import 'leaflet-textpath/leaflet.textpath'
import 'leaflet/dist/leaflet.css'
import SunCalc from 'suncalc'
import { LMap, LTileLayer, LControlZoom, LGeoJson, LControl, LCircle, LMarker, LTooltip, LPolyline } from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import { MapPopupHelpers } from '@/mixins/MapPopupHelpers'
import { MapMarkerHelpers } from '@/mixins/MapMarkerHelpers'
import LeafletLayerSelector from '@/components/maps/leafletControls/LeafletLayerSelector'
import LeafletLegend from '@/components/maps/leafletControls/LeafletLegend'
import LeafletLocalizationCenter from '~/components/maps/leafletControls/LeafletLocalizationCenter'
import CragApi from '~/services/oblyk-api/CragApi'
import GymApi from '~/services/oblyk-api/GymApi'
import CragSectorApi from '~/services/oblyk-api/CragSectorApi'
import PlaceOfSaleApi from '~/services/oblyk-api/PlaceOfSaleApi'
import ParkApi from '~/services/oblyk-api/ParkApi'
import ApproachApi from '~/services/oblyk-api/ApproachApi'
import UserApi from '~/services/oblyk-api/UserApi'
import OsmNominatim from '~/services/osm-nominatim'
import RockBarApi from '~/services/oblyk-api/RockBarApi'
const SearchPlaceInput = () => import('~/components/forms/SearchPlaceInput.vue')

export default {
  name: 'LeafletMap',

  components: {
    SearchPlaceInput,
    LeafletLocalizationCenter,
    LeafletLegend,
    LeafletLayerSelector,
    LMap,
    LCircle,
    LGeoJson,
    LControl,
    LControlZoom,
    LTileLayer,
    LMarker,
    LTooltip,
    LPolyline,
    'v-marker-cluster': Vue2LeafletMarkerCluster
  },
  mixins: [MapPopupHelpers, MapMarkerHelpers],

  props: {
    mapStyle: {
      type: String,
      default: null
    },
    geoJsons: {
      type: Object,
      default: null
    },
    trackLocation: {
      type: Boolean,
      default: true
    },
    zoomForce: {
      type: Number,
      default: null
    },
    latitudeForce: {
      type: [Number, String],
      default: null
    },
    longitudeForce: {
      type: [Number, String],
      default: null
    },
    scrollWheelZoom: {
      type: Boolean,
      default: true
    },
    clustered: {
      type: Boolean,
      default: true
    },
    circleProperties: {
      type: Object,
      default: null
    },
    showLocalization: {
      type: Boolean,
      default: true
    },
    localityUsers: {
      type: Array,
      default: null
    },
    magicCard: {
      type: Boolean,
      default: false
    },
    searchPlace: {
      type: Boolean,
      default: false
    },
    cragAddFetching: {
      type: Boolean,
      default: false
    },
    loadAddFeatures: {
      type: Boolean,
      default: null
    },
    crag: {
      type: Object,
      default: null
    },
    loadingCrag: {
      type: Boolean,
      default: false
    },
    cragMapFilter: {
      type: Boolean,
      default: false
    },
    filterCallback: {
      type: Function,
      default: null
    },
    options: {
      type: Object,
      required: false,
      default: () => {
        return {
          department: {
            clickable: true
          },
          rounded: false
        }
      }
    }
  },

  data () {
    return {
      map: null,
      showLayersSelector: false,
      layerIndex: 0,
      additionalGeoJson: { features: [] },
      sunnyRocksGeoJson: { features: [] },
      fetchCragIds: [],
      zoom: this.zoomForce || parseFloat(localStorage.getItem('map-zoom') || '10'),
      showMapFilter: false,
      rerenderGeoJsonKey: 1,
      rerenderAddGeoJsonKey: 1,
      clusteredMarker: this.clustered,
      timeToFilter: null,
      center: L.latLng(
        this.latitudeForce || parseFloat(localStorage.getItem('map-latitude') || '45'),
        this.longitudeForce || parseFloat(localStorage.getItem('map-longitude') || '4.5')
      ),
      geoJsonOptions: {
        onEachFeature: this.onEachFeatureFunction(),
        pointToLayer: this.pointToLayerFunction()
      },
      myLocationIcon: icon(
        {
          iconUrl: '/markers/i-am-here.png', iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -7]
        }
      ),
      magicMarkerIcon: icon(
        {
          iconUrl: '/markers/magic-marker.png', iconSize: [14, 14], iconAnchor: [7, 7], popupAnchor: [0, -7]
        }
      ),
      sunMarkerIcon: icon(
        {
          iconUrl: '/markers/sun-marker.png', iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -17]
        }
      ),
      nightMarkerIcon: icon(
        {
          iconUrl: '/markers/night-marker.png', iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -17]
        }
      ),
      sunriseMarkerIcon: icon(
        {
          iconUrl: '/markers/sunrise-marker.png', iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -17]
        }
      ),
      sunsetMarkerIcon: icon(
        {
          iconUrl: '/markers/sunset-marker.png', iconSize: [34, 34], iconAnchor: [17, 17], popupAnchor: [0, -17]
        }
      ),
      filter: {
        climbing_style: null,
        gradeRange: [0, 52],
        orientations: [],
        altitudeSwitch: null,
        altitude: null
      },
      loadingFilter: false,
      climbingStyles: [
        { value: 'sport_climbing', text: this.$t('models.climbs.sport_climbing') },
        { value: 'bouldering', text: this.$t('models.climbs.bouldering') },
        { value: 'multi_pitch', text: this.$t('models.climbs.multi_pitch') },
        { value: 'trad_climbing', text: this.$t('models.climbs.trad_climbing') },
        { value: 'deep_water', text: this.$t('models.climbs.deep_water') },
        { value: 'via_ferrata', text: this.$t('models.climbs.via_ferrata') }
      ],
      moreOrLess: [
        { value: 'above', text: 'Au dessus de' },
        { value: 'below', text: 'En dessous de' }
      ],

      sunnyPartOfRocks: [],
      magicPlace: null,
      magicPlaceData: null,
      loadingMagicPlace: null,
      showMagicActions: true,
      sunController: false,
      openSunOnCrag: false,
      minute: new Date().getHours() * 60 + new Date().getMinutes(),
      sunDate: new Date(),
      timeModal: false,

      dateTimeModalDate: new Date().toISOString().substring(0, 10),
      dateTimeModalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateTimeModalType: 'date',

      gradeByValue: [
        '1a', '1a+', '1b', '1b+', '1c', '1c+',
        '2a', '2a+', '2b', '2b+', '2c', '2c+',
        '3a', '3a+', '3b', '3b+', '3c', '3c+',
        '4a', '4a+', '4b', '4b+', '4c', '4c+',
        '5a', '5a+', '5b', '5b+', '5c', '5c+',
        '6a', '6a+', '6b', '6b+', '6c', '6c+',
        '7a', '7a+', '7b', '7b+', '7c', '7c+',
        '8a', '8a+', '8b', '8b+', '8c', '8c+',
        '9a', '9a+', '9b', '9b+', '9c', '9c+'
      ],

      mdiAutoFix,
      mdiTerrain,
      mdiOfficeBuilding,
      mdiPlus,
      mdiSunCompass,
      mdiMagnifyPlusOutline,
      mdiChevronUp,
      mdiChevronDown,
      mdiClose,
      mdiBookshelf,
      mdiArrowLeft,
      mdiFilter
    }
  },

  computed: {
    layer () {
      return this.layers[this.layerIndex]
    },

    IAmGeolocated () {
      return this.$store.getters['geolocation/IAmGeolocated']
    },

    myLatLng () {
      return [this.$store.state.geolocation.latitude, this.$store.state.geolocation.longitude]
    },

    layers () {
      if (this.$auth.loggedIn) {
        return [
          {
            title: 'relief',
            name: 'Eseri Topo',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            attribution: '&copy; <a href="https://www.esrifrance.fr/">Esri</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
          },
          {
            title: 'reliefMapbox',
            name: 'Mapbox',
            url: `https://api.mapbox.com/styles/v1/${process.env.VUE_APP_MAPBOX_TERRAIN_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`,
            attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
          },
          {
            title: 'satellite',
            name: 'Mapbox',
            url: `https://api.mapbox.com/styles/v1/${process.env.VUE_APP_MAPBOX_SATELLITE_STYLE}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.VUE_APP_MAPBOX_TOKEN}`,
            attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
          },
          {
            title: 'detailedRelief',
            name: 'CyclOSM',
            url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.cyclosm.org">CyclOSM</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
          }
        ]
      } else {
        return [
          {
            title: 'relief',
            name: 'Eseri Topo',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            attribution: '&copy; <a href="https://www.esrifrance.fr/">Esri</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
          },
          {
            title: 'satellite',
            name: 'Eseri Satelite',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: '&copy; <a href="https://www.esrifrance.fr/">Esri</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
          },
          {
            title: 'detailedRelief',
            name: 'CyclOSM',
            url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="https://www.cyclosm.org">CyclOSM</a> &copy; <a href="https://www.openstreetmap.org/about/">Open Street Map</a> contributors'
          }
        ]
      }
    },

    addQueryParams () {
      if (this.magicPlace && !this.loadingMagicPlace) {
        return `?latitude=${this.magicPlace.lat}&longitude=${this.magicPlace.lng}&code_country=${this.magicPlace.code_country}&country=${this.magicPlace.country}&city=${this.magicPlace.city}&region=${this.magicPlace.region}&postal_code=${this.magicPlace.postal_code}&big_city=${this.magicPlace.big_city}&address=${this.magicPlace.address}`
      } else {
        return ''
      }
    },

    sunDateTime () {
      const hour = (this.minute / 60).toFixed(0)
      const minute = (((this.minute / 60) - hour) * 60).toFixed(0)
      return new Date(
        this.sunDate.getFullYear(),
        this.sunDate.getMonth(),
        this.sunDate.getDate(),
        hour,
        minute
      )
    },

    sunData () {
      if (this.magicPlace && this.sunController) {
        const lat = this.magicPlace.lat
        const lng = this.magicPlace.lng
        const date = this.sunDateTime
        const sunPosition = SunCalc.getPosition(date, lat, lng)
        const sunTimes = SunCalc.getTimes(date, lat, lng)
        const beforeSunriseMinutes = sunTimes.sunrise.getHours() * 60 + sunTimes.sunrise.getMinutes()
        const dayMinutes = sunTimes.sunset.getHours() * 60 + sunTimes.sunset.getMinutes() - beforeSunriseMinutes
        const afterSunsetMinutes = 1440 - (beforeSunriseMinutes + dayMinutes)
        return {
          alpha: sunPosition.azimuth * 180 / Math.PI,
          altitude: sunPosition.altitude,
          azimuth: sunPosition.azimuth,
          sunrise: sunTimes.sunrise,
          sunset: sunTimes.sunset,
          durations: {
            beforeSunrise: beforeSunriseMinutes,
            day: dayMinutes,
            afterSunset: afterSunsetMinutes
          },
          date
        }
      } else {
        return null
      }
    },

    sunLocation () {
      if (this.magicPlace && this.sunController) {
        const date = this.sunDateTime
        const zoom = this.$refs.leafletMap.mapObject.getZoom()
        const sunPosition = SunCalc.getPosition(date, this.magicPlace.lat, this.magicPlace.lng)
        const hypotenuseLength = 100 / Math.pow(2, zoom - 1) // 1
        const xGap = Math.sin(sunPosition.azimuth) * hypotenuseLength
        const yGap = Math.cos(sunPosition.azimuth) * hypotenuseLength
        return {
          lat: this.magicPlace.lat - yGap,
          lng: this.magicPlace.lng - xGap
        }
      } else {
        return null
      }
    },

    sunTimes () {
      const sunTimes = SunCalc.getTimes(this.sunDate, this.magicPlace.lat, this.magicPlace.lng)
      const sunrise = sunTimes.sunrise
      const sunriseEnd = sunTimes.sunriseEnd
      const sunsetStart = sunTimes.sunsetStart
      const sunset = sunTimes.sunset
      return {
        sunrise: sunrise.getHours() * 60 + sunrise.getMinutes(),
        sunriseEnd: sunriseEnd.getHours() * 60 + sunriseEnd.getMinutes() + 10,
        sunsetStart: sunsetStart.getHours() * 60 + sunsetStart.getMinutes() - 10,
        sunset: sunset.getHours() * 60 + sunset.getMinutes()
      }
    },

    sunMarker () {
      if (this.minute > 0 && this.minute < this.sunTimes.sunrise) {
        return this.nightMarkerIcon
      } else if (this.minute >= this.sunTimes.sunrise && this.minute < this.sunTimes.sunriseEnd) {
        return this.sunriseMarkerIcon
      } else if (this.minute >= this.sunTimes.sunriseEnd && this.minute < this.sunTimes.sunsetStart) {
        return this.sunMarkerIcon
      } else if (this.minute >= this.sunTimes.sunsetStart && this.minute <= this.sunTimes.sunset) {
        return this.sunsetMarkerIcon
      } else {
        return this.nightMarkerIcon
      }
    },

    showSunRay () {
      return this.minute >= this.sunTimes.sunrise && this.minute <= this.sunTimes.sunset
    },

    gradeRangeLabel () {
      const min = this.filter.gradeRange[0]
      const max = this.filter.gradeRange[1]
      const object = this.filter.climbing_style !== null ? this.$t(`models.climbs.${this.filter.climbing_style}`).toLowerCase() : 'ligne'
      if (min === 0 && max === 52) {
        return this.$t('common.pages.find.crags.map.filter.whatDifficulty')
      } else if (min > 0 && max === 52) {
        return this.$t('common.pages.find.crags.map.filter.orMore', { type: object, grade: this.gradeByValue[min] })
      } else if (min === 0 && max < 52) {
        return this.$t('common.pages.find.crags.map.filter.orLess', { type: object, grade: this.gradeByValue[max] })
      } else {
        return this.$t('common.pages.find.crags.map.filter.around', { type: object, min: this.gradeByValue[min], max: this.gradeByValue[max] })
      }
    }
  },

  watch: {
    minute () {
      const hour = Math.trunc(this.minute / 60)
      const minute = this.minute - hour * 60
      this.dateTimeModalTime = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`
    },

    loadAddFeatures () {
      if (this.loadAddFeatures) {
        this.getBoundsFeatures()
      }
    },

    geoJsons () {
      this.rerenderGeoJsonKey += 1
      this.loadingFilter = false
    },

    filter: {
      handler () {
        this.submitFilter()
      },
      deep: true
    }
  },

  mounted () {
    this.$root.$on('fitMapOnGeoJsonBounds', () => {
      this.fitGeoJsonBounds()
    })
  },

  beforeDestroy () {
    this.$root.$off('fitMapOnGeoJsonBounds')
  },

  beforeMount () {
    this.layerIndex = 0
  },

  methods: {
    pointToLayerFunction () {
      return (feature, latLng) => {
        if (feature.properties.icon === 'locality') {
          return L.marker(latLng, { icon: L.divIcon(this.localityMarker(feature.properties)) })
        } else {
          return L.marker(latLng, { icon: L.icon(this.markers[feature.properties.icon]) })
        }
      }
    },

    onEachFeatureFunction () {
      return (feature, layer) => {
        if (feature.properties.type === 'RockBar') {
          layer.options.bubblingMouseEvents = false
          layer.options.color = '#616161'
          layer.options.weight = 7
          layer.setText('• ', { repeat: true, offset: 12, attributes: { fill: '#616161' }, below: true })
        }
        if (feature.properties.type === 'Approach') {
          layer.options.bubblingMouseEvents = false
          layer.options.color = '#795548'
          layer.options.dashArray = [10, 10]
          layer.options.weight = 6
        }
        if (feature.properties.type === 'Department') {
          layer.options.color = 'rgb(234, 141, 125)'
          layer.options.weight = 2
          if (this.options.department.clickable) {
            layer.options.fillColor = 'rgb(255, 255, 255)'
            layer.on('click', () => {
              this.$router.push(`/escalade-en/${feature.properties.country_slug_name}/${feature.properties.department_number}/${feature.properties.slug_name}`)
            })
          } else {
            layer.options.fill = false
            layer.options.interactive = false
          }
        } else if (feature.properties.type === 'Locality') {
          layer.on('click', () => {
            this.$router.push({ path: this.$route.path, query: { locality: feature.properties.id } })
          })
        } else {
          layer.on('click', () => { this.buildPopup(layer, feature.properties) })
        }
      }
    },

    onClickMap (event) {
      if (this.magicCard) {
        this.magicPlace = { lat: event.latlng.lat, lng: event.latlng.lng }
        this.showMagicActions = true
        this.addressDetail()
      }
      this.hideOpensControl()
    },

    onMoveMap () {
      this.zoom = this.$refs.leafletMap.mapObject.getZoom()
      this.savePosition()
    },

    onZoomMap () {
      this.saveZoom()
    },

    hideOpensControl () {
      this.$refs.leafletLayerSelector.hideLeafletMapLayerSelector()
      this.$refs.leafletLegend.hideLeafletMapLegend()
    },

    setSunOnCrag () {
      this.magicPlace = {
        lat: parseFloat(this.crag.latitude),
        lng: parseFloat(this.crag.longitude)
      }
      this.openSunOnCrag = true
      this.sunController = true
    },

    openSunController () {
      this.goToPlace(
        this.magicPlace,
        this.$refs.leafletMap.mapObject.getZoom()
      )
      this.openSunOnCrag = false
      this.sunController = true
    },

    closeSunController () {
      if (!this.openSunOnCrag) {
        this.sunController = false
        this.showMagicActions = true
        this.addressDetail()
      } else {
        this.closeMagicCard()
      }
    },

    closeMagicCard () {
      this.magicPlace = null
      this.magicPlaceData = null
      this.loadingMagicPlace = null
      this.showMagicActions = true
      this.sunController = false
    },

    selectDateTime () {
      if (this.dateTimeModalType === 'date') {
        this.sunDate = new Date(this.dateTimeModalDate)
      } else {
        const newTime = new Date(`${this.sunDate.toISOString().substring(0, 10)} ${this.dateTimeModalTime}`)
        this.minute = newTime.getHours() * 60 + newTime.getMinutes()
      }
      this.timeModal = false
    },

    savePosition () {
      if (!this.trackLocation) { return }

      const center = this.$refs.leafletMap.mapObject.getCenter()
      localStorage.setItem('map-latitude', center.lat)
      localStorage.setItem('map-longitude', center.lng)
    },

    saveZoom () {
      if (!this.trackLocation) { return }

      const zoom = this.$refs.leafletMap.mapObject.getZoom()
      localStorage.setItem('map-zoom', zoom)
    },

    fitGeoJsonBounds () {
      const bounds = L.geoJson(this.geoJsons).getBounds()
      this.$refs.leafletMap.mapObject.fitBounds(bounds)
    },

    setView (options) {
      this.$refs.leafletMap.mapObject.setView([options.latitude, options.longitude], options.zoom)
    },

    buildPopup (marker, properties) {
      marker.unbindPopup()
      marker.bindPopup(`<div><p class="text-center pa-3 mb-0 mt-0">${this.$t('common.loading')}</p></div>`)
      marker.togglePopup()
      this
        .getData(properties)
        .then((resp) => {
          marker.setPopupContent(this.getHtmlPopup(properties.type, resp))
        })
    },

    getBoundsFeatures () {
      const zoom = this.$refs.leafletMap.mapObject.getZoom()
      if (zoom < 14 || !this.cragAddFetching) { return false }

      const bounds = this.$refs.leafletMap.mapObject.getBounds()
      const cragsIds = []
      this.$refs.leafletMap.mapObject.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          if (bounds.contains(layer.getLatLng())) {
            if (layer.feature?.properties?.type === 'Crag') {
              cragsIds.push(layer.feature.properties.id)
            }
          }
        }
      })
      this.getAdditionalFeatures(cragsIds)
    },

    getData (properties) {
      let apiService = null
      let primaryId = null
      let secondaryId = null

      // Select right api service
      if (properties.type === 'Crag') {
        primaryId = properties.id
        apiService = new CragApi(this.$axios, this.$auth)
      } else if (properties.type === 'Gym') {
        primaryId = properties.id
        apiService = new GymApi(this.$axios, this.$auth)
      } else if (properties.type === 'CragSector') {
        primaryId = properties.id
        apiService = new CragSectorApi(this.$axios, this.$auth)
      } else if (properties.type === 'RockBar') {
        primaryId = properties.crag_id
        secondaryId = properties.id
        apiService = new RockBarApi(this.$axios, this.$auth)
      } else if (properties.type === 'PlaceOfSale') {
        primaryId = properties.guide_book_paper_id
        secondaryId = properties.id
        apiService = new PlaceOfSaleApi(this.$axios, this.$auth)
      } else if (properties.type === 'Park') {
        primaryId = properties.crag_id
        secondaryId = properties.id
        apiService = new ParkApi(this.$axios, this.$auth)
      } else if (properties.type === 'Approach') {
        primaryId = properties.crag_id
        secondaryId = properties.id
        apiService = new ApproachApi(this.$axios, this.$auth)
      } else if (properties.type === 'PartnerUser') {
        primaryId = properties.uuid
        apiService = new UserApi(this.$axios, this.$auth)
      } else {
        return false
      }

      // Get data
      return new Promise((resolve, reject) => {
        apiService
          .find(primaryId, secondaryId)
          .then((resp) => {
            resolve(resp.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    getAdditionalFeatures (cragIds) {
      const unfetchCragIds = cragIds.filter(cragId => !this.fetchCragIds.includes(cragId))
      this.fetchCragIds = this.fetchCragIds.concat(unfetchCragIds)
      if (unfetchCragIds.length === 0) { return false }

      new CragApi(this.$axios, this.$auth)
        .additionalGeoJsonFeatures(unfetchCragIds)
        .then((resp) => {
          this.additionalGeoJson.features = this.additionalGeoJson.features.concat(resp.data.features)
          this.createSunnyRockPart()
        })
    },

    createSunnyRockPart () {
      this.sunnyPartOfRocks = []
      for (const feature of this.additionalGeoJson.features) {
        if (feature.properties?.type === 'RockBar') {
          const coordinates = structuredClone(feature.geometry.coordinates)
          for (let i = 0; i < coordinates.length - 1; i++) {
            const latDiff = coordinates[i][1] - coordinates[i + 1][1]
            const lngDiff = coordinates[i + 1][0] - coordinates[i][0]
            const alpha = Math.atan(latDiff / lngDiff) * (180 / Math.PI)
            const minAlpha = -90 + alpha
            const maxAlpha = 90 + alpha
            const useOr = (latDiff > 0 && lngDiff < 0 && alpha < 0) || (latDiff < 0 && lngDiff < 0 && alpha > 0)

            this.sunnyPartOfRocks.push(
              {
                useOr,
                minAlpha,
                maxAlpha,
                latLngs: [
                  [
                    coordinates[i][1],
                    coordinates[i][0]
                  ],
                  [
                    coordinates[i + 1][1],
                    coordinates[i + 1][0]
                  ]
                ]
              }
            )
          }
        }
      }
    },

    goToPlace (place, zoom = 15) {
      this.$refs.leafletMap.mapObject.setView(
        [place.lat, place.lng],
        zoom,
        {
          animate: true
        }
      )
    },

    addressDetail () {
      if (this.sunController) { return false }

      this.loadingMagicPlace = true
      new OsmNominatim(this.$axios)
        .reverseGeocoding(this.magicPlace.lat, this.magicPlace.lng)
        .then((resp) => {
          const address = resp.data.address
          const cityAddress = (address.house_number) ? `${address.house_number}, ${address.road}` : address.road

          this.magicPlace.city = address.city || address.town || address.village
          this.magicPlace.big_city = address.municipality
          this.magicPlace.country = address.country
          this.magicPlace.code_country = address.country_code
          this.magicPlace.postal_code = address.postcode
          this.magicPlace.region = address.county || address.state
          this.magicPlace.address = cityAddress
        })
        .finally(() => {
          this.loadingMagicPlace = false
        })
    },

    submitFilter () {
      clearTimeout(this.timeToFilter)
      this.loadingFilter = true
      this.timeToFilter = setTimeout(() => {
        this.filterCallback(this.filter)
        this.clusteredMarker = false
      }, 800)
    }
  }
}
</script>

<style lang="scss">
@import "assets/leaflet-marker-cluster";
.leaflet-map {
  height: 100%;
  width: 100%;
  position: relative;
  &.rounded-leaflet {
    .leaflet-container {
      border-radius: 15px;
    }
  }
  .leaflet-sun-time-line {
    position: absolute;
    bottom: 7px;
    left: calc((100% - 500px) / 2);
    border-radius: 10px;
    z-index: 7;
    width: 500px;
  }
  .slide-and-times-bar {
    position: relative;
    .times-bar {
      position: absolute;
      width: calc(100% - 14px);
      top: 6px;
      left: 0;
      margin-right: 7px;
      margin-left: 7px;
      div {
        height: 15px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:first-child { border-radius: 4px 0 0 4px; }
        &:last-child { border-radius: 0 4px 4px 0; }
      }
    }
  }
  .leaflet-map-search-card {
    max-width: calc(100vw - 50px);
    z-index: 7;
    position: absolute;
    top: 5px;
    left: 5px;
    .leaflet-search-in-map {
      .v-input__slot {
        border-style: solid;
        border-width: 1px;
        box-shadow: none !important;
      }
    }
    .collapse-magic-card {
      transition: background-color 0.3s;
      cursor: pointer;
      .--animate-arrow {
        animation-name: open-magic-card-animation;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-direction: normal;
        animation-play-state: running;
      }
    }
  }
}
.leaflet-marker-icon[src="/markers/i-am-here.png"] {
  animation: i-am-here-pulse-animation 2s infinite;
  border-radius: 10px;
  box-shadow: 0 0 1px 1px rgba(42, 127, 255, 1);
  z-index: 500 !important;
}
.leaflet-marker-icon[src="/markers/magic-marker.png"] {
  animation: magic-pulse-animation 2s infinite;
  border-radius: 10px;
  box-shadow: 0 0 1px 1px rgb(0, 0, 0);
  z-index: 500 !important;
}
.leaflet-popup {
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
    color: black;
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
    cite {
      color: #808080;
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

  .leaflet-popup-content-wrapper {
    border-radius: 4px;
    padding: 0;
  }

  .leaflet-popup-content {
    margin: 0;
  }

  .map-popup-cover {
    width: 100%;
    position: relative;
    .user-map-popup-name-and-avatar {
      position: absolute;
      bottom: 0;
      width: 300px;
      padding-left: 5px;
      padding-bottom: 5px;
      .user-map-popup-avatar {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        object-fit: cover;
      }
      .user-map-popup-name {
        margin-left: 5px;
        display: inline-block;
        color: white;
        padding: 5px 10px;
        border-radius: 3px;
        margin-top: 10px;
        vertical-align: top;
        background-color: rgba(0,0,0,0.8);
      }
    }
  }
  .map-popup-information-table {
    .map-popup-information-bio {
      padding-right: 8px;
      padding-left: 8px;
    }
  }
  .user-map-popup-last-activity-at {
    text-align: right;
    margin: 0 !important;
    padding-right: 8px;
  }
}
.user-partner-map-marker {
  .user-partner-map-marker-avatar {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
  }
  .user-partner-map-marker-caret {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: -5px;
    height: 10px;
  }
}
.leaflet-container a.leaflet-popup-close-button {
  padding-top: 7px;
  width: 30px;
  height: 30px;
}
.leaflet-customer-control {
  background-color: white;
  padding: 10px;
  color: black;
  .v-input {
    margin-top: 0;
    padding-top: 0;
  }
}
.theme--light {
  .leaflet-map-search-card {
    .leaflet-search-in-map {
      .v-input__slot {
        border-color: rgb(230, 230, 230);
      }
    }
    .collapse-magic-card {
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
.theme--dark {
  .leaflet-map-search-card {
    .leaflet-search-in-map {
      .v-input__slot {
        border-color: rgb(50, 50, 50);
      }
    }
    .collapse-magic-card {
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}
@keyframes i-am-here-pulse-animation {
  0% {
    box-shadow: 0 0 0 0 rgba(42, 127, 255, 0.4);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(42, 127, 255, 0);
  }
}
@keyframes magic-pulse-animation {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(49, 153, 78, 0);
  }
}
@keyframes open-magic-card-animation {
  0% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}
@media only screen and (max-width: 600px) {
  .leaflet-map .leaflet-sun-time-line {
    bottom: 1px;
    left: 0;
    border-radius: 1px;
    width: 100%;
  }
}
</style>
