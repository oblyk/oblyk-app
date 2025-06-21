<template>
  <v-card>
    <v-card-title class="d-flex">
      <div>
        Ligne n°{{ contestRoute.number }}
      </div>
      <v-btn
        class="ml-auto"
        icon
        @click="closeModalCallback()"
      >
        <v-icon>
          {{ mdiClose }}
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <p class="mt-2 mb-1 font-weight-bold">
        Information sur la ligne :
      </p>
      <div class="d-flex border rounded">
        <contest-route-avatar
          :contest-route="contestRoute"
          :size="100"
        />
        <div class="pa-2">
          <div>
            Nom :
            <strong v-if="contestRoute.name">{{ contestRoute.name }}</strong>
            <cite
              v-else
              class="text--disabled"
            >
              Pas de nom
            </cite>
          </div>
          <div v-if="showFixedPoints">
            Points : <strong>{{ contestRoute.fixed_points }}</strong>
          </div>
          <div v-if="showHighestHold">
            Nombre de prise : <strong>{{ contestRoute.number_of_holds }}</strong>
          </div>
          <div v-if="contestRoute.ranking_type === 'division_and_zone'">
            À une zone : <strong>{{ contestRoute.additional_zone ? 'oui' : 'non' }}</strong>
          </div>
          <div v-if="contestRoute.disabled_at">
            Éxclue du contest à : <strong>{{ contestRoute.disabled_at }}</strong>
          </div>
          <gym-route-simple-item
            v-if="contestRoute.gym_route_id"
            :gym-route="contestRoute.gym_route"
            class="mt-1"
          />
        </div>
      </div>
      <div class="mt-4">
        <p class="mb-1 font-weight-bold">
          Liste des ascensions :
        </p>
        <v-text-field
          v-model="queryParticipant"
          label="Chercher un·e participant·e"
          outlined
          dense
          hide-details
          :prepend-inner-icon="mdiMagnify"
        />
        <v-data-table
          class="border rounded mt-2"
          :loading="loadingAscents"
          :headers="participantsHeaders"
          :items="participantsItems"
          :items-per-page="-1"
          :search="queryParticipant"
          dense
        >
          <template v-slot:[`item.zone`]="{ item }">
            <v-icon :color="item.zone ? 'green' : 'red'">
              {{ item.zone ? mdiCheckboxMarked : mdiCheckboxBlank }}
            </v-icon>
          </template>
          <template v-slot:[`item.top`]="{ item }">
            <v-icon :color="item.top ? 'green' : 'red'">
              {{ item.top ? mdiCheckboxMarked : mdiCheckboxBlank }}
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiMagnify, mdiClose, mdiCheckboxMarked, mdiCheckboxBlank } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import ContestRouteAvatar from '~/components/contests/ContestRouteAvatar'
import GymRouteSimpleItem from '~/components/gymRoutes/GymRouteItem'
import ContestParticipantAscentApi from '~/services/oblyk-api/ContestParticipantAscentApi'

export default {
  name: 'ContestRouteCard',
  components: { GymRouteSimpleItem, ContestRouteAvatar },
  mixins: [DateHelpers],
  props: {
    contestRoute: {
      type: Object,
      required: true
    },
    closeModalCallback: {
      type: Function,
      default: null
    },
    contest: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingAscents: false,
      ascents: [],
      queryParticipant: null,

      mdiMagnify,
      mdiClose,
      mdiCheckboxMarked,
      mdiCheckboxBlank
    }
  },

  computed: {
    showFixedPoints () {
      return ['fixed_points', 'point_relative_to_highest_hold'].includes(this.contestRoute.ranking_type)
    },

    showHighestHold () {
      return ['highest_hold', 'point_relative_to_highest_hold'].includes(this.contestRoute.ranking_type)
    },

    participantsHeaders () {
      const headers = [
        {
          text: 'Nom',
          align: 'start',
          sortable: true,
          value: 'last_name'
        },
        {
          text: 'Prénom',
          align: 'start',
          sortable: true,
          value: 'first_name'
        }
      ]
      if (['division_and_zone', 'zone_and_top_realised', 'attempts_to_one_zone_and_top'].includes(this.contestRoute.ranking_type)) {
        if (this.contestRoute.additional_zone || ['zone_and_top_realised', 'attempts_to_one_zone_and_top'].includes(this.contestRoute.ranking_type)) {
          headers.push({
            text: 'Zone',
            align: 'start',
            sortable: true,
            value: 'zone'
          })
        }
      }
      if (['attempts_to_one_zone_and_top'].includes(this.contestRoute.ranking_type)) {
        headers.push({
          text: 'Zone : nb. essais',
          align: 'start',
          sortable: true,
          value: 'zone_attempt'
        })
      }
      if ([
        'division',
        'division_and_zone',
        'division_and_attempt',
        'attempts_to_top',
        'zone_and_top_realised',
        'attempts_to_one_zone_and_top',
        'fixed_points'
      ].includes(this.contestRoute.ranking_type)) {
        headers.push({
          text: 'Top',
          align: 'start',
          sortable: true,
          value: 'top'
        })
      }
      if (['division_and_attempt', 'attempts_to_top', 'attempts_to_one_zone_and_top'].includes(this.contestRoute.ranking_type)) {
        headers.push({
          text: 'Top : nb. essais',
          align: 'start',
          sortable: true,
          value: 'top_attempt'
        })
      }
      if (['best_times'].includes(this.contestRoute.ranking_type)) {
        headers.push({
          text: 'Temps',
          align: 'start',
          sortable: true,
          value: 'ascent_time'
        })
      }
      if (['point_relative_to_highest_hold', 'highest_hold'].includes(this.contestRoute.ranking_type)) {
        headers.push({
          text: 'Prise atteinte',
          align: 'start',
          sortable: true,
          value: 'hold_number'
        })
      }
      return headers
    },

    participantsItems () {
      const items = []
      for (const ascent of this.ascents) {
        const item = {
          last_name: ascent.contest_participant.last_name.toUpperCase(),
          first_name: ascent.contest_participant.first_name
        }
        if (['division_and_zone'].includes(this.contestRoute.ranking_type)) {
          item.zone = ascent.zone_1_attempt === 1 || ascent.top_attempt === 1
        }
        if (['division_and_attempt', 'division_and_zone', 'division', 'attempts_to_top', 'fixed_points'].includes(this.contestRoute.ranking_type)) {
          item.top = ascent.realised || ascent.top_attempt === 1
        }
        if (['division_and_attempt', 'attempts_to_top'].includes(this.contestRoute.ranking_type)) {
          item.top_attempt = ascent.top_attempt
        }
        if (['point_relative_to_highest_hold', 'highest_hold'].includes(this.contestRoute.ranking_type)) {
          item.hold_number = ascent.hold_number
        }
        if (['zone_and_top_realised'].includes(this.contestRoute.ranking_type)) {
          item.zone = ascent.zone_1_attempt === 1 || ascent.top_attempt === 1
          item.top = ascent.top_attempt
        }
        if (['attempts_to_one_zone_and_top'].includes(this.contestRoute.ranking_type)) {
          item.top = ascent.top_attempt > 0
          item.zone = ascent.zone_1_attempt > 0
          item.top_attempt = ascent.top_attempt
          item.zone_attempt = ascent.zone_1_attempt
        }
        if (['best_times'].includes(this.contestRoute.ranking_type)) {
          const time = ascent.ascent_time ? this.humanizeDate(ascent.ascent_time, "mm'm' ss's' SSS'ms'") : '-'
          item.ascent_time = time !== '00m 00s 000ms' ? time : '-'
        }
        items.push(item)
      }
      return items
    }
  },

  mounted () {
    this.getAscents()
  },

  methods: {
    getAscents () {
      this.loadingAscents = true
      new ContestParticipantAscentApi(this.$axios, this.$auth)
        .all(this.contest.gym_id, this.contest.id, this.contestRoute.id)
        .then((resp) => {
          this.ascents = resp.data
        })
        .finally(() => {
          this.loadingAscents = false
        })
    }
  }
}
</script>
