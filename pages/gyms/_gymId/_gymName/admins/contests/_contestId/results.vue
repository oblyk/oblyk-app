<template>
  <div class="mt-2">
    <div
      id="results-contest-header"
      class="text-right mt-3"
    >
      <v-btn
        outlined
        text
        :loading="loadingExport"
        @click="exportResult"
      >
        <v-icon left>
          {{ mdiExport }}
        </v-icon>
        {{ $t('actions.export') }}
      </v-btn>
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
    <v-alert
      v-if="showSelfReportingAlert"
      type="info"
      class="mt-3"
      text
    >
      Cliquez sur le participant que vous voulez juger pour renseigner ses pérformances.
    </v-alert>
    <contest-result-table
      :contest="contest"
      :show-subscribe-checkbox="showSubscribeCheckbox"
      :admin="true"
      class="mt-2"
    />
  </div>
</template>

<script>
import { mdiPrinterOutline, mdiCheckboxMultipleOutline, mdiExport } from '@mdi/js'
import ContestResultTable from '~/components/contests/ContestResultTable'
import ContestApi from '~/services/oblyk-api/ContestApi'

export default {
  components: { ContestResultTable },
  middleware: ['auth', 'gymAdmin'],

  props: {
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showSubscribeCheckbox: false,
      showSelfReportingAlert: false,
      loadingExport: false,

      mdiPrinterOutline,
      mdiCheckboxMultipleOutline,
      mdiExport
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    const subscribeMode = urlParams.get('subscribe_mode')
    const reportingAlert = urlParams.get('show_self_reporting_alert')
    if (subscribeMode === 'true') {
      this.showSubscribeCheckbox = true
      this.goToTop()
    }
    if (reportingAlert === 'true') {
      this.showSelfReportingAlert = true
      this.goToTop()
    }
  },

  methods: {
    goToTop () {
      document.querySelector('#contest-tabs').scrollIntoView(
        { behavior: 'smooth', block: 'start' }
      )
    },

    exportResult () {
      this.loadingExport = true
      new ContestApi(this.$axios, this.$auth)
        .exportResults(this.contest.gym_id, this.contest.id)
        .then((resp) => {
          const url = window.URL.createObjectURL(new Blob([resp.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `export-results-${this.contest.slug_name}.csv`)
          document.body.appendChild(link)
          link.click()
        })
        .finally(() => {
          this.loadingExport = false
        })
    }
  }
}
</script>
