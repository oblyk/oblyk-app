<template>
  <v-card
    :to="gym.gym_grades_count > 0 ? gym.path('grades-list') : gym.url('first-difficulty-system')"
    class="full-height"
  >
    <v-card-title>
      <v-icon left>
        mdi-sort-bool-ascending
      </v-icon>
      {{ $t('components.gymAdmin.difficultySystem') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        {{ gym.gym_grades_count }}
      </strong>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'DifficultySystemCard',
  props: {
    gym: Object
  }
}
</script>
