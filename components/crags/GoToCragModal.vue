<template>
  <v-dialog
    v-model="goToCragModal"
    width="400"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        class="mb-3 expand"
        block
        v-bind="attrs"
        small
        outlined
        v-on="on"
      >
        {{ $t('components.navigation.goTo') }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">
        {{ $t('components.navigation.goTo') }}
      </v-card-title>

      <v-card-text>
        <!-- Park -->
        <div
          v-for="(park, index) in parks"
          :key="`park-${index}`"
          :class="parks.length > 0 ? 'mb-7' : ''"
        >
          <v-row class="mt-2">
            <v-col cols="12" class="pb-0">
              <p class="mb-1">
                <v-icon left>
                  {{ mdiAlphaPBox }}
                </v-icon>
                {{ $t('components.navigation.goToPark', { number: index + 1 }) }}
              </p>
              <p
                v-if="park.description"
                class="grey--text mb-1"
              >
                {{ park.description }}
              </p>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" class="pt-0">
              <v-btn
                :href="mapLink(park.latitude, park.longitude, 'google')"
                block
                outlined
                small
                text
              >
                <v-icon left color="#39a556">
                  {{ mdiGoogleMaps }}
                </v-icon>
                Google Maps
              </v-btn>
            </v-col>
            <v-col class="pt-0">
              <v-btn
                :href="mapLink(park.latitude, park.longitude, 'waze')"
                block
                outlined
                small
                text
              >
                <v-icon left color="#31c7f8">
                  {{ mdiWaze }}
                </v-icon>
                Waze
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <!-- Crags -->
        <v-row>
          <v-col cols="12" class="pb-0">
            <p class="mb-2">
              <v-icon left>
                {{ mdiTerrain }}
              </v-icon>
              {{ $t('components.navigation.cragBottom') }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pt-0">
            <v-btn
              :href="mapLink(crag.latitude, crag.longitude, 'google')"
              block
              outlined
              small
              text
            >
              <v-icon left color="#39a556">
                {{ mdiGoogleMaps }}
              </v-icon>
              Google Maps
            </v-btn>
          </v-col>
          <v-col class="pt-0">
            <v-btn
              :href="mapLink(crag.latitude, crag.longitude, 'waze')"
              block
              outlined
              small
              text
            >
              <v-icon left color="#31c7f8">
                {{ mdiWaze }}
              </v-icon>
              Waze
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="goToCragModal = false"
        >
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiAlphaPBox, mdiGoogleMaps, mdiWaze, mdiTerrain } from '@mdi/js'
import ParkApi from '~/services/oblyk-api/ParkApi'
import Park from '@/models/Park'

export default {
  name: 'GoToCragModal',
  props: {
    crag: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiAlphaPBox,
      mdiGoogleMaps,
      mdiWaze,
      mdiTerrain,
      loadingPark: true,
      parks: [],
      goToCragModal: false
    }
  },

  watch: {
    goToCragModal () {
      if (this.goToCragModal) {
        this.getParkings()
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
          this.loadingPark = true
        })
    },

    mapLink (lat, lng, service) {
      if (service === 'google') {
        return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      } else if (service === 'waze') {
        return `https://ul.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes`
      }
    }
  }
}
</script>
