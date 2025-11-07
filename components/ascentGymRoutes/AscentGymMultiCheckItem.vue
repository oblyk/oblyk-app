<template>
  <div class="d-flex mb-2 back-app-color rounded pa-1 align-center">
    <div style="min-width: 72px">
      <gym-route-avatar :gym-route="gymRoute" />
    </div>
    <div class="ml-1 flex-grow-1">
      <div class="d-flex mb-1">
        <like-btn
          :likeable-id="gymRoute.id"
          likeable-type="GymRoute"
          :small="false"
        />
        <div class="rounded-pill sheet-background-color mx-1">
          <v-menu>
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  {{ ascentStatusIcons[ascent.ascent_status] }}
                </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(status, statusIndex) in statusListForRoutes()"
                :key="`status-index-${statusIndex}-${ascent.gym_route_id}`"
                @click="setAscentStatus(status)"
              >
                <v-list-item-icon>
                  <v-icon>
                    {{ ascentStatusIcons[status] }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                  {{ $t(`models.ascentStatus.${status}`) }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="rounded-pill sheet-background-color">
          <v-btn
            icon
            :outlined="ascent.hardness_status === 'easy_for_the_grade'"
            color="#743ad5"
            @click="setHardnessStatus('easy_for_the_grade')"
          >
            😎
          </v-btn>
          <v-btn
            icon
            :outlined="ascent.hardness_status === 'this_grade_is_accurate'"
            color="#743ad5"
            @click="setHardnessStatus('this_grade_is_accurate')"
          >
            👌
          </v-btn>
          <v-btn
            icon
            :outlined="ascent.hardness_status === 'sandbagged'"
            color="#743ad5"
            @click="setHardnessStatus('sandbagged')"
          >
            🥵
          </v-btn>
          <v-btn
            v-if="ascent.hardness_status !== null"
            icon
            @click="setHardnessStatus(null)"
          >
            <v-icon>
              {{ mdiClose }}
            </v-icon>
          </v-btn>
        </div>
      </div>
      <v-textarea
        v-model="ascent.ascent_comment.body"
        rows="1"
        dense
        :label="$t('components.ascentCragRoute.myCommentaire')"
        outlined
        hide-details
        @input="emit()"
      />
    </div>
  </div>
</template>
<script>
import { mdiClose, mdiAutorenew, mdiEye, mdiFlash, mdiRecordCircle } from '@mdi/js'
import GymRouteAvatar from '~/components/gymRoutes/GymRouteAvatar'
import LikeBtn from '~/components/forms/LikeBtn'

export default {
  name: 'AscentGymMultiCheckItem',
  components: {
    LikeBtn,
    GymRouteAvatar
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    repetitionRouteIds: {
      type: Array,
      required: true
    },
    gymRoute: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      ascent: this.value,

      ascentStatusIcons: {
        red_point: mdiRecordCircle,
        flash: mdiFlash,
        onsight: mdiEye,
        repetition: mdiAutorenew
      },

      mdiClose
    }
  },

  methods: {
    statusListForRoutes () {
      if (this.repetitionRouteIds.includes(this.ascent.gym_route_id)) {
        return ['repetition']
      } else {
        return ['red_point', 'flash', 'onsight']
      }
    },

    setHardnessStatus (hardnessStatus) {
      this.ascent.hardness_status = hardnessStatus
      this.emit()
    },

    setAscentStatus (status) {
      this.ascent.ascent_status = status
      this.emit()
    },

    emit () {
      this.$emit('input', this.ascent)
    }
  }
}
</script>
