<template>
  <v-container fluid>
    <!-- Loading gym -->
    <div
      v-if="!gym"
      class="text-center mt-15"
    >
      <spinner :full-height="false" />
      <p class="text-center text--disabled">
        {{ $t('models.gymSpace.loading') }}
      </p>
    </div>

    <!-- Gym is loaded -->
    <v-row
      v-else
      class="gym-spaces-interface"
      :class="$vuetify.breakpoint.mobile ? '--mobile-interface' : '--desktop-interface'"
    >
      <!-- Spaces informations and routes -->
      <v-col
        cols="12"
        md="5"
        lg="4"
        class="gym-space-info-and-routes"
      >
        <!-- Gym information -->
        <v-card
          dark
          class="mb-4"
        >
          <v-img
            height="150px"
            :src="gym.bannerUrl"
            gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.5)"
          >
            <v-list-item
              dark
              class="mt-15 pt-3"
            >
              <v-list-item-avatar
                size="52"
              >
                <v-img :src="gym.logoUrl" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <h1
                    class="mb-n1 text-truncate"
                    style="color: white"
                  >
                    {{ gym.name }}
                  </h1>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-btn
                    small
                    icon
                    :to="gym.path"
                    class="mr-1 mt-n1"
                  >
                    <v-icon>
                      {{ mdiInformationOutline }}
                    </v-icon>
                  </v-btn>
                  <strong>{{ gym.city }}</strong>, {{ gym.address }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <subscribe-btn
                  :subscribe-id="gym.id"
                  subscribe-type="Gym"
                  :large="false"
                />
              </v-list-item-action>
            </v-list-item>
          </v-img>
        </v-card>

        <gym-go-to-ranking
          :gym="gym"
          class="mb-4"
        />

        <!-- Space selector in mobile interface -->
        <v-sheet
          v-if="$vuetify.breakpoint.mobile"
          class="rounded pa-4 mb-4"
        >
          <!-- Space list -->
          <gym-space-selector
            :gym="gym"
          />
        </v-sheet>

        <!-- Route list -->
        <v-sheet class="rounded px-4 pt-2 pb-4 mt-2">
          <h2
            v-if="!$vuetify.breakpoint.mobile"
            class="mb-2"
          >
            {{ $t('components.gym.guidebook') }}
          </h2>
          <p
            v-else
            class="mb-2"
          >
            <small class="text--disabled">
              {{ $t('components.gym.guidebook') }}
            </small>
          </p>
          <gym-space-route-list
            :gym="gym"
            :show-plan-options="false"
          />
        </v-sheet>
      </v-col>

      <!-- Spaces list or selected route -->
      <v-col
        v-if="!$vuetify.breakpoint.mobile"
        class="gym-spaces-list"
        cols="12"
        md="7"
        lg="8"
      >
        <!-- Open gym route in right side of info in desktop interface -->
        <v-slide-x-transition>
          <div
            v-show="loadingGymRoute || gymRoute"
            class="gym-route-on-desktop-container"
          >
            <v-card class="gym-route-card">
              <spinner v-if="loadingGymRoute" />
              <gym-route-info
                v-if="gymRoute"
                :gym-route="gymRoute"
                :show-space="true"
                :gym="gym"
              />
            </v-card>
          </div>
        </v-slide-x-transition>

        <!-- Gym Space Liste -->
        <v-slide-y-transition>
          <div
            v-show="!(loadingGymRoute || gymRoute)"
          >
            <gym-space-list :gym="gym" />
          </div>
        </v-slide-y-transition>
      </v-col>

      <!-- Open gym route in full screen on mobile -->
      <div
        v-if="(gymRoute || loadingGymRoute) && $vuetify.breakpoint.mobile"
        class="gym-route-modal-on-mobile"
      >
        <v-dialog
          :value="true"
          transition="dialog-bottom-transition"
          content-class="gym-route-dialog"
          persistent
        >
          <v-card
            @touchstart="touchEvent('start', $event)"
            @touchend="touchEvent('end', $event)"
          >
            <spinner v-if="loadingGymRoute" />
            <gym-route-info
              v-if="gymRoute"
              :gym-route="gymRoute"
              :show-space="true"
              :gym="gym"
            />
          </v-card>
        </v-dialog>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mdiInformationOutline } from '@mdi/js'
import { GymConcern } from '~/concerns/GymConcern'
import Spinner from '~/components/layouts/Spiner.vue'
import GymSpaceSelector from '~/components/gymSpaces/GymSpaceSelector.vue'
import GymSpaceRouteList from '~/components/gymRoutes/GymSpaceRouteList.vue'
import GymSpaceList from '~/components/gymSpaces/GymSpaceList.vue'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'
import GymRouteInfo from '~/components/gymRoutes/GymRouteInfo.vue'
import SubscribeBtn from '~/components/forms/SubscribeBtn.vue'
import GymGoToRanking from '~/components/gyms/GymGoToRanking.vue'

export default {
  components: {
    GymGoToRanking,
    SubscribeBtn,
    GymRouteInfo,
    GymSpaceList,
    GymSpaceRouteList,
    GymSpaceSelector,
    Spinner
  },
  meta: { orphanRoute: true },
  mixins: [GymConcern],

  data () {
    return {
      gymRoute: null,
      loadingGymRoute: false,
      closeDragStart: null,
      toucheClientY: 0,

      mdiInformationOutline
    }
  },

  computed: {
    activeGymRouteId () {
      return this.$route.query.route
    }
  },

  watch: {
    activeGymRouteId () {
      if (this.activeGymRouteId) {
        this.getGymRoute()
      } else {
        this.gymRoute = null
      }
    }
  },

  mounted () {
    if (this.activeGymRouteId) {
      this.getGymRoute()
    }
  },

  methods: {
    getGymRoute () {
      this.loadingGymRoute = true
      this.gymRoute = null
      new GymRouteApi(this.$axios, this.$auth)
        .find(
          this.$route.params.gymId,
          this.$route.params.gymSpaceId,
          this.activeGymRouteId
        ).then((resp) => {
          this.gymRoute = new GymRoute({ attributes: resp.data })
        }).finally(() => {
          this.loadingGymRoute = false
        })
    },

    closeGymRouteModal () {
      this.$router.push({ path: this.$route.path })
    },

    touchEvent (touchStatus, event) {
      const dialogue = document.querySelector('.gym-route-dialog')
      if (dialogue.scrollTop === 0 && touchStatus === 'start') {
        this.closeDragStart = true
        this.toucheClientY = event.changedTouches[0].clientY
      }
      if (touchStatus === 'end' && this.closeDragStart === true) {
        if (event.changedTouches[0].clientY - this.toucheClientY > 50) {
          this.closeGymRouteModal()
        }
      }
      if (touchStatus === 'end') {
        this.closeDragStart = null
        this.toucheClientY = null
      }
    }
  }
}
</script>

<style lang="scss">
.gym-spaces-interface {
  &.--desktop-interface {
    height: calc(100vh - 64px);
  }
  &.--mobile-interface {
    height: calc(100vh - 43px);
  }

  .gym-space-info-and-routes {
    height: 100%;
    overflow-y: auto;
  }

  .gym-spaces-list {
    height: 100%;
    overflow-y: auto;
    .gym-route-on-desktop-container {
      max-width: 450px;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      .gym-route-card {}
    }
  }
}
.gym-route-dialog {
  width: 100%;
  height: 100%;
  max-height: 100% !important;
  margin: 0;
  overflow-x: hidden;
  .v-card {
    min-height: 100%;
  }
}
.theme--dark {
  .gym-route-card {
    background-color: rgba(17, 17, 17, 0.9) !important;
  }
}
.theme--light {
  .gym-route-card {
    background-color: rgba(255, 255, 255, 0.8) !important;
  }
}
</style>
