<template>
  <div>
    <contest-result-table
      v-if="contest.beginning_is_in_past && !contest.hide_results"
      class="mt-4"
      :contest="contest"
      :by-team="byTeam"
      :unisex="unisex"
    />
    <div v-else>
      <p
        v-if="contest.hide_results"
        class="mt-7 text-center"
      >
        Les résultats ne peuvent pas être consulté ici
      </p>
      <p
        v-else
        class="mt-7 text-center"
      >
        Les résultats seront disponibles quand le contest aura commencé.
      </p>
    </div>
  </div>
</template>

<script>
import ContestResultTable from '~/components/contests/ContestResultTable'

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
      byTeam: this.contest.team_contest,
      unisex: false
    }
  }
}
</script>
