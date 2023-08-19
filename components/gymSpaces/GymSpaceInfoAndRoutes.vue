<template>
  <div :class="$vuetify.breakpoint.mobile ? '' : 'pa-3'">
    <div v-if="!editingSectorPolygon && !editingSectorColor">
      <!-- Gym space selector -->
      <v-sheet
        class="blur-card px-4 pt-1 pb-4"
        :class="$vuetify.breakpoint.mobile ? 'elevation-3' : ''"
        rounded
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
          class="pt-0 pb-0"
          color="rgba(0,0,0,0)"
        >
          <v-list-item class="pl-0">
            <v-list-item-avatar v-if="gym.logo">
              <v-avatar
                size="40"
                class="mr-2 vertical-align-top"
              >
                <v-img :src="gym.logoUrl" alt="gym logo" />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title class="font-weight-bold">
              {{ gym.name }}<span class="font-weight-regular">, {{ gymSpace.name }}</span>
            </v-list-item-title>
            <v-list-item-action
              v-if="currentUserIsGymAdmin() && (gymAuthCan(gym, 'manage_space') || gymAuthCan(gym, 'manage_opening'))"
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
          :gym-space="gymSpace"
          :gym="gymSpace.gym"
        />

        <!-- Space description -->
        <div class="gym-space-description mt-2">
          <markdown-text
            v-if="gymSpace.description"
            :text="gymSpace.description"
          />
        </div>
      </v-sheet>

      <gym-go-to-ranking
        :gym="gym"
        additional-class="blur-card"
        class="mt-4"
      />

      <!-- Route list -->
      <v-sheet
        class="pa-4 mt-4 blur-card"
        :class="$vuetify.breakpoint.mobile ? 'elevation-3' : ''"
        rounded
      >
        <gym-space-route-list
          :gym-space="gymSpace"
          :gym="gym"
        />
      </v-sheet>
    </div>

    <!-- If in editing sector polygon -->
    <v-sheet
      v-if="editingSectorPolygon"
      class="blur-card h-100"
      rounded
    >
      <gym-sector-editing-plan
        v-if="editingSectorPolygon"
      />
    </v-sheet>

    <!-- If in editing sector colors -->
    <v-sheet
      v-if="editingSectorColor"
      class="blur-card h-100"
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
import GymSpaceActionMenu from '@/components/gymSpaces/GymSpaceActionMenu'
import GymSpaceRouteList from '@/components/gymRoutes/GymSpaceRouteList'
import GymGoToRanking from '~/components/gyms/GymGoToRanking'
const GymSectorEditingPlan = () => import('@/components/gymSectors/GymSectorEditingPlan')
const GymSpaceEditingSectorsColor = () => import('~/components/gymSpaces/GymSpaceEditingSectorsColor')
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymSpaceInfoAndRoutes',
  components: {
    GymSpaceEditingSectorsColor,
    GymGoToRanking,
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
.blur-card {
  backdrop-filter: blur(10px);
}
.scroll-encourage {
  margin-bottom: 10px;
  div {
    margin-left: auto;
    margin-right: auto;
    width: 30px;
    height: 5px;
    border-radius: 3px;
  }
}
.theme--dark {
  .blur-card {
    background-color: rgba(17, 17, 17, 0.9);
  }
  .scroll-encourage {
    div {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
.theme--light {
  .blur-card {
    background-color: rgba(255, 255, 255, 0.8);
  }
  .scroll-encourage {
    div {
      background-color: rgba(0, 0, 0, 0.2);
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
