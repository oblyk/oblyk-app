<template>
  <DownToCloseDialog
    ref="dialog"
    v-model="isOpen"
    wait-signal
  >
    <div class="gym-route-title d-flex flex-row">
      <gym-route-tag-and-hold
        :size="40"
        :gym-route="gymRoute"
        class="flex-grow-0"
      />
      <div class="d-flex flex-column flex-grow-1">
        <h3 v-if="gymRoute.name" class="d-flex flex-row text-h5">
          <small
            v-if="gymRoute.grade_to_s"
          >
            {{ gymRoute.grade_to_s }}
          </small>
          <span class="flex-grow-1 flex-shrink-1">{{ gymRoute.name }}</span>

          <div class="flex-grow-0 flex-shrink-0">
            <v-btn
              icon
              large
              @click="close()"
            >
              <v-icon large>
                {{ mdiClose }}
              </v-icon>
            </v-btn>
          </div>
        </h3>
        <div>
          <small
            v-if="gymRoute.anchor_number"
            class="text--disabled d-block mt-n1 font-weight-regular"
          >
            {{ $t('models.gymRoute.anchor_number') }}{{ gymRoute.anchor_number }}
          </small>

          <small
            v-if="gymRoute.gym_sector_name"
          >
            {{ gymRoute.gym_space_name }}
          </small>
          <small
            v-if="gymRoute.gym_sector_name"
          >
            {{ gymRoute.gym_sector_name }}
          </small>
        </div>
      </div>
    </div>

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
  </DownToCloseDialog>
</template>

<script>
import { mdiClose } from '@mdi/js'
import GymRouteTagAndHold from './partial/GymRouteTagAndHold.vue'
import AscentGymRouteHardnessIcon from '@/components/ascentGymRoutes/AscentGymRouteHardnessIcon.vue'
import AscentGymRouteIcon from '@/components/ascentGymRoutes/AscentGymRouteIcon.vue'
import DownToCloseDialog from '@/components/ui/DownToCloseDialog.vue'
import GymRouteApi from '~/services/oblyk-api/GymRouteApi'
import AscentGymRoute from '@/models/AscentGymRoute'
import { DateHelpers } from '~/mixins/DateHelpers'

export default {
  name: 'GymRouteAscentsDialog',
  components: {
    DownToCloseDialog,
    GymRouteTagAndHold,
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
      isLoading: mdiTrumpet,
      mdiClose
    }
  },

  methods: {
    open () {
      this.isOpen = true
      this.load()
      this.$refs.dialog.signal()
    },
    close () {
      this.isOpen = false
      this.$refs.dialog.signal()
    },
    load () {
      this.isLoading = true
      this.ascents = []
      new GymRouteApi(this.$axios, this.$auth)
        .routeAscents(this.gym.id, this.gymRoute.id)
        .then((resp) => {
          this.ascents = resp.data.filter(ascent => ascent.ascent_status !== 'project')
            .map(attributes => new AscentGymRoute({ attributes }))
            .reverse()
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }

}

</script>

<style lang="scss" scoped>
.gym-route-title {
  .name-and-grade {
    font-size: 1.1em;
    font-weight: bold;
  }
}
</style>
