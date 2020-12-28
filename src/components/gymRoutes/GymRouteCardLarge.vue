<template>
  <div>
    <spinner v-if="loadingRoute" :full-height="false" />

    <v-card color="mt-5 mb-5" v-if="!loadingRoute">
      <v-img
        height="550"
        :src="gymRoute.pictureUrl()"
        gradient="to bottom, rgba(0, 0, 0, 0.5) 0%, transparent 100px"
      >
        <p class="pt-2 pr-2 pl-1">
          <gym-route-action-menu :gym-route="gymRoute" />

          <v-btn
            @click="changeCardSize()"
            icon
            large
            dark
            class="float-right"
          >
            <v-icon large>
              mdi-close
            </v-icon>
          </v-btn>
        </p>
      </v-img>
      <v-row>
        <v-col class="gym-tag-large-col pr-0">
          <gym-route-tag-and-hold :gym-route="gymRoute" />
        </v-col>
        <v-col>
          <strong>
            {{ gymRoute.name }}
          </strong>
        </v-col>
        <v-col class="gym-grade-large-col text-center pl-0">
          <gym-route-grade-and-point :gym-route="gymRoute"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0">
          <div class="gym-route-more-information-row">
            <v-col>
              coucou je suis plus d'information
            </v-col>
          </div>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn
          right
          color="primary"
          text
        >
          <v-icon left>
            mdi-check
          </v-icon>
          Ajouter à mon carnet
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import GymRouteTagAndHold from '@/components/gymRoutes/partial/GymRouteTagAndHold'
import GymRouteGradeAndPoint from '@/components/gymRoutes/partial/GymRouteGradeAndPoint'
import GymRouteActionMenu from '@/components/gymRoutes/partial/GymRouteActionMenu'
import Spinner from '@/components/layouts/Spiner'
import GymRoute from '@/models/GymRoute'

export default {
  name: 'GymRouteCardLarge',
  components: { Spinner, GymRouteActionMenu, GymRouteGradeAndPoint, GymRouteTagAndHold },
  props: {
    gymRouteProp: Object,
    changeCardSize: Function
  },
  data () {
    return {
      loadingRoute: true,
      gymRoute: null
    }
  },

  mounted () {
    this.getRoute()
  },

  methods: {
    getRoute () {
      this.loadingRoute = true
      new GymRoute()
        .find(
          this.gymRouteProp.gym.id,
          this.gymRouteProp.gym_space.id,
          this.gymRouteProp.id
        )
        .then((resp) => {
          this.gymRoute = resp
        })
        .catch((err) => {
          console.error(err)
        }).finally(() => {
          this.loadingRoute = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.gym-route-more-information-row {
  border-top-style: solid;
  border-width: 1px;
}
.gym-tag-large-col {
  max-width: 75px;
}
.gym-grade-large-col {
  border-left-style: solid;
  border-width: 1px;
  max-width: 100px;
}
.v-application {
  &.theme--dark {
    .gym-grade-large-col, .gym-route-more-information-row {
      border-color: #4b4b4b;
    }
  }
  &.theme--light {
    .gym-grade-large-col, .gym-route-more-information-row {
      border-color: #e0e0e0;
    }
  }
}
</style>
