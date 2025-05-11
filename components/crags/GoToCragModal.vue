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
      <v-card-title class="headline">
        {{ $t('components.navigation.goTo') }}
      </v-card-title>

      <v-card-text>
        <!-- Park -->
        <p class="mb-1 font-weight-bold">
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
                <div
                  v-if="selectedPark !== park.id"
                  class="pl-2 d-flex flex-column justify-space-between full-height"
                >
                  <div>
                    {{ park.description }}
                  </div>

                  <div class="text-right">
                    <v-btn
                      small
                      text
                      @click="selectedPark = park.id"
                    >
                      {{ $t('components.navigation.getTo') }}
                      <v-icon right>
                        {{ mdiArrowRight }}
                      </v-icon>
                    </v-btn>
                  </div>
                </div>
                <v-slide-x-reverse-transition hide-on-leave>
                  <div v-if="selectedPark === park.id">
                    <div>
                      <v-btn
                        :href="mapLink(park.latitude, park.longitude, 'google')"
                        small
                        text
                      >
                        <v-icon left color="#ea4436">
                          {{ mdiGoogleMaps }}
                        </v-icon>
                        Google Maps
                      </v-btn>
                    </div>
                    <div>
                      <v-btn
                        :href="mapLink(park.latitude, park.longitude, 'waze')"
                        small
                        text
                      >
                        <v-icon left color="#31c7f8">
                          {{ mdiWaze }}
                        </v-icon>
                        Waze
                      </v-btn>
                    </div>
                    <div v-if="!loadindVeloGrimpeLink && veloGrimpeLinks.length > 0">
                      <v-btn
                        v-if="veloGrimpeLinks.length === 1"
                        small
                        text
                        :href="veloGrimpeLinks[0].link"
                        target="_blank"
                      >
                        <v-icon left color="#2e8b57">
                          {{ mdiBike }}
                        </v-icon>
                        Vélo grimpe
                      </v-btn>
                      <v-menu v-else>
                        <template #activator="{ on, attrs }">
                          <v-btn
                            small
                            text
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon left color="#2e8b57">
                              {{ mdiBike }}
                            </v-icon>
                            Vélo grimpe
                            <v-chip
                              x-small
                              class="px-1 ml-1"
                            >
                              {{ veloGrimpeLinks.length }}
                            </v-chip>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item
                            v-for="(link, linkIndex) in veloGrimpeLinks"
                            :key="`link-index-${linkIndex}`"
                            :href="link.link"
                            target="_blank"
                          >
                            {{ link.name }}
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </div>
                </v-slide-x-reverse-transition>
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
              <div>
                <div>
                  <v-btn
                    :href="mapLink(crag.latitude, crag.longitude, 'google')"
                    small
                    text
                  >
                    <v-icon left color="#ea4436">
                      {{ mdiGoogleMaps }}
                    </v-icon>
                    Google Maps
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    :href="mapLink(crag.latitude, crag.longitude, 'waze')"
                    small
                    text
                  >
                    <v-icon left color="#31c7f8">
                      {{ mdiWaze }}
                    </v-icon>
                    Waze
                  </v-btn>
                </div>
                <div v-if="!loadindVeloGrimpeLink && veloGrimpeLinks.length > 0">
                  <v-btn
                    v-if="veloGrimpeLinks.length === 1"
                    small
                    text
                    :href="veloGrimpeLinks[0].link"
                    target="_blank"
                  >
                    <v-icon left color="#2e8b57">
                      {{ mdiBike }}
                    </v-icon>
                    Vélo grimpe
                  </v-btn>
                  <v-menu v-else>
                    <template #activator="{ on, attrs }">
                      <v-btn
                        small
                        text
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon left color="#2e8b57">
                          {{ mdiBike }}
                        </v-icon>
                        Vélo grimpe
                        <v-chip
                          x-small
                          class="px-1 ml-1"
                        >
                          {{ veloGrimpeLinks.length }}
                        </v-chip>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(link, linkIndex) in veloGrimpeLinks"
                        :key="`link-index-${linkIndex}`"
                        :href="link.link"
                        target="_blank"
                      >
                        {{ link.name }}
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="closeModal()"
        >
          {{ $t('actions.close') }}
        </v-btn>
      </v-card-actions>
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
  mdiBike
} from '@mdi/js'
import ParkApi from '~/services/oblyk-api/ParkApi'
import Park from '@/models/Park'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
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
      loadindVeloGrimpeLink: true,
      veloGrimpeLinks: [],

      mdiAlphaPBox,
      mdiGoogleMaps,
      mdiWaze,
      mdiTerrain,
      mdiDirectionsFork,
      mdiArrowRight,
      mdiBike
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
      this.loadindVeloGrimpeLink = true
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
          this.loadindVeloGrimpeLink = false
        })
    },

    mapLink (lat, lng, service) {
      if (service === 'google') {
        return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      } else if (service === 'waze') {
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
