<template>
  <div>
    <v-simple-table>
      <template #default>
        <thead>
          <tr>
            <th
              style="width: 10px"
              class="text-left text-no-wrap"
            >
              {{ $t(`models.climbs.${contestStep.climbing_type}`) }} n°
            </th>
            <th v-if="haveGymRoutes || havePictures">
              Détail
            </th>
            <th class="text-left">
              {{ resultsTitle }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(route, routeIndex) in contestStep.routes"
            :key="`route-index-${routeIndex}`"
          >
            <td
              style="width: 10px"
              class="text-left text-no-wrap"
            >
              <v-chip>
                {{ route.number }}
              </v-chip>
            </td>
            <td
              v-if="haveGymRoutes || havePictures"
              style="width: 10px"
              class="text-no-wrap"
            >
              <gym-route-simple-item
                v-if="route.gym_route_id"
                :gym-route="route.gym_route"
                :callback="routeSelected"
              />
              <v-avatar
                v-if="route.picture"
                size="32"
                rounded
                class="flex-grow-0"
                @click="openPictureModal(route)"
              >
                <v-img :src="contestRouteObject(route).pictureUrl" />
              </v-avatar>
            </td>
            <td class="py-2">
              <contest-route-ascent-form
                :contest-step="contestStep"
                :contest-route="route"
                :contest="contest"
                :participant-token="participantToken"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- Route modal -->
    <v-dialog
      v-model="routeModal"
      width="750"
    >
      <v-card class="pa-1">
        <p
          v-if="loadingGymRoute"
          class="text--disabled text-center my-4"
        >
          {{ $t('common.loading') }}
        </p>
        <gym-route-info
          v-else
          :gym-route="gymRoute"
          :gym="gym"
          :close-callback="closeModal"
          show-space
          hide-ascent-btn
        />
      </v-card>
    </v-dialog>

    <!-- Picture modale -->
    <v-dialog
      v-model="pictureModal"
      width="700"
    >
      <v-img
        v-if="contestRoute"
        :src="contestRoute.pictureLargeUrl"
        :lazy-src="contestRoute.pictureUrl"
      />
    </v-dialog>
  </div>
</template>

<script>
import ContestRouteAscentForm from '~/components/contests/forms/ContestRouteAscentForm.vue'
import GymRouteSimpleItem from '~/components/gymRoutes/GymRouteItem.vue'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'
import GymRouteInfo from '~/components/gymRoutes/GymRouteInfo.vue'
import Gym from '~/models/Gym'
import GymApi from '~/services/oblyk-api/GymApi'
import ContestRoute from '~/models/ContestRoute'

export default {
  name: 'ContestRoutesRealised',
  components: { GymRouteInfo, GymRouteSimpleItem, ContestRouteAscentForm },
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestStep: {
      type: Object,
      required: true
    },
    participantToken: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      routeModal: false,
      pictureModal: false,
      gymRoute: null,
      contestRoute: null,
      loadingGymRoute: true,
      gym: null
    }
  },

  computed: {
    resultsTitle () {
      const climbType = this.$t(`models.climbs.${this.contestStep.climbing_type}`).toLowerCase()
      if (this.contestStep.ranking_type === 'division') {
        return `J'ai fait ou pas les ${climbType}s suivants :`
      } else if (this.contestStep.ranking_type === 'attempts_to_top') {
        return `Combien d'essais j'ai mis pour réaliser les ${climbType}s :`
      } else {
        return ''
      }
    },

    haveGymRoutes () {
      for (const route of this.contestStep.routes) {
        if (route.gym_route_id !== null) {
          return true
        }
      }
      return false
    },

    havePictures () {
      for (const route of this.contestStep.routes) {
        if (route.picture !== null) {
          return true
        }
      }
      return false
    }
  },

  methods: {
    async routeSelected (route) {
      this.loadingGymRoute = true
      if (this.gym === null) {
        await this.getGym(route.gym_id)
      }
      new GymRouteApi(this.$axios, this.$auth)
        .find(route.gym_id, route.gym_space_id, route.id)
        .then((resp) => {
          this.gymRoute = new GymRoute({ attributes: resp.data })
          this.routeModal = true
        })
        .finally(() => {
          this.loadingGymRoute = false
        })
    },

    openPictureModal (route) {
      this.contestRoute = this.contestRouteObject(route)
      this.pictureModal = true
    },

    contestRouteObject (route) {
      return new ContestRoute({ attributes: route })
    },

    getGym (gymId) {
      return new Promise((resolve) => {
        new GymApi(this.$axios, this.$auth)
          .find(gymId)
          .then((resp) => {
            this.gym = new Gym({ attributes: resp.data })
          })
          .finally(() => {
            resolve()
          })
      })
    },

    closeModal () {
      this.routeModal = false
    }
  }
}
</script>
