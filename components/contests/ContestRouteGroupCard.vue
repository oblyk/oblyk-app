<template>
  <v-sheet class="rounded-sm back-app-color">
    <div class="pa-1 d-flex border-bottom mb-1">
      <p class="font-weight-bold mb-0 pt-2">
        <v-chip
          v-for="(category, categoryIndex) in routeGroup.contest_categories"
          :key="`category-index-${categoryIndex}`"
          small
          class="mx-1 vertical-align-top"
        >
          {{ category.name }}
        </v-chip> /
        <v-chip
          small
          class="mx-1 vertical-align-top"
        >
          <gender-icon :gender="routeGroup.genre_type" />
          {{ $t(`models.genres.${routeGroup.genre_type}`) }}
        </v-chip>
      </p>
      <v-spacer />
      <div>
        <v-btn
          icon
          @click="getRouteGroup"
        >
          <v-icon>
            {{ mdiRefresh }}
          </v-icon>
        </v-btn>
        <v-menu>
          <template #activator="{ on, attrs }">
            <v-btn
              :loading="loadingAction"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>
                {{ mdiDotsVertical }}
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="openEditModal()">
              <v-list-item-icon>
                <v-icon>
                  {{ mdiPencil }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('actions.edit') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="addRoute()">
              <v-list-item-icon>
                <v-icon>
                  {{ mdiPlus }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('actions.addRoute') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteGroup()">
              <v-list-item-icon>
                <v-icon>
                  {{ mdiTrashCan }}
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title class="red--text">
                {{ $t('actions.delete') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <v-dialog
      v-model="editModal"
      width="700"
    >
      <v-card>
        <v-card-title>
          {{ $t('actions.edit') }} {{ routeGroup.name }}
        </v-card-title>
        <div class="pa-4">
          <contest-route-group-form
            :contest-route-group="routeGroup"
            :contest-stage-step="contestStageStep"
            submit-methode="put"
            :contest-stage="contestStage"
            :callback="editCallback"
            :contest="contest"
            :gym="contest.gym"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- Times -->
    <div class="px-3 mb-2">
      <p class="text-decoration-underline mb-1">
        Jours & horaires de passage :
      </p>
      <div v-if="routeGroup.waveable">
        <div
          v-for="(time, timeIndex) in routeGroup.contest_time_blocks"
          :key="`time-${timeIndex}`"
        >
          <strong>{{ time.name }} :</strong>
          <v-chip
            small
            @click="openEditModal()"
          >
            {{ !contest.one_day_event ? humanizeDate(time.start_date) : null }}
            {{ humanizeDate(time.start_time, 'TIME_SIMPLE') }}
          </v-chip>
          <v-icon>
            {{ mdiArrowRightThin }}
          </v-icon>
          <v-chip
            small
            @click="openEditModal()"
          >
            {{ !contest.one_day_event ? humanizeDate(time.end_date) : null }}
            {{ humanizeDate(time.end_time, 'TIME_SIMPLE') }}
            <small class="ml-1">
              +{{ time.additional_time }} minutes
            </small>
          </v-chip>
        </div>
      </div>
      <div v-else>
        <v-chip
          small
          @click="openEditModal()"
        >
          {{ !contest.one_day_event ? humanizeDate(routeGroup.start_date) : null }}
          {{ humanizeDate(routeGroup.start_time, 'TIME_SIMPLE') }}
        </v-chip>
        <v-icon>
          {{ mdiArrowRightThin }}
        </v-icon>
        <v-chip
          small
          @click="openEditModal()"
        >
          {{ !contest.one_day_event ? humanizeDate(routeGroup.end_date) : null }}
          {{ humanizeDate(routeGroup.end_time, 'TIME_SIMPLE') }}
          <small class="ml-1">
            +{{ routeGroup.additional_time }} minutes
          </small>
        </v-chip>
      </div>
    </div>

    <p class="text-decoration-underline px-3 mb-1">
      Les {{ $t(`models.climbsContest.${contestStage.climbing_type}`) }}
    </p>
    <!-- List of routes -->
    <contest-route-line
      v-for="(route, routeIndex) in routeGroup.contest_routes"
      :key="`route-index-${routeIndex}`"
      :contest="contest"
      :contest-stage="contestStage"
      :contest-route="route"
      :contest-stage-step="contestStageStep"
      :get-route-group="getRouteGroup"
      :open-route-link="openRouteLink"
    />
    <!-- Link with gym route -->
    <v-dialog
      v-model="routeLinkModal"
      width="600"
    >
      <v-card v-if="linkedRoute">
        <v-card-title>
          Lié <v-chip class="mx-1" small v-text="linkedRoute.number" /> à une ligne du topo
        </v-card-title>
        <div class="pa-4">
          <contest-tree-route-form
            :callback="routeSelected"
            :contest="contest"
          />
        </div>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import {
  mdiRefresh,
  mdiDotsVertical,
  mdiPencil,
  mdiTrashCan,
  mdiClockStart,
  mdiClockEnd,
  mdiArrowRightThin,
  mdiPlus
} from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import ContestRouteLine from '~/components/contests/ContestRouteLine.vue'
import ContestRouteGroupApi from '~/services/oblyk-api/ContestRouteGroupApi'
import ContestRouteGroup from '~/models/ContestRouteGroup'
import ContestRouteGroupForm from '~/components/contests/forms/ContestRouteGroupForm'
import GenderIcon from '~/components/ui/GenderIcon.vue'
import ContestTreeRouteForm from '~/components/contests/forms/ContestTreeRouteForm.vue'
import ContestRouteApi from '~/services/oblyk-api/ContestRouteApi'

export default {
  name: 'ContestRouteGroupCard',
  components: { ContestTreeRouteForm, GenderIcon, ContestRouteGroupForm, ContestRouteLine },
  mixins: [DateHelpers],
  props: {
    contest: {
      type: Object,
      required: true
    },
    contestStage: {
      type: Object,
      required: true
    },
    contestStageStep: {
      type: Object,
      required: true
    },
    contestRouteGroup: {
      type: Object,
      required: true
    },
    getContestStageStep: {
      type: Function,
      required: true
    }
  },

  data () {
    return {
      routeGroup: this.contestRouteGroup,
      refreshing: false,
      loadingAction: false,
      editModal: false,
      routeLinkModal: false,
      linkedRoute: null,

      mdiRefresh,
      mdiDotsVertical,
      mdiPencil,
      mdiTrashCan,
      mdiClockStart,
      mdiClockEnd,
      mdiArrowRightThin,
      mdiPlus
    }
  },

  methods: {
    getRouteGroup () {
      this.refreshing = false
      new ContestRouteGroupApi(this.$axios, this.$auth)
        .find(
          this.contest.gym_id,
          this.contest.id,
          this.contestStage.id,
          this.contestStageStep.id,
          this.contestRouteGroup.id
        )
        .then((resp) => {
          this.routeGroup = new ContestRouteGroup({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingAction = false
          this.refreshing = false
        })
    },

    deleteGroup () {
      this.loadingAction = true
      new ContestRouteGroupApi(this.$axios, this.$auth)
        .delete(
          this.contest.gym_id,
          this.contest.id,
          this.contestStage.id,
          this.contestStageStep.id,
          this.routeGroup.id
        )
        .then(() => {
          this.getContestStageStep()
        })
        .finally(() => {
          this.loadingAction = false
        })
    },

    addRoute () {
      this.loadingAction = true
      new ContestRouteGroupApi(this.$axios, this.$auth)
        .addRoute({
          gym_id: this.contest.gym_id,
          contest_id: this.contest.id,
          contest_stage_id: this.contestStage.id,
          contest_stage_step_id: this.contestStageStep.id,
          id: this.contestRouteGroup.id
        })
        .then(() => {
          this.getRouteGroup()
        })
    },

    openEditModal () {
      this.editModal = true
    },

    editCallback () {
      this.editModal = false
      this.getRouteGroup()
    },

    openRouteLink (route) {
      this.routeLinkModal = true
      this.linkedRoute = route
    },

    routeSelected (gymRoute) {
      new ContestRouteApi(this.$axios, this.$auth)
        .linked(
          {
            gym_id: this.contest.gym_id,
            contest_id: this.contest.id,
            id: this.linkedRoute.id,
            gym_route_id: gymRoute.id
          }
        )
        .then(() => {
          this.getRouteGroup()
        })
        .finally(() => {
          this.routeLinkModal = false
        })
    }
  }
}
</script>
