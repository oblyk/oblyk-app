<template>
  <v-card class="full-height d-flex flex-column justify-space-between">
    <v-card-title>
      <v-icon left>
        {{ mdiMap }}
      </v-icon>
      {{ $t('components.gymAdmin.spaces') }}
      <v-spacer v-if="gymAuthCan(gym, 'manage_space')" />
      <v-btn
        v-if="gymAuthCan(gym, 'manage_space')"
        :to="`${gym.adminPath}/tree-structures`"
        icon
      >
        <v-icon>
          {{ mdiCogOutline }}
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        {{ gym.gym_spaces.length }}
      </strong>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        v-if="gymAuthCan(gym, 'manage_space')"
        :to="newSpacePath"
        text
        outlined
      >
        <v-icon left>
          {{ mdiPlus }}
        </v-icon>
        {{ $t('actions.add') }}
      </v-btn>
      <v-btn
        v-if="gym.gym_spaces.length > 0"
        :to="gym.spacePath"
        elevation="0"
        color="primary"
      >
        <v-icon left>
          {{ mdiMap }}
        </v-icon>
        {{ $t('components.gymSpace.list') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiMap, mdiPlus, mdiCogOutline } from '@mdi/js'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'

export default {
  name: 'GymAdminSpaceFigures',
  mixins: [GymRolesHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiMap,
      mdiPlus,
      mdiCogOutline
    }
  },

  computed: {
    newSpacePath () {
      return this.gym.gym_spaces.length === 0 ? `${this.gym.adminPath}/first-space` : `${this.gym.spacePath}/new`
    }
  }
}
</script>
