<template>
  <!-- Gym space -->
  <div
    class="gym-space-interface"
    :class="$vuetify.breakpoint.mobile ? '--mobile-interface sheet-background-color' : '--desktop-interface'"
  >
    <!-- Plan area -->
    <div
      class="gym-space-plan"
      :class="$vuetify.breakpoint.mobile ? '--mobile-interface' : '--desktop-interface'"
    >
      <client-only>
        <!-- 2D plan -->
        <div
          v-if="gymSpace && gymSpace.representation_type === '2d_picture'"
          class="full-height"
        >
          <gym-space-plan
            v-if="gymSpace.attachments.plan.attached"
            :gym-space="gymSpace"
          />
          <gym-space-plan-missing
            v-if="!gymSpace.attachments.plan.attached"
            :gym-space="gymSpace"
            :gym="gymSpace.gym"
          />
        </div>

        <!-- 3D plan -->
        <div
          v-if="gymSpace && gymSpace.representation_type === '3d'"
          class="full-height sheet-background-color"
        >
          <gym-space-three-d
            v-if="gymSpace && gymSpace.have_three_d"
            :gym-space="gymSpace"
            :gym="gym"
          />
          <gym-space-three-d-missing
            v-if="!gymSpace.have_three_d"
            :gym-space="gymSpace"
            :gym="gymSpace.gym"
          />
        </div>
        <p
          v-if="!gymSpace"
          class="text-center text--disabled mt-5"
        >
          {{ $t('models.gymSpace.loading') }}
        </p>
      </client-only>
    </div>

    <!-- Space information and routes -->
    <div
      class="gym-space-left-side"
      :class="leftSideClass"
    >
      <!-- Space information and routes -->
      <div class="gym-space-info-and-routes">
        <v-sheet
          v-if="!gymSpace"
          class="rounded pa-4 ma-4"
        >
          <v-skeleton-loader type="sentences, avatar" />
        </v-sheet>
        <gym-space-info-and-routes
          v-if="gymSpace"
          :gym-space="gymSpace"
          :gym="gym"
        />
      </div>

      <!-- Open gym route in right side of info in desktop interface -->
      <div
        v-if="!$vuetify.breakpoint.mobile && (loadingGymRoute || gymRoute)"
        class="gym-route-on-desktop-container"
      >
        <div class="gym-route-on-desktop-card py-1 pl-1">
          <v-card class="gym-route-card">
            <spinner v-if="loadingGymRoute" />
            <gym-route-info
              v-if="gymRoute"
              :gym-route="gymRoute"
              :gym="gym"
            />
          </v-card>
        </div>
      </div>
    </div>

    <!-- Open gym route in full screen on mobile -->
    <down-to-close-dialog
      v-if="$vuetify.breakpoint.mobile"
      ref="GymRouteDialog"
      v-model="gymRouteDialog"
      padding-x="px-2"
      :close-callback="closeGymRouteModal"
      wait-signal
    >
      <gym-route-info
        v-if="!loadingGymRoute && gymRoute"
        :close-callback="closeGymRouteModal"
        :gym-route="gymRoute"
        :gym="gym"
      />
    </down-to-close-dialog>
  </div>
</template>

<script>
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import GymSpaceInfoAndRoutes from '~/components/gymSpaces/GymSpaceInfoAndRoutes'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '~/models/GymRoute'
import Spinner from '~/components/layouts/Spiner'
import DownToCloseDialog from '~/components/ui/DownToCloseDialog'
import GymSpace from '~/models/GymSpace'
import GymSpaceApi from '~/services/oblyk-api/GymSpaceApi'
const GymSpaceThreeDMissing = () => import('~/components/gymSpaces/GymSpaceThreeDMissing')
const GymSpaceThreeD = () => import('~/components/gymSpaces/GymSpaceThreeD')
const GymRouteInfo = () => import('~/components/gymRoutes/GymRouteInfo')
const GymSpacePlan = () => import('@/components/gymSpaces/GymSpacePlan')
const GymSpacePlanMissing = () => import('@/components/gymSpaces/GymSpacePlanMissing')

export default {
  components: {
    GymSpaceThreeDMissing,
    GymSpaceThreeD,
    DownToCloseDialog,
    Spinner,
    GymSpaceInfoAndRoutes,
    GymRouteInfo,
    GymSpacePlanMissing,
    GymSpacePlan
  },
  mixins: [ImageVariantHelpers],
  scrollToTop: true,

  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingGymSpace: true,
      gymSpace: null,
      gymRoute: null,
      gymRouteDialog: false,
      loadingGymRoute: false
    }
  },

  head () {
    return {
      title: this.gymSpaceMetaTitle,
      meta: [
        { hid: 'description', name: 'description', content: this.gymSpaceMetaDescription },
        { hid: 'og:title', property: 'og:title', content: this.gymSpaceMetaTitle },
        { hid: 'og:description', property: 'og:description', content: this.gymSpaceMetaDescription },
        { hid: 'og:image', property: 'og:image', content: this.gymSpaceMetaImage },
        { hid: 'og:url', property: 'og:url', content: this.gymSpaceMetaUrl }
      ],
      link: [
        { rel: 'preload', href: this.gymSpaceMetaImage, as: 'image' }
      ]
    }
  },

  computed: {
    activeGymRouteId () {
      return this.$route.query.route
    },

    leftSideClass () {
      const leftClass = []
      if (this.$vuetify.breakpoint.mobile) {
        leftClass.push('--mobile-interface')
      } else {
        leftClass.push('--desktop-interface')
      }

      if (this.gymRoute !== null || this.loadingGymRoute) {
        leftClass.push('--with-active-gym-route')
      }
      return leftClass.join(' ')
    },

    gymSpaceMetaTitle () {
      return this.$t('metaTitle', { name: this.gymSpace?.name, gym: this.gymSpace?.gym?.name })
    },
    gymSpaceMetaDescription () {
      return this.$t('metaDescription', { gym: this.gymSpace?.gym?.name })
    },
    gymSpaceMetaImage () {
      if (this.gymSpace && this.gymSpace.gym.attachments.banner.attached) {
        return this.imageVariant(this.gymSpace.gym.attachments.banner, { fit: 'scale-down', height: 1920, width: 1290 })
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/images/oblyk-og-image.jpg`
      }
    },
    gymSpaceMetaUrl () {
      return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gymSpace?.path}`
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: "%{name} topo indoor de la salle d'escalade %{gym}",
        metaDescription: "Consulter le détail des voies d'escalade de %{gym}, ajoutez vos croix pour suivre votre progression"
      },
      en: {
        metaTitle: '%{name} indoor guide book of climbing gym %{gym}',
        metaDescription: 'Consult the details of the climbing routes of %{gym}, add your ascents to track your progress'
      }
    }
  },

  watch: {
    activeGymRouteId () {
      if (this.activeGymRouteId) {
        this.getGymRoute()
      } else if (this.$refs.GymRouteDialog) {
        this.$refs.GymRouteDialog.close()
      } else {
        this.gymRoute = null
      }
    },

    '$route' () {
      this.getGymSpace()
    }
  },

  created () {
    this.$store.dispatch('oblykEnvironment/pushHubs', { hub: this.gym.path, page: this.$route.path })
  },

  mounted () {
    this.$root.$on('ReFetchGymSpace', (gymSpace) => {
      if (gymSpace) {
        this.gymSpace = gymSpace
      } else {
        this.getGymSpace()
      }
    })
    this.getGymSpace()
  },

  beforeDestroy () {
    this.$root.$off('ReFetchGymSpace')
  },

  methods: {
    getGymSpace () {
      this.loadingGymSpace = true
      new GymSpaceApi(this.$axios, this.$auth)
        .find(this.$route.params.gymId, this.$route.params.gymSpaceId)
        .then((resp) => {
          this.gymSpace = new GymSpace({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingGymSpace = false
        })
    },

    async getGymRoute () {
      this.loadingGymRoute = true
      this.gymRoute = null
      this.gymRouteDialog = true

      // Get route in indexDb first and get in API if it does not exist
      const localRoute = await this.$localforage.gymRoutes.getItem(this.activeGymRouteId)
      if (localRoute) {
        this.gymRoute = new GymRoute({ attributes: localRoute })
        this.$refs.GymRouteDialog?.signal()
        this.loadingGymRoute = false
      } else {
        new GymRouteApi(this.$axios, this.$auth)
          .find(
            this.$route.params.gymId,
            this.$route.params.gymSpaceId,
            this.activeGymRouteId
          ).then((resp) => {
            this.gymRoute = new GymRoute({ attributes: resp.data })
            this.$refs.GymRouteDialog?.signal()
          }).finally(() => {
            this.loadingGymRoute = false
          })
      }
    },

    closeGymRouteModal () {
      this.gymRoute = null
      this.gymRouteDialog = false
      this.$router.push({ path: this.$route.path })
    }
  }
}
</script>

<style lang="scss">
.gym-space-interface {
  position: relative;
  width: 100%;
  &.--desktop-interface { height: calc(100vh - 128px); }
  &.--mobile-interface { height: calc(100vh - 43px); }

  .gym-space-left-side {
    position: relative;
    &.--desktop-interface {
      width: 450px;
      height: calc(100vh - 128px);
      overflow-y: auto;
      margin-top: 0;
      &.--with-active-gym-route {
        width: 900px;
      }
      .gym-space-info-and-routes {
        width: 450px;
      }
    }
    &.--mobile-interface {
      width: 100%;
      margin-top: calc(100vh - 322px);
      .gym-space-info-and-routes {
        padding-bottom: 45px;
      }
    }

    .gym-route-on-desktop-container {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 450px;
      overflow: hidden;
      z-index: 5;
      .gym-route-on-desktop-card {
        position: fixed;
        height: 100%;
        width: 450px;
        overflow-y: auto;
        overflow-x: hidden;
        .gym-route-card {
          min-height: 100%;
        }
      }
    }
  }

  .gym-space-plan {
    width: 100%;
    &.--desktop-interface {
      height: 100%;
      position: absolute;
      padding-left: 450px;
    }
    &.--mobile-interface {
      height: calc(100vh - 321px);
      position: fixed;
      top: 63px;
      right: 0;
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
</style>
