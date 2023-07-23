<template>
  <v-card
    flat
    class="rounded-sm"
  >
    <v-card-text>
      <div>
        {{ $t('components.ascentGymRoute.ascentMadeOn', { date: humanizeDate(ascentGymRoute.released_at) }) }}
        <v-btn
          small
          icon
          @click="deleteAscent"
        >
          <v-icon small>
            {{ mdiDelete }}
          </v-icon>
        </v-btn>
        <edit-gym-ascent-btn
          :gym-route="gymRoute"
          :ascent-gym-route="ascentGymRoute"
        />
      </div>

      <!-- Ascent status, Roping status & difficulty appreciation -->
      <ascent-gym-route-status-icon
        :gym-route="gymRoute"
        :ascent-status="ascentGymRoute.ascent_status"
      />
      {{ $t(`models.ascentStatus.${ascentGymRoute.ascent_status}`) }}

      <p class="mb-0">
        <cite v-if="ascentGymRoute.comment">
          {{ ascentGymRoute.comment }}
        </cite>
      </p>

      <div v-if="ascentGymRoute.GymRoute.sections_count > 1">
        <p
          v-if="ascentGymRoute.GymRoute.sections_count === ascentGymRoute.sections.length"
          class="text-decoration-underline mb-0"
        >
          {{ $t('components.ascentGymRoute.iMadeCountPitch', { count: ascentGymRoute.GymRoute.sections_count }) }}
        </p>
        <div v-else>
          <p class="mb-0 text-decoration-underline">
            {{ $t('components.ascentGymRoute.pitchMade') }} :
          </p>
          <ul class="list-style-none pl-3">
            <li
              v-for="(section, index) in ascentGymRoute.sections"
              :key="`ascent-section-${index}`"
            >
              <strong>L {{ section.index + 1 }} :</strong> {{ section.grade }}
            </li>
          </ul>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDelete } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import { RecordToObjectHelpers } from '@/mixins/RecordToObjectHelpers'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import AscentGymRouteStatusIcon from '@/components/ascentGymRoutes/AscentGymRouteStatusIcon'
import EditGymAscentBtn from '@/components/ascentGymRoutes/EditGymAscentBtn'

export default {
  name: 'AscentGymRouteSmallCard',
  components: { EditGymAscentBtn, AscentGymRouteStatusIcon },
  mixins: [DateHelpers, RecordToObjectHelpers],
  props: {
    ascentGymRoute: {
      type: Object,
      required: true
    },
    gymRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      ascentUserDialog: false,
      subscribes: [],
      loadingSubscribes: true,

      mdiDelete
    }
  },

  methods: {
    deleteAscent () {
      if (confirm(this.$t('actions.areYouSur'))) {
        new AscentGymRouteApi(this.$axios, this.$auth)
          .delete(this.ascentGymRoute.id)
          .then(() => {
            this.$auth.fetchUser().then(() => {
              this.$root.$emit('reloadAscentGymRoute')
            })
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'ascentGymRoute')
          })
      }
    }
  }
}
</script>
