<template>
  <contest-result-table
    v-if="contest"
    :contest="contest"
    printer
  />
</template>
<script>
import ContestResultTable from '~/components/contests/ContestResultTable.vue'
import { ContestConcern } from '~/concerns/ContestConcern'

export default {
  components: { ContestResultTable },
  mixins: [ContestConcern],
  layout: 'blank',

  data () {
    return {
      contest: null
    }
  }
}
</script>
<style>
.theme--light .v-main__wrap {
  background-color: white;
}
</style>
