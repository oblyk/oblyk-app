<template>
  <div>
    <!-- Routes table -->
    <v-row class="mb-10">
      <v-col>
        <client-only>
          <v-data-table
            v-model="routeSelected"
            :headers="tableHeaders"
            :items="tableRoutes"
            :items-per-page="-1"
            :loading="loadingRoutes"
            item-key="id"
            :show-select="canManageOpening"
          >
            <!-- Header slot -->
            <template
              v-once
              #[`header.ascentsCount`]="{ header }"
            >
              <v-icon
                small
                :title="header.text"
              >
                {{ mdiBookCheckOutline() }}
              </v-icon>
            </template>
            <template
              v-once
              #[`header.likesCount`]="{ header }"
            >
              <v-icon
                small
                :title="header.text"
              >
                {{ mdiHeartOutline() }}
              </v-icon>
            </template>
            <template
              v-once
              #[`header.difficultyAppreciation`]="{ header }"
            >
              <v-icon
                small
                :title="header.text"
              >
                {{ mdiGauge() }}
              </v-icon>
            </template>

            <!-- Row slot -->
            <template
              v-once
              #[`item.color`]="{ item }"
            >
              <gym-route-tag-and-hold :gym-route="item.color" />
            </template>
            <template
              v-once
              #[`item.space`]="{ item }"
            >
              <nuxt-link :to="item.space.gymSpacePath">
                {{ item.space.gym_space.name }}
              </nuxt-link>
            </template>
            <template
              v-once
              #[`item.openedAt`]="{ item }"
            >
              <v-btn
                v-if="canManageOpening"
                small
                icon
                left
                :title="`${$t('actions.selectOrUnselect')} : ${humanizeDate(item.openedAt)}`"
                @click="routesBulkSelector(item.id, 'openedAt')"
              >
                <v-icon small>
                  {{ mdiCheckAll() }}
                </v-icon>
              </v-btn>
              {{ humanizeDate(item.openedAt, 'D MMM YY') }}
            </template>
            <template
              v-once
              #[`item.anchorNumber`]="{ item }"
            >
              <v-btn
                v-if="canManageOpening && item.anchorNumber !== null"
                small
                icon
                left
                :title="`${$t('actions.selectOrUnselect')} : ${item.anchorNumber}`"
                @click="routesBulkSelector(item.id, 'anchorNumber')"
              >
                <v-icon small>
                  {{ mdiCheckAll() }}
                </v-icon>
              </v-btn>
              {{ item.anchorNumber }}
            </template>
            <template
              v-once
              #[`item.sector`]="{ item }"
            >
              <v-btn
                v-if="canManageOpening"
                small
                icon
                left
                :title="`${$t('actions.selectOrUnselect')} : ${item.sector}`"
                @click="routesBulkSelector(item.id, 'sector')"
              >
                <v-icon small>
                  {{ mdiCheckAll() }}
                </v-icon>
              </v-btn>
              {{ item.sector }}
            </template>
            <template
              v-once
              #[`item.ascentsCount`]="{ item }"
            >
              <v-btn
                v-if="item.ascentsCount > 0"
                small
                icon
                @click="getAscents(item.id)"
              >
                {{ item.ascentsCount }}
              </v-btn>
            </template>
            <template
              v-once
              #[`item.difficultyAppreciation`]="{ item }"
            >
              <v-icon
                v-if="item.difficultyAppreciation !== null"
                :style="`transform: rotate(${item.difficultyAppreciation * -90}deg)`"
                :title="difficultyAppreciationStatus(item.difficultyAppreciation)"
                :color="difficultyColor(item.difficultyAppreciation)"
              >
                {{ mdiArrowRightThin() }}
              </v-icon>
            </template>
            <template
              v-once
              #[`item.edit`]="{ item }"
            >
              <nuxt-link :to="`${item.edit.path}/edit?redirect_to=${$route.fullPath}`">
                <v-icon small>
                  {{ mdiPencil() }}
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
                {{ mdiDotsVertical() }}
              </v-icon>
              {{ $t('actions.actions') }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="dismountCollection()">
              <v-list-item-icon>
                <v-icon>{{ mdiBackburger() }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.dismountRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="mountCollection()">
              <v-list-item-icon>
                <v-icon>{{ mdiForwardburger() }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.mountRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="printCollection()">
              <v-list-item-icon>
                <v-icon>{{ mdiPrinter() }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.printRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="exportCollection()">
              <v-list-item-icon>
                <v-icon>{{ mdiTableArrowRight() }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.exportRoutes', routeSelected.length, { count: routeSelected.length }) }}
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
  mdiCheckAll,
  mdiTableArrowRight,
  mdiBookCheckOutline,
  mdiHeartOutline,
  mdiGauge,
  mdiArrowRightThin
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
  components: {
    AscentGymRouteStatusIcon,
    Note,
    GymRouteTagAndHold
  },
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
      loadingRoutes: true,
      routeSelected: [],
      ascentsDialog: false,
      loadingAscents: true,
      routeAscents: [],
      tableRoutes: []
    }
  },

  computed: {
    tableHeaders () {
      const headers = [
        {
          order: 1,
          text: this.$t('models.gymRoute.colors'),
          align: 'start',
          sortable: false,
          value: 'color'
        },
        {
          order: 5,
          text: this.$t('models.gymRoute.openers'),
          align: 'start',
          sortable: true,
          value: 'opener'
        },
        {
          order: 6,
          text: this.$t('models.gymRoute.opened_at'),
          align: 'start',
          sortable: true,
          value: 'openedAt'
        },
        {
          order: 8,
          text: this.$t('models.gymRoute.gym_sector_id'),
          align: 'start',
          sortable: true,
          value: 'sector'
        },
        {
          order: 9,
          text: this.$t('models.gymRoute.gym_space_id'),
          align: 'start',
          sortable: true,
          value: 'space'
        },
        {
          order: 10,
          text: this.$t('models.gymRoute.ascents'),
          align: 'start',
          sortable: true,
          value: 'ascentsCount'
        },
        {
          order: 11,
          text: this.$t('models.gymRoute.likes_count'),
          align: 'start',
          sortable: true,
          value: 'likesCount'
        },
        {
          order: 12,
          text: this.$t('models.gymRoute.difficulty_appreciation'),
          align: 'start',
          sortable: true,
          value: 'difficultyAppreciation'
        }
      ]

      let haveAnchor = false
      let haveName = false
      let havePoint = false
      let haveGrade = false
      for (const route of this.routes) {
        // Add anchor column
        if (!haveAnchor && route.anchor_number !== null) {
          headers.push({
            order: 7,
            text: this.$t('models.gymRoute.anchor_number'),
            align: 'start',
            sortable: true,
            value: 'anchorNumber'
          })
          haveAnchor = true
        }
        // Add name column
        if (!haveName && route.name !== null) {
          headers.push({
            order: 4,
            text: this.$t('models.gymRoute.short_name'),
            align: 'start',
            sortable: true,
            value: 'name'
          })
          haveName = true
        }
        // Add point column
        if (!havePoint && route.points_to_s !== null) {
          headers.push({
            order: 3,
            text: this.$t('models.gymRoute.points'),
            align: 'start',
            sortable: true,
            value: 'points'
          })
          havePoint = true
        }
        // Add grade column
        if (!haveGrade && route.grade_to_s !== null) {
          headers.push({
            order: 2,
            text: this.$t('models.gymRoute.grade'),
            align: 'start',
            sortable: true,
            value: 'grade'
          })
          haveGrade = true
        }
      }

      // Is user can be manage route
      if (this.canManageOpening) {
        headers.push(
          {
            order: 13,
            text: '',
            align: 'center',
            sortable: false,
            value: 'edit'
          }
        )
      }

      return headers.sort((a, b) => a.order - b.order)
    },

    canManageOpening () {
      return this.gymAuthCan(this.gym, 'manage_opening')
    }
  },

  mounted () {
    this.getRoutes()
  },

  methods: {
    getRoutes () {
      this.loadingRoutes = true
      this.routes = []
      this.tableRoutes = []
      new GymApi(this.$axios, this.$auth)
        .routes(this.gym.id)
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
      const selectedRoute = this.tableRoutes.find(route => route.id === routeId)
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
        for (const route of this.tableRoutes) {
          if (route[attribute] === selectedRoute[attribute]) {
            this.routeSelected.push(route)
          }
        }
      }
    },

    formatRoutes () {
      for (const route of this.routes) {
        this.tableRoutes.push(
          {
            id: route.id,
            color: route,
            name: route.name,
            grade: route.grade_to_s,
            points: route.points_to_s,
            anchorNumber: route.anchor_number,
            sector: route.gym_sector.name,
            space: route,
            opener: route.openers.map(opener => opener.name).join(', '),
            openedAt: route.opened_at,
            ascentsCount: route.ascents_count,
            likesCount: route.likes_count,
            difficultyAppreciation: route.difficulty_appreciation,
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

    exportCollection () {
      if (this.routeSelected.length === 0) { return false }

      const routeIds = []
      for (const route of this.routeSelected) {
        routeIds.push(route.id)
      }
      this.loadingRoutes = true
      new GymRouteApi(this.$axios, this.$auth)
        .exportCollection(this.gym.id, routeIds)
        .then((resp) => {
          const newBlob = new Blob([resp.data], { type: 'text/csv' })
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob)
            return
          }

          const data = window.URL.createObjectURL(newBlob)
          const link = document.createElement('a')
          link.href = data
          link.setAttribute(
            'download',
            this.$t('components.gymRoute.exportedFileName', { date: this.$moment().format('YYYY-MM-DD'), name: this.gym.name })
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
    },

    difficultyColor (difficultyAppreciation) {
      let colorDiff = null
      if (difficultyAppreciation > 0) {
        colorDiff = Math.abs(difficultyAppreciation) * 127
        return `rgb(${128 + colorDiff}, ${128 - colorDiff}, ${128 - colorDiff})`
      } else {
        colorDiff = Math.abs(difficultyAppreciation) * 100
        return `rgb(${128 - colorDiff}, ${128 - colorDiff}, ${128 + colorDiff})`
      }
    },

    difficultyAppreciationStatus (difficultyAppreciation) {
      if (difficultyAppreciation >= 0.6) {
        return this.$t('components.difficulty.hard')
      } else if (difficultyAppreciation >= 0.2) {
        return this.$t('components.difficulty.pretty_hard')
      } else if (difficultyAppreciation >= -0.2) {
        return this.$t('components.difficulty.just')
      } else if (difficultyAppreciation >= -0.6) {
        return this.$t('components.difficulty.pretty_soft')
      } else {
        return this.$t('components.difficulty.soft')
      }
    },

    mdiBackburger () { return mdiBackburger },
    mdiForwardburger () { return mdiForwardburger },
    mdiPencil () { return mdiPencil },
    mdiPrinter () { return mdiPrinter },
    mdiDotsVertical () { return mdiDotsVertical },
    mdiCheckAll () { return mdiCheckAll },
    mdiTableArrowRight () { return mdiTableArrowRight },
    mdiBookCheckOutline () { return mdiBookCheckOutline },
    mdiHeartOutline () { return mdiHeartOutline },
    mdiGauge () { return mdiGauge },
    mdiArrowRightThin () { return mdiArrowRightThin }
  }
}
</script>
