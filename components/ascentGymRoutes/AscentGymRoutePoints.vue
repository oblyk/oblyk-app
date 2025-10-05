<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(ascent, ascentIndex) in ascents"
        :key="`ascent-index-${ascentIndex}`"
        class="px-0"
      >
        <v-list-item-avatar
          class="my-0"
          size="72"
          rounded
        >
          <gym-route-avatar :gym-route="ascent.gym_route" />
        </v-list-item-avatar>
        <v-list-item-content>
          <div class="align-self-center d-flex">
            <div class="ml-1" style="padding-top: 1px">
              <div>
                <strong
                  v-if="ascent.gym_route.grade_to_s"
                  class="font-weight-bold"
                >
                  {{ ascent.gym_route.grade_to_s }},
                </strong>
                {{ ascent.gym_route.name }}
              </div>
              <div style="font-size: 0.75em">
                {{ ascent.gym_route.gym_space.name }}, {{ ascent.gym_route.gym_sector_name }}
                <div class="d-inline-block rounded border py-0 px-1">
                  <v-icon
                    small
                    class="vertical-align-text-bottom"
                  >
                    {{ mdiCheckAll }}
                  </v-icon>
                  {{ ascent.gym_route.ascents_count }}
                </div>
              </div>
            </div>
            <div class="ml-auto text-right">
              <ascent-gym-route-icon
                :ascent="ascent"
                :with-label="false"
              />
              <div class="mt-1 text-no-wrap">
                <strong>+ {{ ascent.points.score.toLocaleString() }} pts</strong>
              </div>
              <div v-if="ascent.points.multiplier !== 1">
                <small class="text--disabled text-no-wrap">
                  {{ ascent.points.base.toLocaleString() }} pts x {{ ascent.points.multiplier.toLocaleString() }}
                </small>
              </div>
            </div>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <loading-more
      :get-function="getAscents"
      :loading-more="loadingMoreData"
      :no-more-data="noMoreDataToLoad"
      skeleton-type="list-item-avatar,list-item-avatar,list-item-avatar"
    />
  </div>
</template>
<script>
import { mdiCheckAll } from '@mdi/js'
import { LoadingMoreHelpers } from '~/mixins/LoadingMoreHelpers'
import { DateHelpers } from '~/mixins/DateHelpers'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import AscentGymRoute from '~/models/AscentGymRoute'
import AscentGymRouteIcon from '~/components/ascentGymRoutes/AscentGymRouteIcon'
import LoadingMore from '~/components/layouts/LoadingMore'
import GymRouteAvatar from '~/components/gymRoutes/GymRouteAvatar'

export default {
  name: 'AscentGymRoutePoints',
  components: { GymRouteAvatar, LoadingMore, AscentGymRouteIcon },
  mixins: [LoadingMoreHelpers, DateHelpers],
  props: {
    climbingType: {
      type: String,
      default: ''
    },
    scoreAndUser: {
      type: Object,
      required: true
    },
    gym: {
      type: Object,
      required: true
    },
    signalCallback: {
      type: Function,
      default: null
    },
    date: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      ascents: [],
      firstLoadingAscents: true,

      mdiCheckAll
    }
  },

  watch: {
    climbingType () {
      this.ascents = []
      this.resetLoadMorePageNumber()
      this.firstLoadingAscents = true
      this.getAscents()
    }
  },

  mounted () {
    this.getAscents()
  },

  methods: {
    getAscents () {
      this.moreIsBeingLoaded()
      const params = {
        user_uuid: this.scoreAndUser.user.uuid,
        climbing_type: this.climbingType,
        gym_id: this.gym.id,
        page: this.page
      }

      if (this.date !== 'opened') {
        params.start_date = this.toDateTime(this.date).startOf('month').toISODate()
        params.end_date = this.toDateTime(this.date).endOf('month').toISODate()
      }

      new AscentGymRouteApi(this.$axios, this.$auth)
        .points(params)
        .then((resp) => {
          for (const ascent of resp.data) {
            this.ascents.push(new AscentGymRoute({ attributes: ascent }))
          }
          this.successLoadingMore(resp)
        })
        .catch(() => {
          this.failureToLoadingMore()
        })
        .finally(() => {
          if (this.firstLoadingAscents) {
            this.signalCallback()
          }
          this.firstLoadingAscents = false
          this.finallyMoreIsLoaded()
        })
    }
  }
}
</script>
