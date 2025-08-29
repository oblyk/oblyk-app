<template>
  <DownToCloseDialog
    ref="dialog"
    v-model="isOpen"
    wait-signal
  >
    <h3 class="text-h6">
      {{ $t('models.gymRoute.ascents') }}
    </h3>

    <p
      v-if="isLoading"
      class="py-5 text-center"
    >
      {{ $t('common.loading') }}
    </p>
    <div
      v-else
      class="pt-4"
    >
      <div
        v-for="(ascent, ascentIndex) in ascents"
        :key="`ascent-index-${ascentIndex}`"
        class="border pa-2 rounded mb-2"
      >
        <p class="d-flex flex-row mb-0">
          <nuxt-link
            class="text-decoration-none"
            :to="`/climbers/${ascent.user.slug_name}`"
          >
            {{ ascent.user.full_name }}
          </nuxt-link>
          <span class="grow" />
          <time :datetime="ascent.released_at">
            {{ $t('common.at') }} {{ humanizeDate(ascent.released_at) }}
          </time>
        </p>
        <p class="mb-0">
          <ascent-gym-route-icon
            :gym-route="ascent.gym_route"
            :ascent="ascent"
          />

          <AscentGymRouteHardnessIcon :ascent="ascent" />
        </p>
        <p
          v-if="ascent.ascent_comment"
          class="mb-0 mt-1 font-italic"
        >
          {{ ascent.ascent_comment.body }}
        </p>
      </div>
    </div>
    <gym-create-your-account v-if="!$auth.loggedIn" />
  </DownToCloseDialog>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { DateHelpers } from '~/mixins/DateHelpers'
import AscentGymRouteHardnessIcon from '@/components/ascentGymRoutes/AscentGymRouteHardnessIcon'
import AscentGymRouteIcon from '@/components/ascentGymRoutes/AscentGymRouteIcon'
import DownToCloseDialog from '@/components/ui/DownToCloseDialog'
import GymCreateYourAccount from '~/components/gyms/GymCreateYourAccount'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import AscentGymRoute from '@/models/AscentGymRoute'

export default {
  name: 'GymRouteAscentsDialog',
  components: {
    GymCreateYourAccount,
    DownToCloseDialog,
    AscentGymRouteIcon,
    AscentGymRouteHardnessIcon
  },
  mixins: [DateHelpers],

  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      required: true
    }
  },

  /**
   * @returns {{
   *  isOpen: boolean,
   *  ascents: AscentGymRoute[],
   *  isLoading: boolean
   * }}
   */
  data () {
    return {
      isOpen: false,
      ascents: [],
      isLoading: true,
      mdiClose
    }
  },

  methods: {
    async open () {
      this.isOpen = true
      await this.load()
      this.$refs.dialog.signal()
    },

    close () {
      this.isOpen = false
    },

    async load () {
      if (!this.$auth.loggedIn) {
        this.isLoading = false
        return false
      }
      this.isLoading = true
      this.ascents = []
      try {
        const resp = await new GymRouteApi(this.$axios, this.$auth)
          .routeAscents(this.gym.id, this.gymRoute.id)
        this.ascents = resp.data.filter(ascent => ascent.ascent_status !== 'project')
          .map(attributes => new AscentGymRoute({ attributes }))
          .reverse()
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
