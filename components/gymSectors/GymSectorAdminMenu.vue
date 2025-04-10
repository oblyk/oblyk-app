<template>
  <div>
    <v-menu offset-y right>
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>
            {{ mdiDotsVertical }}
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <!-- Edit Sector -->
        <v-list-item
          v-if="gymAuthCan(gym, 'manage_space')"
          link
          :to="`${gymSector.path}/edit`"
        >
          <v-list-item-icon>
            <v-icon>{{ mdiPencil }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t('actions.editSector') }}
          </v-list-item-title>
        </v-list-item>

        <!-- Add new route in sector -->
        <v-list-item
          v-if="gymAuthCan(gym, 'manage_opening')"
          link
          :to="`${gymSector.path}/routes/new`"
        >
          <v-list-item-icon>
            <v-icon>{{ mdiSourceBranchPlus }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t('actions.addLine') }}
          </v-list-item-title>
        </v-list-item>

        <!-- Print label -->
        <v-list-item
          :disabled="gym.plan === 'free'"
          @click="printDialog()"
        >
          <v-list-item-icon>
            <v-icon>{{ mdiPrinter }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title :class="gym.plan === 'free' ? 'text--disabled' : ''">
            {{ $t('actions.print') }}
            <v-icon
              v-if="gym.plan !== 'full_package'"
              color="deep-purple accent-4"
              right
            >
              {{ mdiArrowUpBoldHexagonOutline }}
            </v-icon>
          </v-list-item-title>
        </v-list-item>

        <!-- Edit polyline -->
        <v-list-item
          v-if="showPlanOptions && gymAuthCan(gym, 'manage_space')"
          link
          @click="startEditSectorPolygon()"
        >
          <v-list-item-icon>
            <v-icon>{{ mdiVectorPolygon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title
            v-text="gymSector.hasPolygon ? $t('components.gymSector.editSectorPolygon') : $t('components.gymSector.createSectorPolygon')"
          />
        </v-list-item>

        <v-divider
          v-if="gymSector.hasPolygon && showPlanOptions && gymAuthCan(gym, 'manage_space')"
        />

        <!-- Dismount all routes in sector -->
        <v-list-item
          v-if="gymAuthCan(gym, 'manage_opening')"
          link
          @click="dismountRoutes()"
        >
          <v-list-item-icon>
            <v-icon>{{ mdiCollapseAllOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="red--text">
            {{ $t('actions.dismountAllRoutes') }}
          </v-list-item-title>
        </v-list-item>

        <!-- Remove sector polygone -->
        <v-list-item
          v-if="gymSector.hasPolygon && showPlanOptions && gymAuthCan(gym, 'manage_space')"
          link
          @click="removeSectorPolygon()"
        >
          <v-list-item-icon>
            <v-icon>
              {{ mdiVectorSquareRemove }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title class="red--text">
            {{ $t('components.gymSector.removeSectorPolygon') }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <print-label-dialog
      ref="printLabelDialog"
      :gym="gym"
    />
  </div>
</template>

<script>
import {
  mdiTextureBox,
  mdiDotsVertical,
  mdiPencil,
  mdiCollapseAllOutline,
  mdiVectorPolygon,
  mdiVectorSquareRemove,
  mdiSourceBranchPlus,
  mdiPrinter,
  mdiArrowUpBoldHexagonOutline
} from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'
import PrintLabelDialog from '~/components/gymLabelTemplates/PrintLabelDialog'

export default {
  name: 'GymSectorAdminMenu',
  components: { PrintLabelDialog },
  mixins: [GymRolesHelpers],
  props: {
    gymSector: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      required: true
    },
    gymRoutes: {
      type: Array,
      default: null
    },
    showPlanOptions: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      mdiTextureBox,
      mdiDotsVertical,
      mdiPencil,
      mdiCollapseAllOutline,
      mdiVectorPolygon,
      mdiVectorSquareRemove,
      mdiSourceBranchPlus,
      mdiPrinter,
      mdiArrowUpBoldHexagonOutline
    }
  },

  methods: {
    startEditSectorPolygon () {
      this.$root.$emit('startEditSectorPolygon', this.gymSector.id)
      this.$root.$emit('showEditingExplain', true)
    },

    dismountRoutes () {
      if (confirm(this.$t('common.areYouSurDismountedRoute'))) {
        this.$root.$emit(
          'dismountGymRoutesInSector',
          this.gym.id,
          this.gymSector.gym_space.id,
          this.gymSector.id
        )
      }
    },

    removeSectorPolygon () {
      if (confirm(this.$t('components.gymSector.removeSectorPolygonConfirm'))) {
        new GymSectorApi(this.$axios, this.$auth)
          .update({
            gym_id: this.gym.id,
            gym_space_id: this.gymSector.gym_space.id,
            id: this.gymSector.id,
            polygon: null
          })
          .then(() => {
            window.location.reload()
          })
      }
    },

    printDialog () {
      this.$refs.printLabelDialog.openDialog({
        reference: this.gymSector.name,
        sector: {
          id: this.gymSector.id,
          name: this.gymSector.name
        }
      })
    }
  }
}
</script>
