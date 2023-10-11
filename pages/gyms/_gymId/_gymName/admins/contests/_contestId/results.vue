<template>
  <v-sheet class="mt-2 pa-4 rounded">
    <contest-result-table :contest="contest" />
    <div class="text-right">
      <v-btn
        outlined
        color="primary"
        :to="`/contests/${contest.gym_id}/${contest.id}/print-results`"
        target="_blank"
      >
        <v-icon left>
          {{ mdiPrinterOutline }}
        </v-icon>
        Imprimer
      </v-btn>
    </div>
  </v-sheet>
</template>
<script>
import { mdiPrinterOutline } from '@mdi/js'
import ContestResultTable from '~/components/contests/ContestResultTable.vue'

export default {
  components: { ContestResultTable },
  props: {
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiPrinterOutline
    }
  }
}
</script>
