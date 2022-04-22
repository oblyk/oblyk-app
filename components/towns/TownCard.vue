<template>
  <v-card
    :to="town.path"
    link
    flat
  >
    <v-card-title class="pb-2">
      {{ town.name }}
    </v-card-title>
    <v-card-text>
      {{ town.zipcode }}, {{ town.department.name }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TownCard',
  props: {
    town: {
      type: Object,
      required: true
    }
  }
}
</script>
