<template>
  <div>
    <contest-result-table
      v-if="contest.beginning_is_in_past"
      class="mt-4"
      :contest="contest"
    />
    <p
      v-else
      class="mt-7 text-center"
    >
      Les résultats seront disponibles quand le contest aura commencé.
    </p>
  </div>
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
