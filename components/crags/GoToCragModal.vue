<template>
  <v-dialog
    v-model="goToCragModal"
    width="400"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="mb-3 black-btn-icon --with-border"
        dark
        elevation="0"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon left>
          {{ mdiDirectionsFork }}
        </v-icon>
        {{ $t('components.navigation.goTo') }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline border-bottom mb-3 d-flex">
        <div>
          {{ $t('components.navigation.goTo') }}
        </div>
        <v-btn
          class="ml-auto"
          icon
          @click="closeModal"
        >
          <v-icon>
            {{ mdiClose }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="px-3">
        <!-- By cycle and train -->
        <p class="mb-1 font-weight-bold">
          <v-icon
            color="light-green darken-1"
            left
          >
            {{ mdiLeaf }}
          </v-icon>
          {{ $t('components.navigation.softMobility') }}
        </p>
        <div
          v-if="loadingVeloGrimpeLink"
          class="mb-3 pa-2 text-center"
        >
          <v-progress-circular
            indeterminate
            :size="10"
            :width="2"
            class="mr-2"
          />
          {{ $t('components.navigation.loadSoftMobility') }} ...
        </div>
        <div
          v-if="!loadingVeloGrimpeLink && veloGrimpeLinks.length > 0"
        >
          <v-list-item class="border rounded">
            <v-list-item-avatar>
              <v-img src="/images/logo-velo-grimpe.png" alt="logo-velo-grimpe" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                velogrimpe.fr
              </v-list-item-title>
              <v-list-item-subtitle
                class="text-wrap"
                v-html="$t('components.navigation.goToWithTrainAndBike', { name: crag.name })"
              />
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                v-if="veloGrimpeLinks.length === 1"
                icon
                dark
                class="black-btn-icon"
                :href="veloGrimpeLinks[0].link"
                target="_blank"
              >
                <v-icon>
                  {{ mdiArrowRight }}
                </v-icon>
              </v-btn>
              <v-menu v-else>
                <template #activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      {{ mdiArrowRight }}
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(link, linkIndex) in veloGrimpeLinks"
                    :key="`link-index-${linkIndex}`"
                    :href="link.link"
                    target="_blank"
                  >
                    <v-list-item-title>
                      {{ link.name }}
                    </v-list-item-title>
                    <v-list-item-action>
                      <v-icon>
                        {{ mdiArrowRight }}
                      </v-icon>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-action>
          </v-list-item>
        </div>
        <p
          v-if="!loadingVeloGrimpeLink && veloGrimpeLinks.length === 0"
          class="text-center text--disabled mt-1 mb-0"
        >
          {{ $t('components.navigation.noSoftMobility') }}
        </p>
      </v-card-text>

      <v-card-text class="border-top px-3 pt-4">
        <!-- Choose your favorite navigation app -->
        <v-select
          v-model="navigationApp"
          outlined
          :items="availableNavigationApps"
          item-text="text"
          item-value="value"
          :label="$t('components.navigation.myNavigationApp')"
          hide-details
        >
          <template #item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item" />
            </template>
            <template v-else>
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon
                    :color="data.item.color"
                    left
                  >
                    {{ data.item.icon }}
                  </v-icon>
                  {{ data.item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
          </template>
          <template #selection="{ attrs, item }">
            <div v-bind="attrs">
              <v-icon
                left
                class="vertical-align-text-bottom"
                :color="item.color"
              >
                {{ item.icon }}
              </v-icon>
              {{ item.text }}
            </div>
          </template>
        </v-select>

        <!-- Park -->
        <p class="mb-1 mt-4 font-weight-bold">
          <v-icon left>
            {{ mdiAlphaPBox }}
          </v-icon>
          {{ $tc('components.navigation.parkList', parks.length) }}
        </p>
        <div
          v-if="loadingPark"
          class="mb-3 pa-2 text-center"
        >
          <v-progress-circular
            indeterminate
            :size="10"
            :width="2"
            class="mr-2"
          />
          {{ $t('components.navigation.loadParks') }} ...
        </div>
        <div
          v-if="!loadingPark && parks.length > 0"
          class="mb-7"
        >
          <v-card
            v-for="(park, parkIndex) in parks"
            :key="`park-${parkIndex}`"
            class="border mb-2"
          >
            <div class="d-flex flex-no-wrap">
              <v-avatar
                class="rounded"
                size="85"
                tile
              >
                <v-img :src="imageVariant(park.attachments.static_map, { fit: 'scale-down', width: 200, height: 200 })" />
              </v-avatar>
              <div class="flex-grow-1">
                <div class="pl-2 d-flex flex-column justify-space-between full-height">
                  <div v-if="park.description">
                    {{ park.description }}
                  </div>
                  <div
                    v-else
                    class="text-center text--disabled pt-4"
                  >
                    {{ $t('components.navigation.noParkDescription') }}
                  </div>

                  <div class="text-right">
                    <v-btn
                      dark
                      small
                      elevation="0"
                      class="black-btn-icon"
                      :href="mapLink(park.latitude, park.longitude)"
                      target="_blank"
                    >
                      Go
                      <v-icon right>
                        {{ mdiArrowRight }}
                      </v-icon>
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </div>

        <!-- No Parks -->
        <p
          v-if="!loadingPark && parks.length === 0"
          class="mb-7 text-center font-italic"
        >
          {{ $t('components.navigation.noParks') }}...
        </p>

        <!-- Crags -->
        <p class="mb-2 font-weight-bold">
          <v-icon left>
            {{ mdiTerrain }}
          </v-icon>
          {{ $t('components.navigation.cragBottom') }}
        </p>
        <v-card class="border mb-2">
          <div class="d-flex flex-no-wrap">
            <v-avatar
              class="rounded"
              size="85"
              tile
            >
              <v-img :src="imageVariant(crag.attachments.static_map, { fit: 'scale-down', width: 200, height: 200 })" />
            </v-avatar>
            <div class="flex-grow-1">
              <div class="pl-2 d-flex flex-column justify-space-between full-height">
                <div class="text--disabled pt-1">
                  {{ $t('components.navigation.cragBottomOf', { name: crag.name }) }}
                </div>
                <div class="text-right">
                  <v-btn
                    :href="mapLink(crag.latitude, crag.longitude)"
                    target="_blank"
                    elevation="0"
                    class="black-btn-icon"
                    dark
                    small
                  >
                    Go
                    <v-icon right>
                      {{ mdiArrowRight }}
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mdiAlphaPBox,
  mdiGoogleMaps,
  mdiWaze,
  mdiTerrain,
  mdiDirectionsFork,
  mdiArrowRight,
  mdiBike,
  mdiTrain,
  mdiLeaf,
  mdiClose,
  mdiCellphoneMarker
} from '@mdi/js'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import ParkApi from '~/services/oblyk-api/ParkApi'
import Park from '@/models/Park'
import VeloGrimpeApi from '~/services/velogrimpe'

export default {
  name: 'GoToCragModal',
  mixins: [ImageVariantHelpers],
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingPark: true,
      parks: [],
      goToCragModal: false,
      selectedPark: null,
      showCragNavigationOption: false,
      loadingVeloGrimpeLink: true,
      veloGrimpeLinks: [],
      navigationApp: 'default',
      availableNavigationApps: [
        { value: 'default', text: this.$t('components.navigation.defaultApp'), icon: mdiCellphoneMarker, color: null },
        { value: 'google_maps', text: 'Google Maps', icon: mdiGoogleMaps, color: '#ea4436' },
        { value: 'waze', text: 'Waze', icon: mdiWaze, color: '#31c7f8' }
      ],

      mdiAlphaPBox,
      mdiTerrain,
      mdiDirectionsFork,
      mdiArrowRight,
      mdiBike,
      mdiTrain,
      mdiLeaf,
      mdiClose
    }
  },

  watch: {
    goToCragModal () {
      if (this.goToCragModal) {
        this.getParkings()
        this.getVeloGrimpeLink()
      }
    }
  },

  methods: {
    getParkings () {
      this.parks = []
      new ParkApi(this.$axios, this.$auth)
        .all(this.crag.id)
        .then((resp) => {
          for (const park of resp.data) {
            this.parks.push(new Park({ attributes: park }))
          }
        })
        .finally(() => {
          this.loadingPark = false
        })
    },

    getVeloGrimpeLink () {
      this.loadingVeloGrimpeLink = true
      new VeloGrimpeApi(this.$axios)
        .oblykGetId(this.crag.id)
        .then((resp) => {
          this.veloGrimpeLinks = []
          for (const veloGimpeData of resp.data) {
            const data = veloGimpeData
            data.link = `https://www.velogrimpe.fr/falaise.php?falaise_id=${data.id}`
            this.veloGrimpeLinks.push(veloGimpeData)
          }
        })
        .finally(() => {
          this.loadingVeloGrimpeLink = false
        })
    },

    mapLink (lat, lng) {
      if (this.navigationApp === 'default') {
        return `geo:${lat},${lng}`
      } else if (this.navigationApp === 'google_maps') {
        return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      } else if (this.navigationApp === 'waze') {
        return `https://ul.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes`
      }
    },

    closeModal () {
      this.goToCragModal = false
      this.selectedPark = null
      this.veloGrimpeLinks = []
      this.showCragNavigationOption = false
    }
  }
}
</script>
