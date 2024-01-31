<template>
  <div @mouseenter="$root.$emit('activeSector', gymSector.id)">
    <div class="rounded-pill py-1 px-4 back-app-color mb-1 d-flex align-center">
      <v-icon left>
        {{ mdiTextureBox }}
      </v-icon>
      <div class="font-weight-bold mr-auto">
        {{ gymSector.name }}
      </div>
      <v-btn
        v-if="sector && sector.hasPolygon && showPlanOptions"
        icon
        :title="$t('components.gymSector.viewOnMap')"
        @click="setMapViewOnSector(gymSector.id)"
      >
        <v-icon>
          {{ mdiImageFilterCenterFocusStrong }}
        </v-icon>
      </v-btn>
      <gym-sector-admin-menu
        v-if="$auth.loggedIn && sector && currentUserIsGymAdmin() && (gymAuthCan(gym, 'manage_space') || gymAuthCan(gym, 'manage_opening'))"
        :gym-sector="sector"
        :gym="gym"
        :show-plan-options="showPlanOptions"
      />
    </div>
    <div
      v-if="$auth.loggedIn && currentUserIsGymAdmin() && gymAuthCan(gym, 'manage_opening')"
      class="text-right"
    >
      <v-btn
        text
        small
        :to="`${(sector || {}).path}/routes/new`"
        :disabled="!sector"
      >
        <v-icon left>
          {{ mdiSourceBranchPlus }}
        </v-icon>
        {{ $t('actions.addLine') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mdiTextureBox, mdiImageFilterCenterFocusStrong, mdiSourceBranchPlus } from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import GymSectorAdminMenu from '~/components/gymSectors/GymSectorAdminMenu'
import GymSector from '~/models/GymSector'
import GymSectorApi from '~/services/oblyk-api/GymSectorApi'

export default {
  name: 'GymSectorSeparator',
  components: { GymSectorAdminMenu },
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
    gymSpace: {
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
      loadingGymSector: true,
      sector: null,

      mdiTextureBox,
      mdiImageFilterCenterFocusStrong,
      mdiSourceBranchPlus
    }
  },

  mounted () {
    if (this.showPlanOptions || this.currentUserIsGymAdmin()) {
      this.getGymSector()
    }
  },

  methods: {
    getGymSector () {
      this.loadingGymSector = true
      new GymSectorApi(this.$axios, this.$auth)
        .find(this.gym.id, this.gymSpace.id, this.gymSector.id)
        .then((resp) => {
          this.sector = new GymSector({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingGymSector = false
        })
    },

    setMapViewOnSector (sectorId) {
      this.$root.$emit('setMapViewOnSector', sectorId)
      if (this.$vuetify.breakpoint.mobile) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>
