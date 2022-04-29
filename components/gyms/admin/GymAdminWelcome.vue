<template>
  <v-card class="full-height">
    <v-card-title>
      <v-avatar
        class="mr-3"
      >
        <v-img
          :src="gym.logoUrl"
          :alt="`logo ${gym.name}`"
        />
      </v-avatar>
      {{ gym.name }}
    </v-card-title>
    <v-card-text>
      {{ $t('components.gymAdmin.welcome', { name: gym.name }) }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        :to="gym.path"
        text
        color="primary"
      >
        <v-icon left>
          {{ mdiEarth }}
        </v-icon>
        {{ $t('components.gymAdmin.publicPage') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiEarth } from '@mdi/js'

export default {
  name: 'GymAdminWelcome',
  props: {
    gym: Object
  },

  data () {
    return {
      mdiEarth
    }
  }
}
</script>
