<template>
  <v-card link>
    <v-row>
      <v-col
        class="pt-0 pb-0 gym-route-image-col"
      >
        <v-avatar
          class="gym-route-image"
          color="grey"
          size="70"
          tile
        >
          <v-img :src="gymRoute.thumbnailUrl()"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="pl-5 pt-0 pb-0">
        <v-row>
          <v-col class="pt-1 pb-1">
            <gym-route-tag-and-hold :gym-route="gymRoute" />
            <span class="ml-1">{{ gymRoute.name }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="gym-route-sector-col pt-0 pb-0 text--disabled">
            <v-icon small class="text--disabled">
              mdi-vector-difference-ba
            </v-icon>
            {{ gymRoute.gym_sector_name }}
          </v-col>
        </v-row>
      </v-col>
      <v-col class="pt-1 pb-0 pl-0 gym-grade-col">
        <gym-route-grade-and-point :gym-route="gymRoute" />
        <span class="text--disabled">
          <v-icon
            small
            class="ml-2 text--disabled"
          >
            mdi-check-all
          </v-icon>
          0
        </span>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
export default {
  name: 'GymRouteCardSmall',
  components: { GymRouteGradeAndPoint, GymRouteTagAndHold },
  props: {
    gymRoute: Object
  }
}
</script>
<style lang="scss" scoped>
.gym-route-image-col {
  max-width: 70px;
  .gym-route-image {
    border-radius: 4px 0 0 4px !important;
  }
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
