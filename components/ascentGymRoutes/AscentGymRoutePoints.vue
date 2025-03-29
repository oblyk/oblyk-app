<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(ascent, ascentIndex) in ascents"
        :key="`ascent-index-${ascentIndex}`"
        :class="ascent.gym_route.attachments.thumbnail.attached ? 'pl-0' : ''"
      >
        <v-list-item-avatar
          v-if="ascent.gym_route.attachments.thumbnail.attached"
          class="my-0"
          height="72"
          width="72"
          rounded
        >
          <v-img
            height="72"
            width="72"
            :src="imageVariant(ascent.gym_route.attachments.thumbnail, { fit: 'crop', height: 100, width: 100 })"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <div class="align-self-center d-flex pr-4 ml-3">
            <gym-route-tag-and-hold
              :gym-route="ascent.gym_route"
              :size="35"
              style="margin-top: 5px"
            />
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
              <ascent-gym-route-icon :ascent="ascent" />
              <div class="mt-1">
                <strong>+ {{ ascent.points.score.toLocaleString() }} points</strong>
              </div>
              <div v-if="ascent.points.multiplier !== 1">
                <small class="text--disabled">
                  {{ ascent.points.base.toLocaleString() }} points x {{ ascent.points.multiplier.toLocaleString() }}
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
import { ImageVariantHelpers } from '~/mixins/ImageVariantHelpers'
import AscentGymRouteApi from '~/services/oblyk-api/AscentGymRouteApi'
import AscentGymRoute from '~/models/AscentGymRoute'
import GymRouteTagAndHold from '~/components/gymRoutes/partial/GymRouteTagAndHold.vue'
import AscentGymRouteIcon from '~/components/ascentGymRoutes/AscentGymRouteIcon.vue'
import LoadingMore from '~/components/layouts/LoadingMore.vue'

export default {
  name: 'AscentGymRoutePoints',
  components: { LoadingMore, AscentGymRouteIcon, GymRouteTagAndHold },
  mixins: [LoadingMoreHelpers, ImageVariantHelpers],
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
        params.start_date = this.toDateTime(this.date).startOf('month')
        params.end_date = this.toDateTime(this.date).endOf('month')
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
