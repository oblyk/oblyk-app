<template>
  <v-card
    :to="spacesPath"
    class="full-height"
  >
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
        :to="`${gym.spacePath}/new`"
        small
        text
        color="primary"
      >
        {{ $t('components.gymSpace.create') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiMap } from '@mdi/js'
export default {
  name: 'GymAdminSpaceFigures',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiMap
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
