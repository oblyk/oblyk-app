<template>
  <v-row class="mb-0">
    <v-col class="pb-0">
      <v-icon left small>
        mdi-texture-box
      </v-icon>
      {{ gymSector.name }}
    </v-col>
    <v-col
      v-if="currentUserIsGymAdmin()"
      class="gym-sector-actions-menu-col text-right pb-0"
    >
      <v-menu offset-y left>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- Edit Sector -->
          <v-list-item
            link
            :to="`/a${gymSector.path}/edit`"
          >
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ $t('actions.editSector') }}
            </v-list-item-title>
          </v-list-item>

          <!-- Dismount all routes in sector -->
          <v-list-item
            link
            @click="dismountRoutes()"
          >
            <v-list-item-icon>
              <v-icon>mdi-collapse-all-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ $t('actions.dismountAllRoutes') }}
            </v-list-item-title>
          </v-list-item>

          <!-- Edit polyline -->
          <v-list-item
            link
            @click="startEditSectorPolygon()"
          >
            <v-list-item-icon>
              <v-icon>mdi-vector-polygon</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ $t('components.gymSector.editSectorPolygon') }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-row>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'GymRouteSortBySector',
  mixins: [SessionConcern],
  props: {
    gymSector: Object
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
    }
  }
}
</script>
<style lang="scss" scoped>
.gym-sector-actions-menu-col {
  max-width: 100px;
}
</style>
