<template>
  <v-card
    :to="gym.gym_spaces.length > 0 ? gym.firstSpacePath : `${gym.path}/first-space`"
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
        :to="`/a${gym.path}/spaces/new`"
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
    gym: Object
  },

  data () {
    return {
      mdiMap
    }
  }
}
</script>
