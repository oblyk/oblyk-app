<template>
  <div>
    <v-simple-table>
      <template #default>
        <tbody>
          <tr
            v-for="(route, routeIndex) in contestRoutes"
            :key="`route-index-${routeIndex}`"
          >
            <td
              style="width: 10px"
              class="text-left text-no-wrap pl-2 pr-0"
            >
              <v-chip>
                {{ route.number }}
              </v-chip>
              <span
                v-if="contestStep.ranking_type === 'fixed_points' && route.fixed_points"
                class="ml-2"
              >
                {{ route.fixed_points }} pts
              </span>
            </td>
            <td
              v-if="havePictures"
              style="width: 10px"
              class="text-no-wrap px-0"
            >
              <v-avatar
                v-if="route.attachments.picture.attached"
                size="32"
                rounded
                class="flex-grow-0"
                @click="openPictureModal(route)"
              >
                <v-img :src="imageVariant(route.attachments.picture, { fit: 'crop', height: 50, width: 50 })" />
              </v-avatar>
            </td>
            <td class="py-2 pl-3 pr-0">
              <div v-if="route.name || route.gym_route_id">
                <div
                  v-if="route.name"
                  class="font-weight-bold mb-1"
                >
                  {{ route.name }}
                </div>
                <gym-route-simple-item
                  v-if="route.gym_route_id"
                  :gym-route="route.gym_route"
                  :callback="routeSelected"
                  class="my-1"
                />
              </div>
              <contest-route-ascent-form
                :contest-step="contestStep"
                :contest-route="route"
                :contest="contest"
                :participant-token="participantToken"
                @input="storeChange"
              />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-btn
      :disabled="!changed"
      color="primary"
      style="position: sticky; bottom: 5px; margin-left: auto; display: block; margin-right: 5px"
      elevation="0"
      :loading="saving"
      @click="save"
    >
      {{ $t('actions.save') }}
    </v-btn>

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
        :src="imageVariant(contestRoute.attachments.picture, { fit: 'scale-down', height: 1080, width: 1080 })"
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
import ContestParticipantAscentApi from '~/services/oblyk-api/ContestParticipantAscentApi'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'ContestRoutesRealised',
  components: { GymRouteInfo, GymRouteSimpleItem, ContestRouteAscentForm },
  mixins: [ImageVariantHelpers],
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
    },
    saveCallback: {
      type: Function,
      default: null
    },
    changeCallback: {
      type: Function,
      default: null
    },
    onlyRouteIds: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      routeModal: false,
      pictureModal: false,
      gymRoute: null,
      contestRoute: null,
      loadingGymRoute: true,
      saving: false,
      gym: null,
      ascents: {},
      changed: false
    }
  },

  computed: {
    havePictures () {
      for (const route of this.contestStep.routes) {
        if (route.attachments.picture.attached !== null) {
          return true
        }
      }
      return false
    },

    contestRoutes () {
      if (this.onlyRouteIds) {
        const routes = []
        for (const route of this.contestStep.routes) {
          if (this.onlyRouteIds.includes(route.id)) {
            routes.push(route)
          }
        }
        return routes
      } else {
        return this.contestStep.routes
      }
    }
  },

  watch: {
    changed () {
      if (this.changeCallback) {
        this.changeCallback(this.changed)
      }
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

    storeChange (data) {
      this.ascents[data.contest_route_id] = data
      this.changed = true
    },

    save () {
      this.saving = true
      const ascents = []
      for (const ascent in this.ascents) {
        ascents.push(this.ascents[ascent])
      }
      const data = {
        gym_id: this.contest.gym_id,
        contest_id: this.contest.id,
        contest_participant_token: this.participantToken,
        ascents
      }
      new ContestParticipantAscentApi(this.$axios, this.$auth)
        .bulk(data)
        .then(() => {
          this.ascents = {}
          this.changed = false
          this.$root.$emit('alertSimpleSuccess', 'Progression sauvegardée avec succès !')
          if (this.saveCallback) {
            this.saveCallback()
          }
        })
        .catch(() => {
          this.$root.$emit('alertSimpleError', "Une erreur s'est produite...")
        })
        .finally(() => {
          this.saving = false
        })
    },

    closeModal () {
      this.routeModal = false
    }
  }
}
</script>
