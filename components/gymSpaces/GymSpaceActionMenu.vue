<template>
  <v-menu offset-y left>
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
      <!-- Edit gym space -->
      <v-list-item
        v-if="gymAuthCan(gym, 'manage_space')"
        link
        :to="`${gymSpace.path}/edit`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiPencil }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.edit') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Change space plan -->
      <v-list-item
        v-if="gymAuthCan(gym, 'manage_space') && gymSpace.representation_type === '2d_picture'"
        link
        :to="`${gymSpace.path}/upload-plan`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiMap }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.changePlan') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Change space 3D -->
      <v-list-item
        v-if="gymAuthCan(gym, 'manage_space')"
        link
        :to="`${gym.adminPath}/spaces/${gymSpace.id}/edit-three-d`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiCube }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.edit3d') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item
        v-if="gymAuthCan(gym, 'manage_space')"
        link
        @click="$root.$emit('showEditingSectorColor', true)"
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-icon
              left
              class="mr-7"
              :color="gymSpace.sectors_color || 'rgb(98, 0, 234)'"
            >
              {{ mdiFormatColorFill }}
            </v-icon>
            {{ $t('models.gymSpace.sectors_color') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <!-- New line -->
      <v-list-item
        v-if="gymAuthCan(gym, 'manage_opening')"
        link
        :to="`${gymSpace.path}/select-sector`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiSourceBranchPlus }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.addLine') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Create a new secteur -->
      <v-list-item
        v-if="gymAuthCan(gym, 'manage_space')"
        link
        :to="`${gymSpace.path}/sectors/new`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiShapeSquarePlus }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.addSector') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Create a new space -->
      <v-list-item
        v-if="gymAuthCan(gym, 'manage_space')"
        link
        :to="`${gymSpace.gymPath}/spaces/new`"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiMapPlus }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('actions.createNewSpace') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list-item
        link
        :to="gym.adminPath"
      >
        <v-list-item-icon>
          <v-icon>{{ mdiViewDashboard }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            Dashboard
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import {
  mdiDotsVertical,
  mdiPencil,
  mdiMap,
  mdiSourceBranchPlus,
  mdiShapeSquarePlus,
  mdiMapPlus,
  mdiFormatColorFill,
  mdiViewDashboard,
  mdiCube
} from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  name: 'GymSpaceActionMenu',
  mixins: [GymRolesHelpers],
  props: {
    gymSpace: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiDotsVertical,
      mdiPencil,
      mdiMap,
      mdiSourceBranchPlus,
      mdiShapeSquarePlus,
      mdiMapPlus,
      mdiFormatColorFill,
      mdiViewDashboard,
      mdiCube
    }
  }
}
</script>
