<template>
  <contest-result-table
    class="mt-4"
    :contest="contest"
  />
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
