<template>
  <div>
    <v-sheet
      v-if="!editingSectorPolygon && !editingSectorColor"
      class="pb-4 border-right gym-space-card"
      :elevation="$vuetify.breakpoint.mobile ? 24 : 0"
      :class="$vuetify.breakpoint.mobile ? '--mobile-interface rounded border-top' : '--desktop-interface'"
    >
      <!-- Visual indication that encourages scrolling -->
      <div
        v-if="$vuetify.breakpoint.mobile"
        class="scroll-encourage"
      >
        <div />
      </div>

      <div class="border-bottom pl-2 mb-2 d-flex">
        <h3
          v-if="gym.gym_spaces.length > 1"
          class="py-1"
        >
          {{ gymSpace.name }}
          <small class="font-weight-regular text-lowercase">
            , {{ $t('components.gym.guidebook') }}
          </small>
        </h3>
        <h3 v-else class="py-1">
          {{ $t('components.gym.guidebook') }}
        </h3>
        <div class="ml-auto">
          <client-only>
            <gym-space-action-menu
              v-if="gym && $auth.loggedIn && (currentUserIsGymAdmin() && (gymAuthCan(gym, 'manage_space') || gymAuthCan(gym, 'manage_opening')))"
              :gym-space="gymSpace"
              :gym="gym"
            />
          </client-only>
        </div>
      </div>

      <!-- Space selector -->
      <gym-space-selector
        v-if="gym.gym_spaces.length > 1"
        class="mt-2 px-1"
        :gym-space="gymSpace"
        :gym="gymSpace.gym"
      />

      <v-alert
        v-if="gymSpace.draft"
        dense
        text
        color="amber"
        class="mx-3"
      >
        <div class="font-weight-bold">
          {{ $t('models.gymSpace.draft') }}
        </div>
        <div>
          {{ $t('components.gymSpace.draftExplain') }}
        </div>
      </v-alert>

      <!-- Space description -->
      <div class="gym-space-description mt-2 px-3">
        <markdown-text
          v-if="gymSpace.description"
          :text="gymSpace.description"
        />
      </div>

      <div
        v-if="gym.upcoming_contests.length > 0"
        class="mt-4 px-3"
      >
        <contest-up-coming
          :gym="gym"
          class="mt-2 mb-3"
        />
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
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import GymSpaceSelector from '@/components/gymSpaces/GymSpaceSelector'
import GymSpaceRouteList from '@/components/gymRoutes/GymSpaceRouteList'
import ContestUpComing from '~/components/gyms/ContestUpComing'
const GymSpaceActionMenu = () => import('@/components/gymSpaces/GymSpaceActionMenu')
const GymSectorEditingPlan = () => import('@/components/gymSectors/GymSectorEditingPlan')
const GymSpaceEditingSectorsColor = () => import('~/components/gymSpaces/GymSpaceEditingSectorsColor')
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymSpaceInfoAndRoutes',
  components: {
    ContestUpComing,
    GymSpaceEditingSectorsColor,
    MarkdownText,
    GymSectorEditingPlan,
    GymSpaceRouteList,
    GymSpaceActionMenu,
    GymSpaceSelector
  },
  mixins: [GymRolesHelpers, ImageVariantHelpers],

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
  padding-top: 5px;
  div {
    margin-left: auto;
    margin-right: auto;
    width: 30px;
    height: 5px;
    border-radius: 3px;
    background-color: rgb(155, 155, 155, 0.3);
  }
}
.space-actions-btn {
  max-width: 40px;
  padding-left: 0;
  padding-right: 5px;
  text-align: center;
  padding-top: 20px;
}
</style>
