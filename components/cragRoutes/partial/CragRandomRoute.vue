<template>
  <div class="d-inline">
    <v-btn
      text
      block
      x-large
      outlined
      @click="dialog = true"
    >
      <v-icon left>
        {{ mdiDiceMultiple }}
      </v-icon>
      {{ $t('components.cragRoute.randomRoute') }}
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          {{ $t('components.cragRoute.randomRouteTitle') }}
        </v-card-title>
        <v-card-text>
          <p class="text--secondary">
            {{ $t('components.cragRoute.randomRouteExplain') }}
          </p>
          <v-row>
            <v-col cols="6">
              <grade-select-input
                v-model="minGrade"
                :translate-key="'components.cragRoute.minGrade'"
              />
            </v-col>
            <v-col cols="6">
              <grade-select-input
                v-model="maxGrade"
                :translate-key="'components.cragRoute.maxGrade'"
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
            <crag-route-list-item
              :route="randomRoute"
              :callback="openRandomRoute"
              class="border rounded"
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
            {{ randomRoute ? $t('components.cragRoute.pickAgain') : $t('components.cragRoute.pickRandom') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiDiceMultiple } from '@mdi/js'
import CragRoute from '@/models/CragRoute'
import OblykApi from '~/services/oblyk-api/OblykApi'
import GradeSelectInput from '@/components/forms/GradeSelectInput'
import CragRouteListItem from '@/components/cragRoutes/CragRouteListItem'

const PER_PAGE = 25
const MAX_PAGES = 40

export default {
  name: 'CragRandomRoute',
  components: {
    GradeSelectInput,
    CragRouteListItem
  },
  props: {
    crag: {
      type: Object,
      default: null
    },
    cragSector: {
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
    routeMinValue (route) {
      return route.grade_gap?.min_grade_value ?? route.grade_gap?.max_grade_value ?? null
    },

    routeMaxValue (route) {
      return route.grade_gap?.max_grade_value ?? route.grade_gap?.min_grade_value ?? null
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

    routesUrl () {
      if (this.cragSector) {
        return `/public/crag_sectors/${this.cragSector.id}/crag_routes`
      }
      return `/public/crags/${this.crag.id}/crag_routes`
    },

    fetchAllRoutes () {
      const api = new OblykApi(this.$axios, this.$auth)
      const url = this.routesUrl()
      const allRoutes = []
      let page = 1

      const fetchPage = () => {
        return api.get(url, { page }).then((resp) => {
          for (const attrs of resp.data) {
            allRoutes.push(new CragRoute({ attributes: attrs }))
          }
          if (resp.data.length >= PER_PAGE && page < MAX_PAGES) {
            page += 1
            return fetchPage()
          }
          return allRoutes
        })
      }

      return fetchPage()
    },

    pickRandom () {
      this.error = null
      if (this.minGrade !== null && this.minGrade !== '' && this.maxGrade !== null && this.maxGrade !== '' && Number(this.minGrade) > Number(this.maxGrade)) {
        this.error = this.$t('components.cragRoute.minMaxError')
        return
      }
      this.loading = true
      this.randomRoute = null
      this.fetchAllRoutes()
        .then((routes) => {
          const filtered = routes.filter(route => this.routeInRange(route))
          if (filtered.length === 0) {
            this.error = this.$t('components.cragRoute.noRouteInRange')
            return
          }
          const index = Math.floor(Math.random() * filtered.length)
          this.randomRoute = filtered[index]
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'cragRoute')
        })
        .finally(() => {
          this.loading = false
        })
    },

    openRandomRoute (route) {
      this.dialog = false
      this.$root.$emit('getCragRouteInDrawer', route.crag.id, route.id)
    }
  }
}
</script>
