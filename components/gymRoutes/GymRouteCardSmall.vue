<template>
  <v-card
    link
    :class="`placement-${placement}`"
    class="gym-route-small-card"
    @click="callback"
  >
    <v-row class="mb-4">
      <v-col
        class="pt-0 pb-0 gym-route-image-col"
      >
        <v-avatar
          class="gym-route-image"
          color="light"
          size="70"
          tile
        >
          <v-img :src="gymRoute.thumbnailUrl" />
        </v-avatar>
      </v-col>
      <v-col class="pb-0 pt-4 pl-5">
        <v-row>
          <v-col class="pt-1 pb-1 text-truncate">
            <gym-route-tag-and-hold :gym-route="gymRoute" />
            <span class="ml-1">
              {{ gymRoute.name }}
            </span>
            <note
              v-if="gymRoute.note"
              :note="gymRoute.note"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="gym-route-sector-col pt-0 pb-0 text--disabled">
            <v-icon small class="text--disabled">
              {{ mdiVectorDifferenceBa }}
            </v-icon>
            {{ gymRoute.gym_sector_name }}
          </v-col>
        </v-row>
      </v-col>
      <v-col class="pb-0 pl-0 gym-grade-col text-center">
        <gym-route-grade-and-point :gym-route="gymRoute" />
        <span class="text--disabled">
          <v-icon
            small
            class="ml-2 text--disabled"
          >
            {{ mdiCheckAll }}
          </v-icon>
          {{ gymRoute.ascents_count || 0 }}
          <ascent-gym-route-status-icon :gym-route="gymRoute" />
        </span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiVectorDifferenceBa, mdiCheckAll } from '@mdi/js'
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
import AscentGymRouteStatusIcon from '@/components/ascentGymRoutes/AscentGymRouteStatusIcon'
import Note from '@/components/notes/Note'

export default {
  name: 'GymRouteCardSmall',
  components: { Note, AscentGymRouteStatusIcon, GymRouteGradeAndPoint, GymRouteTagAndHold },
  props: {
    gymRoute: {
      type: Object,
      required: true
    },
    placement: {
      type: String,
      default: null
    },
    callback: {
      type: Function,
      default: null
    }
  },

  data () {
    return {
      mdiVectorDifferenceBa,
      mdiCheckAll
    }
  }
}
</script>
<style lang="scss" scoped>
.placement-first {
  border-radius: 6px 6px 0 0;
  .gym-route-image-col .gym-route-image {
    border-radius: 6px 0 0 0 !important;
  }
}
.placement-last {
  border-radius: 0 0 6px 6px;
  .gym-route-image-col .gym-route-image {
    border-radius: 0 0 0 6px !important;
  }
}
.placement-middle {
  border-radius: 0;
}
.placement-unique {
  border-radius: 6px;
  .gym-route-image-col .gym-route-image {
    border-radius: 6px 0 0 6px !important;
  }
}

.gym-route-image-col {
  max-width: 70px;
}
.gym-grade-tag-and-hold-col {
  max-width: 85px;
  white-space: nowrap;
}
.gym-grade-col {
  max-width: 100px;
}
.gym-route-sector-col {
  font-size: 0.8em;
}
.v-application {
  &.theme--dark {
    .gym-route-small-card {
      margin-top: 1px;
    }
    .gym-grade-col {
      border-left-color: #4b4b4b;
    }
  }
  &.theme--light {
    .gym-grade-col {
      border-left-color: #e0e0e0;
    }
  }
}
</style>
