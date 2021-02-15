<template>
  <span>
    <v-icon
      small
    >
      {{ cragRoute.difficultyAppreciationIcon() }}
    </v-icon>
  </span>
</template>

<script>

export default {
  name: 'CragRouteDifficultyIcon',
  props: {
    cragRoute: Object
  }
}
</script>
