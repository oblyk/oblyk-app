<template>
  <div>
    <div
      v-if="IAmGeolocated"
      class="around-card"
    >
      <v-row>
        <!-- Crags -->
        <v-col
          cols="6"
          class="text-center hover-col"
          @click="cragsDialog = true"
        >
          <v-sheet
            rounded
            class="pa-3 around-card-bnt"
          >
            <v-icon
              large
              color="primary"
            >
              {{ mdiTerrain }}
            </v-icon>
            <p
              v-if="!loadingCrags"
              class="mt-2 mb-0 text-truncate"
              v-html="$tc('components.crag.cragCount', crags.length, { count: crags.length })"
            />
            <p
              v-else
              class="mt-2 mb-0"
            >
              ...
            </p>
          </v-sheet>
        </v-col>

        <!-- Gyms -->
        <v-col
          cols="6"
          class="text-center hover-col"
          @click="gymsDialog = true"
        >
          <v-sheet
            rounded
            class="pa-3 around-card-bnt"
          >
            <v-icon
              large
              color="primary"
            >
              {{ mdiHomeRoof }}
            </v-icon>
            <p
              v-if="!loadingGyms"
              class="mt-2 mb-0 text-truncate"
              v-html="$tc('components.gym.gymCount', gyms.length, { count: gyms.length })"
            />
            <p
              v-else
              class="mt-2 mb-0"
            >
              ...
            </p>
          </v-sheet>
        </v-col>
      </v-row>

      <!-- Crags dialog -->
      <v-dialog
        v-model="cragsDialog"
        max-width="700"
      >
        <v-card>
          <v-card-title class="headline">
            {{ $tc('components.crag.cragAround', crags.length, { count: crags.length }) }}
          </v-card-title>
          <v-card-text>
            <crag-small-card
              v-for="(crag, index) in crags"
              :key="`crags-${index}`"
              :crag="crag"
              :small="true"
              class="mb-1"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="cragsDialog = false"
            >
              {{ $t('common.close') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Gyms modal -->
      <v-dialog
        v-model="gymsDialog"
        max-width="700"
      >
        <v-card>
          <v-card-title class="headline">
            {{ $tc('components.gym.gymAround', gyms.length, { count: gyms.length }) }}
          </v-card-title>
          <v-card-text>
            <gym-small-card
              v-for="(gym, index) in gyms"
              :key="`gyms-${index}`"
              :gym="gym"
              :small="true"
              class="mb-1"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              text
              @click="gymsDialog = false"
            >
              {{ $t('common.close') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div
      v-else
      class="around-card"
    >
      <v-sheet
        rounded
        class="pa-3 around-card-bnt text-center"
      >
        <p class="font-italic mb-1 mb-md-2">
          {{ $t('components.user.explainLocalization') }}
        </p>
        <v-btn
          text
          color="primary"
          @click="openLocalizationPopup"
        >
          {{ $t('actions.activate') }}
        </v-btn>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mdiTerrain, mdiHomeRoof } from '@mdi/js'
import CragApi from '~/services/oblyk-api/CragApi'
import GymApi from '~/services/oblyk-api/GymApi'
import Crag from '@/models/Crag'
import Gym from '@/models/Gym'
import CragSmallCard from '@/components/crags/CragSmallCard'
import GymSmallCard from '@/components/gyms/GymSmallCard'

export default {
  name: 'AroundCard',
  components: { GymSmallCard, CragSmallCard },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      distance: 20,
      cragsDialog: false,
      gymsDialog: false,
      crags: [],
      gyms: [],
      loadingCrags: true,
      loadingGyms: true,

      mdiTerrain,
      mdiHomeRoof
    }
  },

  computed: {
    IAmGeolocated () {
      return this.$store.getters['geolocation/IAmGeolocated']
    },

    latitude () {
      return this.$store.state.geolocation.latitude
    },

    longitude () {
      return this.$store.state.geolocation.longitude
    }
  },

  watch: {
    IAmGeolocated () {
      if (this.IAmGeolocated) {
        this.getElementAround()
      }
    }
  },

  mounted () {
    this.distance = localStorage.getItem('distanceAroundLocation') || 20
    this.getElementAround()
  },

  methods: {
    getElementAround () {
      if (this.IAmGeolocated) {
        this.getCragsAround()
        this.getGymsAround()
      }
    },

    getCragsAround () {
      this.loadingCrags = true
      new CragApi(this.$axios, this.$auth)
        .cragsAround(
          this.latitude,
          this.longitude,
          this.distance
        )
        .then((resp) => {
          this.crags = []
          for (const crag of resp.data) {
            this.crags.push(new Crag({ attributes: crag }))
          }
        })
        .finally(() => {
          this.loadingCrags = false
        })
    },

    getGymsAround () {
      this.loadingGyms = true
      new GymApi(this.$axios, this.$auth)
        .gymsAround(
          this.latitude,
          this.longitude,
          this.distance
        )
        .then((resp) => {
          this.gyms = []
          for (const gym of resp.data) {
            this.gyms.push(new Gym({ attributes: gym }))
          }
        })
        .finally(() => {
          this.loadingGyms = false
        })
    },

    openLocalizationPopup () {
      this.$root.$emit('ShowLocalizationPopup', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.around-card {
  font-size: 0.8em;
  .around-card-bnt {
    height: 160px;
    padding-top: 37px !important;
  }
  .hover-col {
    cursor: pointer;
    &:hover {
      color: #1e88e5;
      .v-icon {
        color: #1e88e5;
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .around-card {
    .around-card-bnt {
      height: 100px;
      padding-top: 12px !important;
    }
  }
}
</style>
