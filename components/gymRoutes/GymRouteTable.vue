<template>
  <div>
    <!-- Routes table -->
    <v-row class="mb-10">
      <v-col>
        <client-only>
          <v-tabs
            v-if="gym.gym_spaces.length > 1"
            v-model="spaceTab"
            class="rounded mb-2"
          >
            <v-tab disabled>
              {{ $t('components.gymAdmin.spaces') }} :
            </v-tab>
            <v-tab
              v-for="(space, spaceIndex) in gym.gym_spaces"
              :key="`space-index-${spaceIndex}`"
              @click="getRoutes(space.id)"
            >
              <v-img
                v-if="spaceToObject(space).pictureAttachment"
                contain
                height="40"
                width="40"
                class="mr-3"
                :src="imageVariant(spaceToObject(space).pictureAttachment, { fit: 'scale-down', height: 50, width: 50 })"
              />
              {{ space.name }}
            </v-tab>
            <v-tab @click="getRoutes()">
              {{ $t('common.all') }}
            </v-tab>
          </v-tabs>
          <v-sheet class="pt-2 pb-1 pr-3 pl-2 rounded mb-2">
            <v-text-field
              v-model="search"
              :label="$t('components.gymAdmin.searchInXRoutes', { count: routes.length })"
              hide-details
              dense
              outlined
              :prepend-inner-icon="mdiMagnify"
            />
          </v-sheet>
          <v-data-table
            v-model="routeSelected"
            :headers="tableHeaders"
            :items="tableRoutes"
            :items-per-page="50"
            :loading="loadingRoutes"
            item-key="id"
            :search="search"
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
                {{ mdiBookCheckOutline }}
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
                {{ mdiHeartOutline }}
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
                {{ mdiGauge }}
              </v-icon>
            </template>

            <!-- Row slot -->
            <template
              v-once
              #[`item.points`]="{ item }"
            >
              <span
                :class="item.points ? '' : 'font-italic'"
                :style="item.points ? '' : 'opacity: 0.60'"
              >
                {{ item.point_to_s }}
              </span>
            </template>
            <template
              v-once
              #[`item.see`]="{ item }"
            >
              <v-btn
                icon
                @click="getGymRoute(item)"
              >
                <v-icon>
                  {{ mdiEyeOutline }}
                </v-icon>
              </v-btn>
            </template>
            <template
              v-once
              #[`item.color`]="{ item }"
            >
              <gym-route-tag-and-hold :gym-route="item.color" />
            </template>
            <template
              v-once
              #[`item.gym_space`]="{ item }"
            >
              <nuxt-link :to="`/gyms/${item.gym.id}/${item.gym.slug_name}/spaces/${item.gym_space.id}/${item.gym_space.slug_name}`">
                {{ item.gym_space.name }}
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
                  {{ mdiCheckboxMultipleOutline }}
                </v-icon>
              </v-btn>
              {{ humanizeDate(item.openedAt, 'd LLL yy') }}
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
                  {{ mdiCheckboxMultipleOutline }}
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
                  {{ mdiCheckboxMultipleOutline }}
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
                {{ mdiArrowRightThin }}
              </v-icon>
            </template>
            <template
              v-once
              #[`item.edit`]="{ item }"
            >
              <nuxt-link :to="`${`/gyms/${item.gym.id}/${item.gym.slug_name}/spaces/${item.gym_space.id}/${item.gym_space.slug_name}/routes/${item.id}`}/edit?redirect_to=${$route.path}?space_id=${item.gym_space.id}`">
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
              {{ $tc('components.gymAdmin.selectedCount', routeSelected.length, { count: routeSelected.length }) }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="dismountCollection()">
              <v-list-item-icon>
                <v-icon>{{ mdiBackburger }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.dismountRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="mountCollection()">
              <v-list-item-icon>
                <v-icon>{{ mdiForwardburger }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.mountRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              :disabled="gym.plan === 'free'"
              @click="printCollection()"
            >
              <v-list-item-icon>
                <v-icon>{{ mdiPrinter }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="gym.plan === 'free' ? 'text--disabled' : ''"
              >
                <v-icon
                  v-if="gym.plan !== 'full_package'"
                  left
                  color="deep-purple accent-4"
                >
                  {{ mdiArrowUpBoldHexagonOutline }}
                </v-icon>
                {{ $tc('components.gymAdmin.printRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="exportCollection()">
              <v-list-item-icon>
                <v-icon>{{ mdiTableArrowRight }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $tc('components.gymAdmin.exportRoutes', routeSelected.length, { count: routeSelected.length }) }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              :disabled="gym.plan === 'free'"
              @click="openingSheetCollection()"
            >
              <v-list-item-icon>
                <v-icon>{{ mdiFileRefreshOutline }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title
                :class="gym.plan === 'free' ? 'text--disabled' : ''"
              >
                <v-icon
                  v-if="gym.plan !== 'full_package'"
                  left
                  color="deep-purple accent-4"
                >
                  {{ mdiArrowUpBoldHexagonOutline }}
                </v-icon>
                {{ $t('components.gymAdmin.openingSheetForRoutes') }}
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

    <!-- Print dialog -->
    <print-label-dialog
      ref="printLabelDialog"
      :gym="gym"
    />

    <!-- Opening Sheet Dialog -->
    <opening-sheet-dialog
      ref="openingSheetDialog"
      :gym="gym"
    />

    <!-- Popup for gym route -->
    <down-to-close-dialog
      ref="GymRouteDialog"
      v-model="gymRouteDialog"
      padding-x="px-2"
      :close-callback="closeGymRouteModal"
      wait-signal
    >
      <gym-route-info
        v-if="!loadingGymRoute && gymRoute"
        :close-callback="closeGymRouteModal"
        :gym-route="gymRoute"
        :gym="gym"
      />
    </down-to-close-dialog>
  </div>
</template>

<script>
import {
  mdiBackburger,
  mdiDotsVertical,
  mdiForwardburger,
  mdiPencil,
  mdiPrinter,
  mdiCheckboxMultipleOutline,
  mdiTableArrowRight,
  mdiBookCheckOutline,
  mdiHeartOutline,
  mdiGauge,
  mdiArrowRightThin,
  mdiMagnify,
  mdiEyeOutline,
  mdiFileRefreshOutline,
  mdiArrowUpBoldHexagonOutline
} from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { GymRolesHelpers } from '~/mixins/GymRolesHelpers'
import GymApi from '~/services/oblyk-api/GymApi'
import GymRoute from '@/models/GymRoute'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import AscentGymRoute from '~/models/AscentGymRoute'
import Note from '~/components/notes/Note'
import AscentGymRouteStatusIcon from '~/components/ascentGymRoutes/AscentGymRouteStatusIcon'
import PrintLabelDialog from '~/components/gymLabelTemplates/PrintLabelDialog'
import GymSpace from '~/models/GymSpace'
import DownToCloseDialog from '~/components/ui/DownToCloseDialog'
import GymRouteInfo from '~/components/gymRoutes/GymRouteInfo'
import OpeningSheetDialog from '~/components/gymOpeningSheets/OpeningSheetDialog'
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'

export default {
  name: 'GymRoutesTable',
  components: {
    OpeningSheetDialog,
    GymRouteInfo,
    DownToCloseDialog,
    PrintLabelDialog,
    AscentGymRouteStatusIcon,
    Note,
    GymRouteTagAndHold
  },
  mixins: [DateHelpers, GymRolesHelpers, ImageVariantHelpers],
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
      tableRoutes: [],
      search: null,
      spaceTab: 1,
      gymRouteDialog: false,
      loadingGymRoute: false,
      gymRoute: null,
      showSpaceColumn: true,

      mdiBackburger,
      mdiForwardburger,
      mdiPencil,
      mdiPrinter,
      mdiDotsVertical,
      mdiCheckboxMultipleOutline,
      mdiTableArrowRight,
      mdiBookCheckOutline,
      mdiHeartOutline,
      mdiGauge,
      mdiArrowRightThin,
      mdiMagnify,
      mdiEyeOutline,
      mdiFileRefreshOutline,
      mdiArrowUpBoldHexagonOutline
    }
  },

  computed: {
    tableHeaders () {
      const headers = [
        {
          order: 1,
          text: '',
          align: 'start',
          sortable: false,
          filterable: false,
          class: 'text-no-wrap',
          value: 'see'
        },
        {
          order: 2,
          text: this.$t('models.gymRoute.colors'),
          align: 'start',
          sortable: false,
          filterable: false,
          class: 'text-no-wrap',
          value: 'color'
        },
        {
          order: 4,
          text: this.$t('models.gymRoute.points'),
          align: 'start',
          sortable: true,
          filterable: false,
          class: 'text-no-wrap',
          value: 'points'
        },
        {
          order: 6,
          text: this.$t('models.gymRoute.openers'),
          align: 'start',
          sortable: true,
          class: 'text-no-wrap',
          value: 'opener'
        },
        {
          order: 7,
          text: this.$t('models.gymRoute.opened_at'),
          align: 'start',
          sortable: true,
          filterable: false,
          class: 'text-no-wrap',
          cellClass: 'text-no-wrap',
          value: 'openedAt'
        },
        {
          order: 9,
          text: this.$t('models.gymRoute.gym_sector_id'),
          align: 'start',
          sortable: true,
          class: 'text-no-wrap',
          cellClass: 'text-no-wrap',
          value: 'sector'
        },
        {
          order: 11,
          text: this.$t('models.gymRoute.ascents'),
          align: 'start',
          sortable: true,
          filterable: false,
          class: 'text-no-wrap',
          value: 'ascentsCount'
        },
        {
          order: 12,
          text: this.$t('models.gymRoute.likes_count'),
          align: 'start',
          sortable: true,
          filterable: false,
          class: 'text-no-wrap',
          value: 'likesCount'
        },
        {
          order: 13,
          text: this.$t('models.gymRoute.difficulty_appreciation'),
          align: 'start',
          sortable: true,
          filterable: false,
          class: 'text-no-wrap',
          value: 'difficultyAppreciation'
        }
      ]

      let haveAnchor = false
      let haveName = false
      let haveGrade = false
      for (const route of this.routes) {
        // Add anchor column
        if (!haveAnchor && route.anchor_number !== null) {
          headers.push({
            order: 8,
            text: this.$t('models.gymRoute.anchor_number'),
            align: 'start',
            sortable: true,
            cellClass: 'text-no-wrap',
            class: 'text-no-wrap',
            value: 'anchorNumber'
          })
          haveAnchor = true
        }
        // Add name column
        if (!haveName && route.name !== null) {
          headers.push({
            order: 5,
            text: this.$t('models.gymRoute.short_name'),
            align: 'start',
            sortable: true,
            class: 'text-no-wrap',
            value: 'name'
          })
          haveName = true
        }
        // Add grade column
        if (!haveGrade && route.grade_to_s !== null) {
          headers.push({
            order: 3,
            text: this.$t('models.gymRoute.grade'),
            align: 'start',
            sortable: true,
            class: 'text-no-wrap',
            value: 'grade'
          })
          haveGrade = true
        }
      }

      // Is user can be manage route
      if (this.canManageOpening) {
        headers.push({
          order: 14,
          text: '',
          align: 'center',
          sortable: false,
          filterable: false,
          class: 'text-no-wrap',
          value: 'edit'
        })
      }

      if (this.showSpaceColumn) {
        headers.push(
          {
            order: 10,
            text: this.$t('models.gymRoute.gym_space_id'),
            align: 'start',
            sortable: true,
            class: 'text-no-wrap',
            value: 'gym_space'
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
    const urlParams = new URLSearchParams(window.location.search)
    const querySpace = urlParams.get('space_id')
    if (querySpace) {
      let index = 1
      for (const space of this.gym.gym_spaces) {
        if (space.id === parseInt(querySpace)) {
          this.spaceTab = index
          break
        }
        index += 1
      }
      this.getRoutes(querySpace)
    } else if (this.gym.gym_spaces.length > 0) {
      this.getRoutes(this.gym.gym_spaces[0].id)
    } else {
      this.getRoutes()
    }
  },

  methods: {
    getRoutes (gymSpaceId) {
      this.loadingRoutes = true
      this.routes = []
      this.tableRoutes = []
      new GymApi(this.$axios, this.$auth)
        .routes(this.gym.id, gymSpaceId)
        .then((resp) => {
          for (const route of resp.data) {
            this.routes.push(new GymRoute({ attributes: route }))
          }
          this.showSpaceColumn = !gymSpaceId
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
            color: {
              id: route.id,
              hold_colors: route.hold_colors,
              tag_colors: route.tag_colors
            },
            name: route.name,
            grade: route.grade_to_s,
            point_to_s: route.points_to_s,
            points: route.points,
            anchorNumber: route.anchor_number,
            sector: route.gym_sector.name,
            gym_space: {
              id: route.gym_space.id,
              name: route.gym_space.name,
              slug_name: route.gym_space.slug_name
            },
            gym: {
              id: route.gym.id,
              name: route.gym.name,
              slug_name: route.gym.slug_name
            },
            opener: route.openers.map(opener => opener.name).join(', '),
            openedAt: route.opened_at,
            ascentsCount: route.ascents_count,
            likesCount: route.likes_count,
            difficultyAppreciation: route.difficulty_appreciation,
            edit: null
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
      let sectors = []
      let anchors = []
      for (const route of this.routeSelected) {
        routeIds.push(route.id)
        sectors.push(route.sector)
        if (route.anchorNumber !== null) {
          anchors.push(`Relais n°${route.anchorNumber}`)
        }
      }
      sectors = [...new Set(sectors)]
      anchors = [...new Set(anchors)]
      this.$refs.printLabelDialog.openDialog(
        {
          referencesSuggestion: sectors.concat(anchors),
          routeIds
        }
      )
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
            this.$t('components.gymRoute.exportedFileName', { date: this.ISODateToday(), name: this.gym.name })
          )
          link.click()
          setTimeout(() => { window.URL.revokeObjectURL(data) }, 100)
          this.routeSelected = []
        })
        .finally(() => {
          this.loadingRoutes = false
        })
    },

    openingSheetCollection () {
      if (this.routeSelected.length === 0) { return false }

      const routeIds = []
      for (const route of this.routeSelected) {
        routeIds.push(route.id)
      }
      this.$refs.openingSheetDialog.openDialog(routeIds)
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

    spaceToObject (space) {
      return new GymSpace({ attributes: space })
    },

    getGymRoute (route) {
      this.loadingGymRoute = true
      this.gymRouteDialog = true
      new GymRouteApi(this.$axios, this.$auth)
        .find(this.gym.id, route.gym_space.id, route.id)
        .then((resp) => {
          this.gymRoute = new GymRoute({ attributes: resp.data })
          this.$refs.GymRouteDialog?.signal()
        })
        .finally(() => {
          this.loadingGymRoute = false
        })
    },

    closeGymRouteModal () {
      this.gymRouteDialog = false
    }
  }
}
</script>
