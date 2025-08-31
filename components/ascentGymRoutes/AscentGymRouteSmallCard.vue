<template>
  <div class="rounded-sm px-2 pb-2 pt-1 back-app-color">
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
    <ascent-gym-route-icon :gym-route="gymRoute" :ascent="ascentGymRoute" />
    <div
      v-if="ascentGymRoute.comment"
      class="mb-0"
    >
      <p class="mb-0 text-decoration-underline">
        {{ $t('models.ascentGymRoute.private_comment') }}
      </p>
      <div class="font-italic">
        {{ ascentGymRoute.comment }}
      </div>
    </div>

    <div
      v-if="ascentGymRoute.ascent_comment && ascentGymRoute.ascent_comment.body"
      class="mb-0"
    >
      <p class="mb-0 text-decoration-underline">
        {{ $t('models.ascentGymRoute.comment') }}
      </p>
      <div class="font-italic">
        {{ ascentGymRoute.ascent_comment.body }}
      </div>
    </div>

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
  </div>
</template>

<script>
import { mdiDelete, mdiLock, mdiLockOpen } from '@mdi/js'
import { DateHelpers } from '@/mixins/DateHelpers'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import EditGymAscentBtn from '@/components/ascentGymRoutes/EditGymAscentBtn'
import AscentGymRouteIcon from '~/components/ascentGymRoutes/AscentGymRouteIcon'

export default {
  name: 'AscentGymRouteSmallCard',
  components: { AscentGymRouteIcon, EditGymAscentBtn },
  mixins: [DateHelpers],
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

      mdiDelete,
      mdiLock,
      mdiLockOpen
    }
  },

  methods: {
    deleteAscent () {
      if (confirm(this.$t('actions.areYouSur'))) {
        new AscentGymRouteApi(this.$axios, this.$auth)
          .delete(this.ascentGymRoute.id)
          .then(() => {
            this.$localforage.gymRoutes.removeItem(this.gymRoute.id)
            this.$auth.fetchUser()
          })
          .catch((err) => {
            this.$root.$emit('alertFromApiError', err, 'ascentGymRoute')
          })
      }
    }
  }
}
</script>
