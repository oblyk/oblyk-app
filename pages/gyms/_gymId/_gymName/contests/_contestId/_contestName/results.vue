<template>
  <v-sheet class="pa-4 rounded mt-4">
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
