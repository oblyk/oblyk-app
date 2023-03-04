<template>
  <v-card class="full-height">
    <v-card-title>
      <v-icon left>
        {{ mdiMap }}
      </v-icon>
      {{ $t('components.gymAdmin.spaces') }}
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
        :to="`${gym.spacePath}/new`"
        text
        color="primary"
      >
        <v-icon left>
          {{ mdiPlus }}
        </v-icon>
        {{ $t('components.gymSpace.create') }}
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
import { mdiMap, mdiPlus } from '@mdi/js'
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
      mdiPlus
    }
  },

  computed: {
    spacesPath () {
      if (this.gym.gym_spaces.length === 0) {
        return `${this.gym.adminPath}/first-space`
      } else if (this.gym.gym_spaces.length === 1) {
        return this.gym.firstSpacePath
      } else {
        return `${this.gym.path}/spaces`
      }
    }
  }
}
</script>
