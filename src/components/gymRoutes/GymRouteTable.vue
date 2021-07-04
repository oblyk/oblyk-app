<template>
  <div>

    <!-- Switch & Actions menu -->
    <v-row>
      <v-col>
        <v-switch
          class="mt-0"
          hide-details
          v-model="mountedRoute"
          :label="mountedRoute ? $t('components.gymAdmin.mountedRoutes') : $t('components.gymAdmin.dismountedRoutes')"
        />
      </v-col>
      <v-col
        v-if="routeSelected.length > 0"
        class="text-right"
      >
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              small
              v-bind="attrs"
              v-on="on"
            >
              {{ $t('actions.actions') }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-if="mountedRoute"
              @click="dismountCollection()"
            >
              <v-list-item-icon>
                <v-icon>mdi-backburger</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.dismountRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="!mountedRoute"
              @click="mountCollection()"
            >
              <v-list-item-icon>
                <v-icon>mdi-forwardburger</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.mountRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>

    <!-- Routes table -->
    <v-row>
      <v-col>
        <v-data-table
          v-model="routeSelected"
          :headers="tables.headers"
          :items="tables.routes"
          :items-per-page="15"
          :loading="loadingRoutes"
          class="elevation-1"
          item-key="id"
          show-select
        >
          <template v-slot:item.color="{ item }">
            <gym-route-tag-and-hold :gym-route="item.color" />
          </template>
          <template v-slot:item.space="{ item }">
            <router-link :to="item.space.Gym.path(`spaces/${item.space.gym_space.id}/${item.space.gym_space.slug_name}/plan`)">
              {{ item.space.gym_space.name }}
            </router-link>
          </template>
          <template v-slot:item.openedAt="{ item }">
            {{ humanizeDate(item.openedAt) }}
          </template>
          <template v-slot:item.edit="{ item }">
            <router-link
              :to="item.space.Gym.path(`spaces/${item.edit.gym_space.id}/${item.edit.gym_space.slug_name}/routes/${item.edit.id}/edit?redirect_to=${$route.fullPath}`)"
            >
              <v-icon small>mdi-pencil</v-icon>
            </router-link>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { DateHelpers } from '@/mixins/DateHelpers'
import GymApi from '@/services/oblyk-api/GymApi'
import GymRoute from '@/models/GymRoute'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteApi from '@/services/oblyk-api/GymRouteApi'

export default {
  name: 'GymRoutesTable',
  components: { GymRouteTagAndHold },
  mixins: [DateHelpers],
  props: {
    gym: Object
  },

  data () {
    return {
      routes: [],
      mountedRoute: true,
      loadingRoutes: true,
      routeSelected: [],
      tables: {
        headers: [
          {
            text: this.$t('models.gymRoute.colors'),
            align: 'start',
            sortable: false,
            value: 'color'
          },
          {
            text: this.$t('models.gymRoute.grade'),
            align: 'start',
            sortable: true,
            value: 'grade'
          },
          {
            text: this.$t('models.gymRoute.short_name'),
            align: 'start',
            sortable: true,
            value: 'name'
          },
          {
            text: this.$t('models.gymRoute.openers'),
            align: 'start',
            sortable: true,
            value: 'opener'
          },
          {
            text: this.$t('models.gymRoute.opened_at'),
            align: 'start',
            sortable: true,
            value: 'openedAt'
          },
          {
            text: this.$t('models.gymRoute.gym_sector_id'),
            align: 'start',
            sortable: true,
            value: 'sector'
          },
          {
            text: this.$t('models.gymRoute.gym_space_id'),
            align: 'start',
            sortable: true,
            value: 'space'
          },
          {
            text: this.$t('models.gymRoute.ascents_count'),
            align: 'start',
            sortable: false,
            value: 'ascentsCount'
          },
          {
            text: this.$t('actions.edit'),
            align: 'center',
            sortable: false,
            value: 'edit'
          }
        ],
        routes: []
      }
    }
  },

  watch: {
    mountedRoute: function () {
      this.routeSelected = []
      this.getRoutes()
    }
  },

  mounted () {
    this.getRoutes()
  },

  methods: {
    getRoutes: function () {
      this.loadingRoutes = true
      this.routes = []
      this.tables.routes = []
      GymApi
        .routes(
          this.gym.id,
          !this.mountedRoute
        )
        .then(resp => {
          for (const route of resp.data) {
            this.routes.push(new GymRoute(route))
          }
          this.formatRoutes()
        })
        .finally(() => {
          this.loadingRoutes = false
        })
    },

    formatRoutes: function () {
      for (const route of this.routes) {
        this.tables.routes.push(
          {
            id: route.id,
            color: route,
            name: route.name,
            grade: route.grade_to_s,
            sector: route.gym_sector.name,
            space: route,
            opener: route.openers,
            openedAt: route.opened_at,
            ascentsCount: route.ascents_count,
            edit: route
          }
        )
      }
    },

    dismountCollection: function () {
      if (this.routeSelected.length === 0) return false

      const routeIds = []
      for (const route of this.routeSelected) {
        routeIds.push(route.id)
      }
      this.loadingRoutes = true
      GymRouteApi
        .dismountCollection(this.gym.id, routeIds)
        .then(() => {
          this.routeSelected = []
          this.getRoutes()
        })
    },

    mountCollection: function () {
      if (this.routeSelected.length === 0) return false

      const routeIds = []
      for (const route of this.routeSelected) {
        routeIds.push(route.id)
      }
      this.loadingRoutes = true
      GymRouteApi
        .mountCollection(this.gym.id, routeIds)
        .then(() => {
          this.routeSelected = []
          this.getRoutes()
        })
    }
  }
}
</script>
