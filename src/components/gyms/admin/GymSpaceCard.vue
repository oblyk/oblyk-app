<template>
  <v-card
    :to="gym.gym_spaces.length > 0 ? gym.firstSpaceUrl() : gym.url('first-space')"
    class="full-height"
  >
    <v-card-title>
      <v-icon left>
        mdi-map
      </v-icon>
      {{ $t('components.gymAdmin.spaces') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        {{ gym.gym_spaces.length }}
      </strong>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'GymSpaceCard',
  props: {
    gym: Object
  }
}
</script>
