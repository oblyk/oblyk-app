<template>
  <div
    v-if="IAmGeolocated"
    class="around-card"
  >
    <v-row>
      <!-- Crags -->
      <v-col
        class="text-truncate text-center hover-col"
        :class="user.partner_search ? 'col-4 col-md-4' : 'col-6 col-md-6'"
        @click="cragsDialog = true"
      >
        <v-sheet
          rounded
          class="pa-3"
        >
          <v-icon
            large
            color="primary"
          >
            {{ mdiTerrain }}
          </v-icon>
          <p class="mt-2 mb-0">
            {{ $tc('components.crag.cragCount', crags.length, { count: crags.length }) }}
          </p>
        </v-sheet>
      </v-col>

      <!-- Gyms -->
      <v-col
        class="text-truncate text-center hover-col"
        :class="user.partner_search ? 'col-4 col-md-4' : 'col-6 col-md-6'"
        @click="gymsDialog = true"
      >
        <v-sheet
          rounded
          class="pa-3"
        >
          <v-icon
            large
            color="primary"
          >
            {{ mdiHomeRoof }}
          </v-icon>
          <p class="mt-2 mb-0">
            {{ $tc('components.gym.gymCount', gyms.length, { count: gyms.length }) }}
          </p>
        </v-sheet>
      </v-col>

      <!-- Climbers -->
      <v-col
        v-if="user.partner_search"
        class="col-4 col-md-4 text-center text-truncate hover-col"
        @click="climbersDialog = true"
      >
        <v-sheet
          rounded
          class="pa-3"
        >
          <v-icon
            large
            color="primary"
          >
            {{ mdiHuman }}
          </v-icon>
          <p class="mt-2 mb-0">
            {{ $tc('components.user.userCount', climbers.length, { count: climbers.length }) }}
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

    <!-- climbers modal -->
    <v-dialog
      v-model="climbersDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $tc('components.user.userAround', climbers.length, { count: climbers.length }) }}
        </v-card-title>
        <v-card-text>
          <user-small-card
            v-for="(user, index) in climbers"
            :key="`users-${index}`"
            :small="true"
            :user="user"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="climbersDialog = false"
          >
            {{ $t('common.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Around Settings modal -->
    <v-dialog
      v-model="aroundSettingsDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $tc('components.user.aroundSettings') }}
        </v-card-title>
        <v-card-text>
          <p>{{ $t('components.user.chooseNewsArea') }}</p>
          <v-slider
            v-model="settingDistance"
            color="primary"
            :label="$t('components.user.distanceSetting', { distance: settingDistance })"
            min="1"
            max="100"
            thumb-label
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            text
            @click="aroundSettingsDialog = false"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            color="primary"
            @click="setFeedSetting()"
          >
            {{ $t('components.user.saveMyPreference') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiMapMarkerRadius, mdiTerrain, mdiHomeRoof, mdiHuman } from '@mdi/js'
import CragApi from '~/services/oblyk-api/CragApi'
import GymApi from '~/services/oblyk-api/GymApi'
import PartnerApi from '~/services/oblyk-api/PartnerApi'
import Crag from '@/models/Crag'
import Gym from '@/models/Gym'
import User from '@/models/User'
import CragSmallCard from '@/components/crags/CragSmallCard'
import GymSmallCard from '@/components/gyms/GymSmallCard'
import UserSmallCard from '@/components/users/UserSmallCard'

export default {
  name: 'AroundCard',
  components: { UserSmallCard, GymSmallCard, CragSmallCard },
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiMapMarkerRadius,
      mdiTerrain,
      mdiHomeRoof,
      mdiHuman,
      distance: 20,
      settingDistance: null,
      cragsDialog: false,
      gymsDialog: false,
      climbersDialog: false,
      aroundSettingsDialog: false,
      crags: [],
      gyms: [],
      climbers: []
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
    distance () {
      this.getElementAround()
    }
  },

  mounted () {
    this.distance = localStorage.getItem('distanceAroundLocation') || 20
    this.settingDistance = this.distance
    this.getElementAround()
  },

  methods: {
    getElementAround () {
      if (this.IAmGeolocated) {
        this.getCragsAround()
        this.getGymsAround()
        if (this.user.partner_search) { this.getPartnersAround() }
      }
    },

    getCragsAround () {
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
    },

    getGymsAround () {
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
    },

    getPartnersAround () {
      new PartnerApi(this.$axios, this.$auth)
        .partnersAround(
          this.latitude,
          this.longitude,
          this.distance
        )
        .then((resp) => {
          this.climbers = []
          for (const user of resp.data) {
            this.climbers.push(new User({ attributes: user }))
          }
        })
    },

    setFeedSetting () {
      this.distance = this.settingDistance
      localStorage.setItem('distanceAroundLocation', this.settingDistance)
      this.aroundSettingsDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.around-card {
  font-size: 0.8em;
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
</style>
