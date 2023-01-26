<template>
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

      <!-- Edit polyline -->
      <v-list-item
        v-if="showPlanOptions"
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

      <v-divider />

      <!-- Add new route in sector -->
      <v-list-item
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

      <!-- Dismount all routes in sector -->
      <v-list-item
        link
        @click="dismountRoutes()"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiCollapseAllOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('actions.dismountAllRoutes') }}
        </v-list-item-title>
      </v-list-item>

      <!-- Remove sector polygone -->
      <v-divider
        v-if="gymSector.hasPolygon && showPlanOptions"
      />
      <v-list-item
        v-if="gymSector.hasPolygon && showPlanOptions"
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
</template>

<script>
import {
  mdiTextureBox,
  mdiDotsVertical,
  mdiPencil,
  mdiCollapseAllOutline,
  mdiVectorPolygon,
  mdiVectorSquareRemove,
  mdiSourceBranchPlus
} from '@mdi/js'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'

export default {
  name: 'GymSectorAdminMenu',
  props: {
    gymSector: {
      type: Object,
      required: true
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
      mdiSourceBranchPlus
    }
  },

  methods: {
    startEditSectorPolygon () {
      this.$root.$emit('startEditSectorPolygon', this.gymSector.id)
      this.$root.$emit('showEditingExplain', true)
    },

    dismountRoutes () {
      this.$root.$emit(
        'dismountGymRoutesInSector',
        this.gymSector.gym.id,
        this.gymSector.gym_space.id,
        this.gymSector.id
      )
    },

    removeSectorPolygon () {
      if (confirm(this.$t('components.gymSector.removeSectorPolygonConfirm'))) {
        new GymSectorApi(this.$axios, this.$auth)
          .update({
            gym_id: this.gymSector.gym.id,
            gym_space_id: this.gymSector.gym_space.id,
            id: this.gymSector.id,
            polygon: null
          })
          .then(() => {
            window.location.reload()
          })
      }
    }
  }
}
</script>
