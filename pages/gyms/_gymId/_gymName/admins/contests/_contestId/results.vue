<template>
  <v-sheet class="mt-2 pa-4 rounded">
    <contest-result-table :contest="contest" />
  </v-sheet>
</template>
<script>
import ContestResultTable from '~/components/contests/ContestResultTable.vue'

export default {
  components: { ContestResultTable },
  props: {
    contest: {
      type: Object,
      required: true
    }
  }
}
</script>
