<template>
  <div class="text-right mt-1">
    <v-btn
      text
      color="primary"
      small
      :to="`/a${gymSector.path}/routes/new`"
    >
      <v-icon left>
        {{ mdiSourceBranchPlus }}
      </v-icon>
      {{ $t('actions.addLine') }}
    </v-btn>
  </div>
</template>

<script>
import { mdiSourceBranchPlus } from '@mdi/js'

export default {
  name: 'GymRouteAddInSortBySector',
  props: {
    gymSector: Object
  },

  data () {
    return {
      mdiSourceBranchPlus
    }
  }
}
</script>
