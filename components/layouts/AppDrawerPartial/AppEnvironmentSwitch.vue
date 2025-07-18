<template>
  <v-list-item class="oblyk-app-drawer-actions">
    <div
      class="d-flex justify-space-between pa-1 oblyk-app-drawer-actions-area"
      :class="`app-drawer-environment-${oblykEnvironnement}`"
    >
      <v-chip
        to="/outdoor"
        small
        outlined
        class="app-drawer-environment-outdoor-chip"
      >
        <v-icon
          small
          left
        >
          {{ mdiTerrain }}
        </v-icon>
        Outdoor
      </v-chip>
      <v-chip
        to="/indoor"
        small
        outlined
        class="app-drawer-environment-indoor-chip"
      >
        <v-icon
          small
          left
        >
          {{ oblykIndoor }}
        </v-icon>
        Indoor
      </v-chip>
      <v-chip
        to="/community"
        small
        outlined
        class="app-drawer-environment-community-chip"
      >
        <v-icon
          small
          left
        >
          {{ oblykPartner }}
        </v-icon>
        Commu'
      </v-chip>
    </div>
  </v-list-item>
</template>

<script>
import { mdiTerrain } from '@mdi/js'
import { oblykIndoor, oblykPartner } from '~/assets/oblyk-icons'

export default {
  name: 'AppEnvironmentSwitch',

  data () {
    return {
      oblykIndoor,
      oblykPartner,
      mdiTerrain
    }
  },

  computed: {
    oblykEnvironnement () {
      return this.$store.getters['oblykEnvironment/getOblykEnvironnement']
    }
  }
}
</script>

<style lang="scss">
.oblyk-app-drawer-actions-area {
  &.app-drawer-environment-outdoor {
    .app-drawer-environment-outdoor-chip {
      border-color: #31994e;
      path {
        fill: #31994e;
      }
    }
  }
  &.app-drawer-environment-indoor {
    .app-drawer-environment-indoor-chip {
      border-color: #743ad5;
      path {
        fill: #743ad5;
      }
    }
  }
  &.app-drawer-environment-community {
    .app-drawer-environment-community-chip {
      border-color: #007b8b;
      path {
        fill: #007b8b;
      }
    }
  }
}
</style>
