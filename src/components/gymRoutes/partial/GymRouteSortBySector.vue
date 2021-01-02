<template>
  <v-row class="mb-0">
    <v-col class="pb-0">
      <v-icon left small>
        mdi-texture-box
      </v-icon>
      {{ gymRoute.gym_sector_name }}
    </v-col>
    <v-col
      v-if="currentUserIsGymAdmin()"
      class="gym-sector-actions-menu-col text-right pb-0"
    >
      <v-btn
        icon
        @click="startEditSectorPolygon()"
        :title="$t('components.gymSector.editSectorPolygon')"
      >
        <v-icon small>
          mdi-vector-polygon
        </v-icon>
      </v-btn>
      <v-btn
        icon
        :to="gymRoute.gymSectorUrl('edit')"
        :title="$t('actions.edit')"
      >
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { SessionConcern } from '@/concerns/SessionConcern'

export default {
  name: 'GymRouteSortBySector',
  mixins: [SessionConcern],
  props: {
    gymRoute: Object
  },

  methods: {
    startEditSectorPolygon: function () {
      this.$root.$emit('startEditSectorPolygon', this.gymRoute.gym_sector_id)
      this.$root.$emit('showEditingExplain', true)
    }
  }
}
</script>
<style lang="scss" scoped>
.gym-sector-actions-menu-col {
  max-width: 100px;
}
</style>
