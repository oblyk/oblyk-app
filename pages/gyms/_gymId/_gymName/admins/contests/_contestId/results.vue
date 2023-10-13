<template>
  <v-sheet class="mt-2 pa-4 rounded">
    <div
      id="results-contest-header"
      class="text-right"
    >
      <v-btn
        outlined
        text
        :to="`/contests/${contest.gym_id}/${contest.id}/print-results`"
        target="_blank"
      >
        <v-icon left>
          {{ mdiPrinterOutline }}
        </v-icon>
        Imprimer
      </v-btn>
      <v-btn
        text
        outlined
        @click="showSubscribeCheckbox = !showSubscribeCheckbox"
      >
        <v-icon left>
          {{ mdiCheckboxMultipleOutline }}
        </v-icon>
        Gérer les passages d'étape
      </v-btn>
    </div>
    <v-alert
      v-if="showSubscribeCheckbox"
      type="info"
      class="mt-3"
      text
    >
      Cochez les participants que vous voulez inscrire à la prochaine étape du contest <cite>(exemple : des qualifications aux finales)</cite>
    </v-alert>
    <contest-result-table
      :contest="contest"
      :show-subscribe-checkbox="showSubscribeCheckbox"
    />
  </v-sheet>
</template>
<script>
import { mdiPrinterOutline, mdiCheckboxMultipleOutline } from '@mdi/js'
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
      showSubscribeCheckbox: false,

      mdiPrinterOutline,
      mdiCheckboxMultipleOutline
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    const subscribeMode = urlParams.get('subscribe_mode')
    if (subscribeMode === 'true') {
      this.showSubscribeCheckbox = true
      document.querySelector('#contest-tabs').scrollIntoView(
        { behavior: 'smooth', block: 'start' }
      )
    }
  }
}
</script>
