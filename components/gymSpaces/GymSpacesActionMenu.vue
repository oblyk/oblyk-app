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
      <!-- Edit spaces on 3D -->
      <v-list-item
        v-if="gymAuthCan(gym, 'manage_space')"
        link
        :to="`${gym.adminPath}/spaces/edit-three-d`"
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
    </v-list>
  </v-menu>
</template>

<script>
import {
  mdiDotsVertical,
  mdiCube
} from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  name: 'GymSpacesActionMenu',
  mixins: [GymRolesHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiDotsVertical,
      mdiCube
    }
  }
}
</script>
