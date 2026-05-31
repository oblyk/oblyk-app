<template>
  <v-container fluid>
    <div v-if="gym">
      <v-breadcrumbs :items="breadcrumbs" />
      <gym-admin-routes-tabs :gym="gym" />
      <indoor-subscription-lock-alert
        feature="statistics"
        :gym="gym"
        class="mt-4"
      />
      <div v-if="gym.plan !== 'free'">
        <!-- Statistic -->
        <v-card class="mt-3">
          <v-row class="pt-2 px-2 mt-3 mb-3">
            <v-col>
              <date-picker-menu-input
                v-model="openedAt"
                :label="$t('components.gymStatistic.filterDate')"
                dense
                hide-details
                :disabled="loading"
                @input="getResults"
              />
            </v-col>
            <v-col
              v-if="gym.gym_spaces.length > 1"
              cols="12"
              md="6"
            >
              <v-select
                v-model="spaceIds"
                :label="$t('components.gymStatistic.filterSpace')"
                :items="spacesList"
                hide-details
                multiple
                dense
                clearable
                :disabled="loading"
                item-text="text"
                item-value="value"
                outlined
                @input="getResults"
              />
            </v-col>
          </v-row>
          <div class="pt-2">
            <v-simple-table
              class="border-bottom"
              height="calc(100vh - 92px)"
              fixed-header
            >
              <template #default>
                <thead>
                  <tr>
                    <th class="text-right smallest-table-column" style="box-shadow: none">
                      <v-btn
                        text
                        :loading="loading"
                        @click="switchRowColumns"
                      >
                        {{ $t('actions.invert') }}
                        <v-icon right>
                          {{ mdiCached }}
                        </v-icon>
                      </v-btn>
                    </th>
                    <th
                      class="px-0 font-weight-regular"
                      style="box-shadow: none"
                      :colspan="table.headers.length + 1"
                    >
                      <v-select
                        v-model="numberOf"
                        :items="availableGroups"
                        item-text="text"
                        item-value="value"
                        class="d-inline-block"
                        outlined
                        hide-details
                        dense
                        :disabled="loading"
                        :prepend-inner-icon="mdiTableArrowRight"
                        :label="$t('components.gymCrossTable.numberOf')"
                        @change="getResults"
                      />
                    </th>
                  </tr>
                  <tr>
                    <th class="px-1 font-weight-regular smallest-table-column">
                      <v-select
                        v-model="by"
                        :items="availableGroups"
                        item-text="text"
                        item-value="value"
                        outlined
                        full-width
                        hide-details
                        :disabled="loading"
                        dense
                        :prepend-inner-icon="mdiTableArrowDown"
                        :label="$t('components.gymCrossTable.by')"
                        @change="getResults"
                      />
                    </th>
                    <th
                      class="text-right deep-purple--text text--accent-3 border-top border-left"
                      style="background-color: rgba(101, 31, 255, 0.08)"
                    />
                    <th
                      v-for="(header, headerIndex) of table.headers"
                      :key="`header-index-${headerIndex}`"
                      class="border-left border-top text-center"
                    >
                      <span v-if="header === null">
                        Ø
                      </span>
                      <span
                        v-else-if="table.params.number_of === 'grade'"
                        v-html="gradeToHtml(header, gradeValueToText(header))"
                      />
                      <v-chip
                        v-else-if="table.params.number_of === 'style'"
                        small
                      >
                        <v-icon
                          class="mr-1"
                          small
                        >
                          {{ MC_ClimbingStylesByStyle[header].icon }}
                        </v-icon>
                        {{ MC_ClimbingStylesByStyle[header].text }}
                      </v-chip>
                      <v-icon
                        v-else-if="table.params.number_of === 'level'"
                        :color="header.split('-')[1]"
                      >
                        {{ mdiCircle }}
                      </v-icon>
                      <span v-else>
                        {{ header }}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      class="text-right deep-purple--text text--accent-3"
                      style="background-color: rgba(101, 31, 255, 0.08)"
                    />
                    <td
                      style="background-color: rgba(101, 31, 255, 0.08)"
                      class="border-left text-center smallest-table-column"
                    >
                      <v-icon color="deep-purple --accent-3">
                        {{ mdiSigma }}
                      </v-icon>
                    </td>
                    <td
                      v-for="(headerTotal, headerTotalIndex) of headersTotal"
                      :key="`headerTotal-index-${headerTotalIndex}`"
                      class="text-center deep-purple--text text--accent-3 border-left"
                      style="background-color: rgba(101, 31, 255, 0.08)"
                    >
                      <strong>{{ headerTotal }}</strong><br>
                      <small class="mt-n1">
                        {{ percent(headerTotal, headersTotal) }}%
                      </small>
                    </td>
                  </tr>
                  <tr
                    v-for="(row, rowIndex) of table.rows"
                    :key="`row-index-${rowIndex}`"
                  >
                    <th class="smallest-table-column text-right">
                      <span v-if="row.value === null">
                        Ø
                      </span>
                      <span
                        v-else-if="table.params.by === 'grade'"
                        v-html="gradeToHtml(row.value, gradeValueToText(row.value))"
                      />
                      <v-chip
                        v-else-if="table.params.by === 'style'"
                        small
                      >
                        <v-icon
                          class="mr-1"
                          small
                        >
                          {{ MC_ClimbingStylesByStyle[row.value].icon }}
                        </v-icon>
                        {{ MC_ClimbingStylesByStyle[row.value].text }}
                      </v-chip>
                      <v-icon
                        v-else-if="table.params.by === 'level'"
                        :color="row.value.split('-')[1]"
                      >
                        {{ mdiCircle }}
                      </v-icon>
                      <span v-else>
                        {{ row.value }}
                      </span>
                    </th>
                    <td
                      class="text-center deep-purple--text text--accent-3"
                      style="background-color: rgba(101, 31, 255, 0.08)"
                    >
                      <strong>{{ row.data.reduce((total, current) => { return total + current }, 0) }}</strong>
                    </td>
                    <td
                      v-for="(column, columnIndex) of row.data"
                      :key="`column-index-${columnIndex}`"
                      class="border-left text-center"
                      :style="column === null ? 'background-color: rgba(150,150,150,0.1)' : ''"
                    >
                      {{ column }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mdiCached, mdiTableArrowRight, mdiTableArrowDown, mdiSigma, mdiCircle } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import { GymFetchConcern } from '~/concerns/GymFetchConcern'
import { GradeMixin } from '~/mixins/GradeMixin'
import GymAdminRoutesTabs from '~/components/gyms/layouts/GymAdminRoutesTabs'
import IndoorSubscriptionLockAlert from '~/components/indoorSubscription/IndoorSubscriptionLockAlert'
import OblykApi from '~/services/oblyk-api/OblykApi'
import { ClimbingStylesMixin } from '~/mixins/ClimbingStylesMixin'
import DatePickerMenuInput from '~/components/forms/DatePickerMenuInput'

export default {
  components: {
    DatePickerMenuInput,
    IndoorSubscriptionLockAlert,
    GymAdminRoutesTabs
  },
  meta: { orphanRoute: true },
  mixins: [
    GymFetchConcern,
    DateHelpers,
    GradeMixin,
    ClimbingStylesMixin
  ],
  middleware: ['auth', 'gymAdmin'],

  data () {
    return {
      by: 'sector',
      numberOf: 'grade',
      spaceIds: [],
      openedAt: new Date().toISOString().substring(0, 10),
      loading: true,
      table: {
        headers: [],
        rows: [],
        params: {}
      },
      availableGroups: [
        { value: 'grade', text: this.$t('components.gymCrossTable.items.grade') },
        { value: 'level', text: this.$t('components.gymCrossTable.items.level') },
        { value: 'sector', text: this.$t('components.gymCrossTable.items.sector') },
        { value: 'anchor', text: this.$t('components.gymCrossTable.items.anchor') },
        { value: 'opener', text: this.$t('components.gymCrossTable.items.opener') },
        { value: 'style', text: this.$t('components.gymCrossTable.items.style') },
        { value: 'number_of_ascension', text: this.$t('components.gymCrossTable.items.number_of_ascension') },
        { value: 'like', text: this.$t('components.gymCrossTable.items.like') },
        { value: 'comment', text: this.$t('components.gymCrossTable.items.comment') }
      ],

      mdiCached,
      mdiTableArrowRight,
      mdiTableArrowDown,
      mdiSigma,
      mdiCircle
    }
  },

  i18n: {
    messages: {
      fr: {
        metaTitle: '%{name} - Statistiques croisées'
      },
      en: {
        metaTitle: '%{name} - Cross statistics'
      }
    }
  },

  head () {
    return {
      title: this.$t('metaTitle', { name: this.gym?.name })
    }
  },

  computed: {
    spacesList () {
      const spaces = []
      for (const space of this.gym.gym_spaces) {
        spaces.push({ value: space.id, text: space.name })
      }
      return spaces
    },

    breadcrumbs () {
      return [
        {
          text: this.gym?.name,
          disable: true
        },
        {
          text: this.$t('components.gymAdmin.home'),
          to: this.gym?.adminPath,
          exact: true
        },
        {
          text: this.$t('components.gymAdmin.routes'),
          disabled: true
        },
        {
          text: this.$t('components.gym.tabs.crossStatistics'),
          to: `${this.gym?.adminPath}/routes/cross-statistics`,
          exact: true
        }
      ]
    },

    headersTotal () {
      const headerTotal = []
      for (const rowIndex in this.table.rows) {
        for (const columnIndex in this.table.rows[rowIndex].data) {
          headerTotal[columnIndex] ||= 0
          headerTotal[columnIndex] += this.table.rows[rowIndex].data[columnIndex] || 0
        }
      }
      return headerTotal
    }
  },

  mounted () {
    this.getResults()
  },

  methods: {
    getResults () {
      this.loading = true
      new OblykApi(this.$axios, this.$auth)
        .get(
          `/gyms/${this.$route.params.gymId}/statistics/cross_statistics`,
          {
            by: this.by,
            number_of: this.numberOf,
            gym_space_ids: this.spaceIds,
            opened_at: this.openedAt
          }
        )
        .then((resp) => {
          this.table.headers = resp.data.column_headers
          this.table.rows = resp.data.results
          this.table.params = resp.data.params
        })
        .finally(() => {
          this.loading = false
        })
    },

    percent (number, numbersArray) {
      const sum = numbersArray.reduce((total, a) => total + a, 0)
      return Math.round(number / sum * 100)
    },

    switchRowColumns () {
      const by = this.by
      const numberOf = this.numberOf
      this.numberOf = by
      this.by = numberOf
      this.getResults()
    }
  }
}
</script>
