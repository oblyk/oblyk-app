<template>
  <v-sheet class="rounded pa-4">
    <h4 class="mb-3">
      <v-icon left>
        {{ mdiFilter }}
      </v-icon>
      {{ $t('components.gymStatistic.filterTitle') }}
    </h4>
    <v-row>
      <v-col>
        <date-picker-input
          v-model="filters.date"
          :label="$t('components.gymStatistic.filterDate')"
          :hide-details="true"
        />
      </v-col>
      <v-col>
        <v-select
          v-model="filters.spaceIds"
          :items="gym.gym_spaces"
          item-text="name"
          item-value="id"
          multiple
          outlined
          hide-details
          :label="$t('components.gymStatistic.filterSpace')"
        />
      </v-col>
      <v-col>
        <v-select
          v-model="filters.openerIds"
          :items="openers"
          item-text="name"
          item-value="id"
          multiple
          outlined
          hide-details
          :loading="loadingOpeners"
          :label="$t('components.gymStatistic.filterOpener')"
        />
      </v-col>
      <v-col
        style="max-width: 150px"
        class="text-right"
      >
        <v-btn
          class="mt-1"
          outlined
          block
          text
          large
          color="primary"
          @click="submit"
        >
          {{ $t('actions.filter') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mdiFilter } from '@mdi/js'
import DatePickerInput from '~/components/forms/DatePickerInput.vue'
import GymOpenerApi from '~/services/oblyk-api/GymOpenerApi'

export default {
  name: 'GymStatisticFilters',
  components: { DatePickerInput },
  props: {
    gym: {
      type: Object,
      required: true
    },
    emitFilters: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      openers: [],
      loadingOpeners: true,
      filters: {
        date: this.$moment().format('YYYY-MM-DD'),
        spaceIds: [],
        openerIds: []
      },

      mdiFilter
    }
  },

  mounted () {
    this.getOpeners()
  },

  methods: {
    getOpeners () {
      this.loadingOpeners = true
      new GymOpenerApi(this.$axios, this.$auth)
        .all(this.gym.id)
        .then((resp) => {
          this.openers = resp.data
        })
        .finally(() => {
          this.loadingOpeners = false
        })
    },

    submit () {
      this.emitFilters(this.filters)
    }
  }
}
</script>
