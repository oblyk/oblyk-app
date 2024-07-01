<template>
  <div>
    <v-sheet
      v-if="!editingSectorPolygon && !editingSectorColor"
      class="pb-4 border-right gym-space-card"
      :elevation="$vuetify.breakpoint.mobile ? 3 : 0"
      :class="$vuetify.breakpoint.mobile ? '--mobile-interface rounded' : '--desktop-interface'"
    >
      <!-- Visual indication that encourages scrolling -->
      <div
        v-if="$vuetify.breakpoint.mobile"
        class="scroll-encourage"
      >
        <div />
      </div>

      <!-- Gym Title -->
      <v-list
        v-if="gym"
        class="pt-0 pb-0 mx-2"
        color="rgba(0,0,0,0)"
      >
        <v-list-item class="pl-0">
          <v-list-item-avatar
            v-if="gym.logo"
            tile
            size="50"
          >
            <v-avatar
              size="50"
              tile
              class="vertical-align-top rounded-sm"
            >
              <v-img :src="gym.thumbnailLogoUrl" alt="gym logo" />
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              {{ gym.name }}<span class="font-weight-regular">, {{ gymSpace.name }}</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              <subscribe-btn
                subscribe-type="Gym"
                :subscribe-id="gym.id"
                outlined
                type-text
                :small="true"
              />
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action
            v-if="gym && $auth.loggedIn && (currentUserIsGymAdmin() && (gymAuthCan(gym, 'manage_space') || gymAuthCan(gym, 'manage_opening')))"
          >
            <gym-space-action-menu
              :gym-space="gymSpace"
              :gym="gym"
            />
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <!-- Skeleton loader for gym name -->
      <v-skeleton-loader
        v-else
        class="my-3"
        type="list-item-avatar"
      />

      <!-- Space selector -->
      <gym-space-selector
        class="mt-2 px-1"
        :gym-space="gymSpace"
        :gym="gymSpace.gym"
      />

      <!-- Space description -->
      <div class="gym-space-description mt-2 px-3">
        <markdown-text
          v-if="gymSpace.description"
          :text="gymSpace.description"
        />
      </div>

      <gym-ranking-and-logbook
        class="mt-3 px-3"
        :gym="gym"
      />

      <div
        v-if="gym.upcoming_contests.length > 0"
        class="mt-4 px-3"
      >
        <contest-up-coming
          :gym="gym"
          class="mt-2 mb-3"
          :elevation="$vuetify.breakpoint.mobile ? 3 : 0"
        />
      </div>

      <div class="border-top border-bottom px-4 my-3">
        <h3 class="py-1">
          {{ $t('components.gym.guidebook') }} !
        </h3>
      </div>

      <!-- Route list -->
      <gym-space-route-list
        class="mt-4 px-3"
        :gym-space="gymSpace"
        :gym="gym"
      />
    </v-sheet>

    <!-- If in editing sector polygon -->
    <v-sheet
      v-if="editingSectorPolygon"
      class="h-100"
      rounded
    >
      <gym-sector-editing-plan
        v-if="editingSectorPolygon"
      />
    </v-sheet>

    <!-- If in editing sector colors -->
    <v-sheet
      v-if="editingSectorColor"
      class="h-100"
      rounded
    >
      <gym-space-editing-sectors-color
        v-if="editingSectorColor"
        :gym-space="gymSpace"
      />
    </v-sheet>
  </div>
</template>

<script>
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import GymSpaceSelector from '@/components/gymSpaces/GymSpaceSelector'
import GymSpaceRouteList from '@/components/gymRoutes/GymSpaceRouteList'
import ContestUpComing from '~/components/gyms/ContestUpComing'
import SubscribeBtn from '~/components/forms/SubscribeBtn'
import GymRankingAndLogbook from '~/components/gyms/GymRankingAndLogbook'
const GymSpaceActionMenu = () => import('@/components/gymSpaces/GymSpaceActionMenu')
const GymSectorEditingPlan = () => import('@/components/gymSectors/GymSectorEditingPlan')
const GymSpaceEditingSectorsColor = () => import('~/components/gymSpaces/GymSpaceEditingSectorsColor')
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymSpaceInfoAndRoutes',
  components: {
    GymRankingAndLogbook,
    SubscribeBtn,
    ContestUpComing,
    GymSpaceEditingSectorsColor,
    MarkdownText,
    GymSectorEditingPlan,
    GymSpaceRouteList,
    GymSpaceActionMenu,
    GymSpaceSelector
  },
  mixins: [GymRolesHelpers],

  props: {
    gymSpace: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      editingSectorPolygon: false,
      editingSectorColor: false
    }
  },

  mounted () {
    this.$root.$on('showEditingExplain', (visible) => {
      this.editingSectorPolygon = visible
    })
    this.$root.$on('showEditingSectorColor', (visible) => {
      this.editingSectorColor = visible
    })
  },

  beforeDestroy () {
    this.$root.$off('showEditingExplain')
    this.$root.$off('showEditingSectorColor')
  }
}
</script>

<style lang="scss" scoped>
.gym-space-card.--mobile-interface { min-height: calc(100vh - 44px); }
.gym-space-card.--desktop-interface { min-height: calc(100vh - 64px); }
.scroll-encourage {
  margin-bottom: 10px;
  padding-top: 5px;
  div {
    margin-left: auto;
    margin-right: auto;
    width: 30px;
    height: 5px;
    border-radius: 3px;
  }
}
.theme--dark {
  .scroll-encourage {
    div {
      background-color: rgba(98, 0, 234, 0.5);
    }
  }
}
.theme--light {
  .scroll-encourage {
    div {
      background-color: rgba(98, 0, 234, 0.5);
    }
  }
}
.gym-space-description {}
.space-actions-btn {
  max-width: 40px;
  padding-left: 0;
  padding-right: 5px;
  text-align: center;
  padding-top: 20px;
}
</style>
