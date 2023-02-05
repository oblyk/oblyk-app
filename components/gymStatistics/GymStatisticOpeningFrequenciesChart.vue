<template>
  <v-sheet class="rounded pa-4 full-height">
    <h4 class="mb-4">
      <v-icon left>
        {{ mdiRecycle }}
      </v-icon>
      {{ $t('components.gymStatistic.openingFrequenciesTitle') }}
    </h4>
    <p
      v-if="loading"
      class="text-center"
    >
      {{ $t('common.loading') }}
    </p>
    <div v-else>
      <indoor-opening-frequencies-chart
        :data="routes"
      />
    </div>
  </v-sheet>
</template>

<script>
import { mdiRecycle } from '@mdi/js'
import GymRouteStatisticApi from '~/services/oblyk-api/GymRouteStatisticApi'
import IndoorOpeningFrequenciesChart from '~/components/logBooks/indoors/IndoorOpeningFrequenciesChart.vue'

export default {
  name: 'GymStatisticOpeningFrequenciesChart',
  components: { IndoorOpeningFrequenciesChart },
  props: {
    gym: {
      type: Object,
      required: true
    },
    filters: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loading: true,
      routes: {},

      mdiRecycle
    }
  },

  watch: {
    filters: {
      handler () {
        this.getGrades()
      },
      deep: true
    }
  },

  mounted () {
    this.getGrades()
  },

  methods: {
    getGrades () {
      this.loading = true
      new GymRouteStatisticApi(this.$axios, this.$auth)
        .openingFrequencies(this.gym.id, this.filters)
        .then((resp) => {
          this.routes = resp.data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
