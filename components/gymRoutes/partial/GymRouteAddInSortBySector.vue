<template>
  <div class="text-right mt-1">
    <v-btn
      text
      color="primary"
      small
      :to="`/a${gymSector.path}/routes/new`"
    >
      <v-icon left>
        mdi-source-branch-plus
      </v-icon>
      {{ $t('actions.addLine') }}
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'GymRouteAddInSortBySector',
  props: {
    gymSector: Object
  }
}
</script>
