<template>
  <div>
    <v-sheet class="rounded pa-4 mt-2">
      <div class="d-flex align-center">
        <p class="font-weight-bold mb-0">
          <v-icon left class="vertical-align-top">
            {{ mdiFilter }}
          </v-icon>
          Filtrer mon analyse
        </p>
        <v-btn
          icon
          class="ml-auto"
          @click="showFilter = !showFilter"
        >
          <v-icon>
            {{ showFilter ? mdiChevronDown : mdiChevronUp }}
          </v-icon>
        </v-btn>
      </div>
      <div
        v-if="showFilter"
        class="mt-4"
      >
        <v-row>
          <v-col cols="12" md="6">
            <genre-input
              v-model="filters.genre"
              clearable
              :with-undefined="false"
              hide-detail
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="filters.category_id"
              outlined
              :items="contest.contest_categories"
              item-value="id"
              item-text="name"
              label="Catégorie"
              hide-details
              clearable
            />
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col cols="12" md="6">
            <v-checkbox
              v-model="filters.exclude_without_ascents"
              label="Exclure les participants sans ascensions"
              class="mt-1"
              hide-details
            />
          </v-col>
          <v-col cols="12" md="6" class="text-right">
            <v-btn
              elevation="0"
              large
              color="primary"
              :loading="loadingStatistique"
              @click="getStatistics()"
            >
              Filtrer
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-sheet>
    <div v-if="statistics">
      <contest-participants-statistics :statistics="statistics" />
      <contest-ascents-statistics
        :contest="contest"
        :statistics="statistics"
      />
    </div>
    <div
      v-else
      class="text-center mt-12"
    >
      <v-progress-circular indeterminate width="3" size="15" color="purple darken-3" class="mr-2 vertical-align-super" />
      Chargement des statistiques ...
    </div>
  </div>
</template>

<script>
import { mdiFilter, mdiChevronDown, mdiChevronUp } from '@mdi/js'
import GenreInput from '~/components/forms/GenreInput'
import ContestApi from '~/services/oblyk-api/ContestApi'
import ContestParticipantsStatistics from '~/components/contests/statistics/ContestParticipantsStatistics'
import ContestAscentsStatistics from '~/components/contests/statistics/ContestAscentsStatistics'

export default {
  components: { ContestAscentsStatistics, ContestParticipantsStatistics, GenreInput },
  middleware: ['auth', 'gymAdmin'],

  props: {
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showFilter: true,
      loadingStatistique: true,
      statistics: null,
      filters: {
        genre: null,
        category_id: null,
        exclude_without_ascents: false
      },

      mdiFilter,
      mdiChevronDown,
      mdiChevronUp
    }
  },

  mounted () {
    this.getStatistics()
  },

  methods: {
    getStatistics () {
      this.loadingStatistique = true
      new ContestApi(this.$axios, this.$auth)
        .statistics(this.contest.gym_id, this.contest.id, this.filters)
        .then((resp) => {
          this.statistics = resp.data
        })
        .finally(() => {
          this.loadingStatistique = false
        })
    }
  }
}
</script>
