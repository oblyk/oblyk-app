<template>
  <div class="text-right mt-1">
    <v-btn
      text
      color="primary"
      small
      :to="gymRoute.gymSectorUrl('routes/new')"
    >
      <v-icon left>
        mdi-plus
      </v-icon>
      Ajouter une ligne
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'GymRouteAddInSortBySector',
  props: {
    gymRoute: Object
  }
}
</script>
