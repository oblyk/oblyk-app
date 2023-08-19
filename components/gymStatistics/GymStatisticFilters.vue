<template>
  <v-sheet class="rounded pa-4">
    <h4 class="mb-3">
      <v-icon left>
        {{ mdiFilter }}
      </v-icon>
      {{ $t('components.gymStatistic.filterTitle') }}
    </h4>
    <v-row>
      <v-col cols="12" md="4" lg="3">
        <date-picker-input
          v-model="filters.date"
          :label="$t('components.gymStatistic.filterDate')"
          :hide-details="true"
        />
      </v-col>
      <v-col cols="12" md="4" lg="3">
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
      <v-col cols="12" md="4" lg="4">
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
        cols="12"
        md="12"
        lg="2"
        class="text-right"
      >
        <v-btn
          class="mt-1"
          outlined
          :block="$vuetify.breakpoint.lg"
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
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'GymStatisticFilters',
  components: { DatePickerInput },
  mixins: [DateHelpers],
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
        date: this.ISODateToday(),
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
