<template>
  <div class="d-inline">
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          :title="$t('components.gymRoute.randomRoute')"
          v-on="on"
          @click="dialog = true"
        >
          <v-icon>
            {{ mdiDiceMultiple }}
          </v-icon>
        </v-btn>
      </template>
      <span>
        {{ $t('components.gymRoute.randomRoute') }}
      </span>
    </v-tooltip>
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          {{ $t('components.gymRoute.randomRouteTitle') }}
        </v-card-title>
        <v-card-text>
          <p class="text--secondary">
            {{ $t('components.gymRoute.randomRouteExplain') }}
          </p>
          <v-row>
            <v-col cols="6">
              <grade-select-input
                v-model="minGrade"
                :translate-key="'components.gymRoute.minGrade'"
              />
            </v-col>
            <v-col cols="6">
              <grade-select-input
                v-model="maxGrade"
                :translate-key="'components.gymRoute.maxGrade'"
              />
            </v-col>
          </v-row>
          <v-alert
            v-if="error"
            dense
            text
            type="error"
            class="mt-2"
          >
            {{ error }}
          </v-alert>
          <div v-if="randomRoute" class="mt-2">
            <gym-route-list-item
              :gym-route="randomRoute"
              :click-callback="openRandomRoute"
              bordered
            />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="dialog = false"
          >
            {{ $t('actions.close') }}
          </v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="pickRandom"
          >
            <v-icon left small>
              {{ mdiDiceMultiple }}
            </v-icon>
            {{ randomRoute ? $t('components.gymRoute.pickAgain') : $t('components.gymRoute.pickRandom') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiDiceMultiple } from '@mdi/js'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import GymRoute from '@/models/GymRoute'
import GradeSelectInput from '@/components/forms/GradeSelectInput'
import GymRouteListItem from '~/components/gymRoutes/GymRouteListItem'

const PER_PAGE = 25
const MAX_PAGES = 40

export default {
  name: 'GymRandomRoute',
  components: {
    GradeSelectInput,
    GymRouteListItem
  },
  props: {
    gym: {
      type: Object,
      required: true
    },
    gymSpace: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      dialog: false,
      minGrade: null,
      maxGrade: null,
      loading: false,
      randomRoute: null,
      error: null,

      mdiDiceMultiple
    }
  },

  methods: {
    routeGradeValues (route) {
      const values = []
      if (route.grade_gap && (route.grade_gap.min_grade_value || route.grade_gap.max_grade_value)) {
        if (route.grade_gap.min_grade_value) {
          values.push(Number(route.grade_gap.min_grade_value))
        }
        if (route.grade_gap.max_grade_value) {
          values.push(Number(route.grade_gap.max_grade_value))
        }
      }
      for (const section of route.sections || []) {
        if (section.grade_value !== null && section.grade_value !== undefined) {
          values.push(Number(section.grade_value))
        }
      }
      return values
    },

    routeMinValue (route) {
      const values = this.routeGradeValues(route)
      return values.length > 0 ? Math.min(...values) : null
    },

    routeMaxValue (route) {
      const values = this.routeGradeValues(route)
      return values.length > 0 ? Math.max(...values) : null
    },

    routeInRange (route) {
      const min = this.routeMinValue(route)
      const max = this.routeMaxValue(route)
      if (min === null || max === null) {
        return false
      }
      if (this.minGrade !== null && this.minGrade !== '' && max < Number(this.minGrade)) {
        return false
      }
      if (this.maxGrade !== null && this.maxGrade !== '' && min > Number(this.maxGrade)) {
        return false
      }
      return true
    },

    fetchPage (api, page) {
      if (this.gymSpace) {
        return api.paginatedRoutesInSpace(
          this.gymSpace.gym.id,
          this.gymSpace.id,
          'sector',
          'asc',
          page,
          false,
          null
        )
      }
      return api.paginatedRoutesInGym(
        this.gym.id,
        'sector',
        'asc',
        page,
        false,
        null
      )
    },

    fetchAllRoutes () {
      const api = new GymRouteApi(this.$axios, this.$auth)
      const allRoutes = []
      let page = 1

      const fetchNext = () => {
        return this.fetchPage(api, page).then((resp) => {
          for (const attrs of resp.data) {
            allRoutes.push(new GymRoute({ attributes: attrs }))
          }
          if (resp.data.length >= PER_PAGE && page < MAX_PAGES) {
            page += 1
            return fetchNext()
          }
          return allRoutes
        })
      }

      return fetchNext()
    },

    pickRandom () {
      this.error = null
      if (this.minGrade !== null && this.minGrade !== '' && this.maxGrade !== null && this.maxGrade !== '' && Number(this.minGrade) > Number(this.maxGrade)) {
        this.error = this.$t('components.gymRoute.minMaxError')
        return
      }
      this.loading = true
      this.randomRoute = null
      this.fetchAllRoutes()
        .then((routes) => {
          const filtered = routes.filter(route => this.routeInRange(route))
          if (filtered.length === 0) {
            this.error = this.$t('components.gymRoute.noRouteInRange')
            return
          }
          const index = Math.floor(Math.random() * filtered.length)
          this.randomRoute = filtered[index]
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymRoute')
        })
        .finally(() => {
          this.loading = false
        })
    },

    openRandomRoute (route) {
      this.dialog = false
      const query = { ...this.$route.query, route: route.id }
      this.$router.push({ path: this.$route.path, query })
    }
  }
}
</script>
