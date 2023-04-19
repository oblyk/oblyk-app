<template>
  <div>
    <!-- Switch & Actions menu -->
    <v-sheet
      class="rounded pa-4 mt-4 mb-4"
    >
      <v-switch
        v-model="mountedRoute"
        class="mt-0 d-inline-block"
        hide-details
        :label="mountedRoute ? $t('components.gymAdmin.mountedRoutes') : $t('components.gymAdmin.dismountedRoutes')"
      />
    </v-sheet>

    <!-- Routes table -->
    <v-row class="mb-10">
      <v-col>
        <client-only>
          <v-data-table
            v-model="routeSelected"
            :headers="tables.headers"
            :items="tables.routes"
            :items-per-page="mountedRoute ? -1 : 15"
            :loading="loadingRoutes"
            item-key="id"
            :show-select="gymAuthCan(gym, 'manage_opening')"
          >
            <template #[`item.color`]="{ item }">
              <gym-route-tag-and-hold :gym-route="item.color" />
            </template>
            <template #[`item.space`]="{ item }">
              <nuxt-link :to="item.space.gymSpacePath">
                {{ item.space.gym_space.name }}
              </nuxt-link>
            </template>
            <template #[`item.openedAt`]="{ item }">
              <v-btn
                v-if="gymAuthCan(gym, 'manage_opening')"
                small
                icon
                left
                :title="`${$t('actions.selectOrUnselect')} : ${humanizeDate(item.openedAt)}`"
                @click="routesBulkSelector(item.id, 'openedAt')"
              >
                <v-icon small>
                  {{ mdiCheckAll }}
                </v-icon>
              </v-btn>
              {{ humanizeDate(item.openedAt) }}
            </template>
            <template #[`item.sector`]="{ item }">
              <v-btn
                v-if="gymAuthCan(gym, 'manage_opening')"
                small
                icon
                left
                :title="`${$t('actions.selectOrUnselect')} : ${item.sector}`"
                @click="routesBulkSelector(item.id, 'sector')"
              >
                <v-icon small>
                  {{ mdiCheckAll }}
                </v-icon>
              </v-btn>
              {{ item.sector }}
            </template>
            <template #[`item.ascentsCount`]="{ item }">
              <v-btn
                v-if="item.ascentsCount > 0"
                small
                icon
                @click="getAscents(item.id)"
              >
                {{ item.ascentsCount }}
              </v-btn>
            </template>
            <template #[`item.edit`]="{ item }">
              <nuxt-link
                v-if="gymAuthCan(gym, 'manage_opening')"
                :to="`${item.edit.path}/edit?redirect_to=${$route.fullPath}`"
              >
                <v-icon small>
                  {{ mdiPencil }}
                </v-icon>
              </nuxt-link>
            </template>
          </v-data-table>
        </client-only>
      </v-col>
    </v-row>

    <!-- Actions -->
    <v-scale-transition>
      <div
        v-show="routeSelected.length > 0"
        :style="`position: fixed; bottom: ${$vuetify.breakpoint.mobile ? 55 : 10}px; right: 10px`"
      >
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn
              large
              color="primary"
              elevation="0"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon left>
                {{ mdiDotsVertical }}
              </v-icon>
              {{ $t('actions.actions') }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-if="mountedRoute"
              @click="dismountCollection()"
            >
              <v-list-item-icon>
                <v-icon>{{ mdiBackburger }}</v-icon>
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
                <v-icon>{{ mdiForwardburger }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.mountRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="printCollection()">
              <v-list-item-icon>
                <v-icon>{{ mdiPrinter }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.printRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-scale-transition>

    <!-- Ascent -->
    <v-dialog
      v-model="ascentsDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title>
          {{ $t('models.gymRoute.ascents') }}
        </v-card-title>
        <p
          v-if="loadingAscents"
          class="py-5 text-center"
        >
          {{ $t('common.loading') }}
        </p>
        <div
          v-else
          class="px-4"
        >
          <div
            v-for="(ascent, ascentIndex) in routeAscents"
            :key="`ascent-index-${ascentIndex}`"
            class="border pa-2 rounded mb-2"
          >
            <p class="mb-0">
              <nuxt-link
                class="text-decoration-none"
                :to="`/climbers/${ascent.user.slug_name}`"
              >
                {{ ascent.user.full_name }}
              </nuxt-link> -
              <ascent-gym-route-status-icon
                :ascent-status="ascent.ascent_status"
                class="mr-1 mb-1"
              />
              {{ $t(`models.ascentStatus.${ascent.ascent_status}`) }} {{ $t('common.at') }} {{ humanizeDate(ascent.released_at) }}
              <note
                v-if="ascent.note !== null"
                :note="ascent.note"
              />
            </p>
            <p
              v-if="ascent.comment"
              class="mb-0 mt-1 font-italic"
            >
              {{ ascent.comment }}
            </p>
          </div>
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="ascentsDialog = false"
          >
            {{ $t('actions.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  mdiBackburger,
  mdiDotsVertical,
  mdiForwardburger,
  mdiPencil,
  mdiPrinter,
  mdiCheckAll
} from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import GymApi from '~/services/oblyk-api/GymApi'
import GymRoute from '@/models/GymRoute'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import AscentGymRoute from '~/models/AscentGymRoute'
import Note from '~/components/notes/Note.vue'
import AscentGymRouteStatusIcon from '~/components/ascentGymRoutes/AscentGymRouteStatusIcon.vue'

export default {
  name: 'GymRoutesTable',
  components: { AscentGymRouteStatusIcon, Note, GymRouteTagAndHold },
  mixins: [DateHelpers, GymRolesHelpers],
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      routes: [],
      mountedRoute: true,
      loadingRoutes: true,
      routeSelected: [],
      ascentsDialog: false,
      loadingAscents: true,
      routeAscents: [],
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
            text: this.$t('models.gymRoute.points'),
            align: 'start',
            sortable: true,
            value: 'points'
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
      },

      mdiBackburger,
      mdiForwardburger,
      mdiPencil,
      mdiPrinter,
      mdiDotsVertical,
      mdiCheckAll
    }
  },

  watch: {
    mountedRoute () {
      this.routeSelected = []
      this.getRoutes()
    }
  },

  mounted () {
    this.getRoutes()
  },

  methods: {
    getRoutes () {
      this.loadingRoutes = true
      this.routes = []
      this.tables.routes = []
      new GymApi(this.$axios, this.$auth)
        .routes(
          this.gym.id,
          !this.mountedRoute
        )
        .then((resp) => {
          for (const route of resp.data) {
            this.routes.push(new GymRoute({ attributes: route }))
          }
          this.formatRoutes()
        })
        .finally(() => {
          this.loadingRoutes = false
        })
    },

    routesBulkSelector (routeId, attribute) {
      const selectedRoute = this.tables.routes.find(route => route.id === routeId)
      const inSelectedRoute = this.routeSelected.find(route => route.id === routeId)

      if (inSelectedRoute) {
        const newSelectedRoute = []
        for (const route of this.routeSelected) {
          if (route[attribute] !== selectedRoute[attribute]) {
            newSelectedRoute.push(route)
          }
        }
        this.routeSelected = newSelectedRoute
      } else {
        for (const route of this.tables.routes) {
          if (route[attribute] === selectedRoute[attribute]) {
            this.routeSelected.push(route)
          }
        }
      }
    },

    formatRoutes () {
      for (const route of this.routes) {
        this.tables.routes.push(
          {
            id: route.id,
            color: route,
            name: route.name,
            grade: route.grade_to_s,
            points: route.points_to_s,
            sector: route.gym_sector.name,
            space: route,
            opener: route.openers.map(opener => opener.name).join(', '),
            openedAt: route.opened_at,
            ascentsCount: route.ascents_count,
            edit: route
          }
        )
      }
    },

    dismountCollection () {
      if (this.routeSelected.length === 0) { return false }

      const routeIds = []
      for (const route of this.routeSelected) {
        routeIds.push(route.id)
      }
      this.loadingRoutes = true
      new GymRouteApi(this.$axios, this.$auth)
        .dismountCollection(this.gym.id, routeIds)
        .then(() => {
          this.routeSelected = []
          this.getRoutes()
        })
    },

    mountCollection () {
      if (this.routeSelected.length === 0) { return false }

      const routeIds = []
      for (const route of this.routeSelected) {
        routeIds.push(route.id)
      }
      this.loadingRoutes = true
      new GymRouteApi(this.$axios, this.$auth)
        .mountCollection(this.gym.id, routeIds)
        .then(() => {
          this.routeSelected = []
          this.getRoutes()
        })
    },

    printCollection () {
      if (this.routeSelected.length === 0) { return false }

      const routeIds = []
      for (const route of this.routeSelected) {
        routeIds.push(route.id)
      }
      this.loadingRoutes = true
      new GymRouteApi(this.$axios, this.$auth)
        .printCollection(this.gym.id, routeIds)
        .then((resp) => {
          const newBlob = new Blob([resp.data], { type: 'application/pdf' })
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob)
            return
          }

          const data = window.URL.createObjectURL(newBlob)
          const link = document.createElement('a')
          link.href = data
          link.setAttribute(
            'download',
            this.$t('components.gymRoute.printedFileName', { date: this.$moment().format('YYYY-MM-DD'), name: this.gym.name })
          )
          link.click()
          setTimeout(() => { window.URL.revokeObjectURL(data) }, 100)
          this.routeSelected = []
        })
        .finally(() => {
          this.loadingRoutes = false
        })
    },

    getAscents (routeId) {
      this.ascentsDialog = true
      this.loadingAscents = true
      this.routeAscents = []
      new GymRouteApi(this.$axios, this.$auth)
        .routeAscents(this.gym.id, routeId)
        .then((resp) => {
          for (const routeAscent of resp.data) {
            if (routeAscent.ascent_status === 'project') { continue }
            this.routeAscents.push(new AscentGymRoute({ attributes: routeAscent }))
          }
        })
        .finally(() => {
          this.loadingAscents = false
        })
    }
  }
}
</script>
