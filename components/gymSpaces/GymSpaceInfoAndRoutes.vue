<template>
  <div :class="$vuetify.breakpoint.mobile ? '' : 'pa-3'">
    <div v-if="!editingSectorPolygon">
      <!-- Gym space selector -->
      <v-sheet
        class="blur-card pa-4"
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
        <h3
          v-if="gym"
          class="mb-3"
        >
          <v-avatar
            v-if="gym.logo"
            size="30"
            class="mr-2 vertical-align-top"
          >
            <v-img :src="gym.logoUrl" alt="gym logo" />
          </v-avatar>
          {{ gym.name }}
        </h3>

        <!-- Space selector -->
        <div class="row">
          <div class="col">
            <gym-space-selector
              :gym-space="gymSpace"
            />
          </div>
          <div
            v-if="currentUserIsGymAdmin()"
            class="col space-actions-btn"
          >
            <gym-space-action-menu :gym-space="gymSpace" />
          </div>
        </div>

        <!-- Space description -->
        <div class="gym-space-description">
          <markdown-text
            v-if="gymSpace.description"
            :text="gymSpace.description"
          />
        </div>
      </v-sheet>

      <!-- Route list -->
      <v-sheet
        class="pa-4 mt-4 blur-card"
        :class="$vuetify.breakpoint.mobile ? 'elevation-3' : ''"
        rounded
      >
        <gym-space-route-list :gym-space="gymSpace" />
      </v-sheet>
    </div>

    <!-- If in editing sector polygon -->
    <v-sheet
      v-if="editingSectorPolygon"
      class="blur-card h-100"
      rounded
    >
      <gym-sector-editing-plan />
    </v-sheet>
  </div>
</template>

<script>
import GymSpaceSelector from '@/components/gymSpaces/GymSpaceSelector'
import GymSpaceActionMenu from '@/components/gymSpaces/GymSpaceActionMenu'
import GymSpaceRouteList from '@/components/gymRoutes/GymSpaceRouteList'
import GymSectorEditingPlan from '@/components/gymSectors/GymSectorEditingPlan'
import { SessionConcern } from '@/concerns/SessionConcern'
const MarkdownText = () => import('@/components/ui/MarkdownText')

export default {
  name: 'GymSpaceInfoAndRoutes',
  components: {
    MarkdownText,
    GymSectorEditingPlan,
    GymSpaceRouteList,
    GymSpaceActionMenu,
    GymSpaceSelector
  },
  mixins: [SessionConcern],

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
      editingSectorPolygon: false
    }
  },

  mounted () {
    this.$root.$on('showEditingExplain', (visible) => {
      this.showEditingExplain(visible)
    })
  },

  beforeDestroy () {
    this.$root.$off('showEditingExplain')
  },

  methods: {
    showEditingExplain (visible) {
      this.editingSectorPolygon = visible
    }
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
    background-color: rgba(0, 0, 0, 0.8);
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
.gym-space-description {
  margin-top: -1.2em;
}
.space-actions-btn {
  max-width: 40px;
  padding-left: 0;
  padding-right: 5px;
  text-align: center;
  padding-top: 20px;
}
</style>
