<template>
  <div>
    <div
      v-if="!editingSectorPolygon"
      class="gym-space-routes-and-sectors"
    >
      <!-- Gym space selector -->
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

      <!-- Route list -->
      <gym-space-route-list :gym-space="gymSpace" />
    </div>

    <!-- If in editing sector polygon -->
    <div v-if="editingSectorPolygon">
      <gym-sector-editing-plan />
    </div>
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
  name: 'GymSpaceRoute',
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
