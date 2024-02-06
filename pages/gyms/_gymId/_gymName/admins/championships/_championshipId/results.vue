<template>
  <div class="mt-2">
    <championship-result-table :championship="championship" />
  </div>
</template>

<script>
import ChampionshipResultTable from '~/components/championships/ChampionshipResultTable'

export default {
  components: { ChampionshipResultTable },
  meta: { orphanRoute: true },
  middleware: ['auth', 'gymAdmin'],
  props: {
    championship: {
      type: Object,
      required: true
    }
  }
}
</script>
