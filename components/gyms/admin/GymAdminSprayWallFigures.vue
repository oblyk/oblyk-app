<template>
  <v-card class="full-height d-flex flex-column justify-space-between">
    <v-card-title>
      <v-icon left>
        {{ oblykSprayWall }}
      </v-icon>
      Spray Walls
      <indoor-subscription-up-btn
        v-if="gym.plan !== 'full_package'"
        :gym="gym"
      />
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7 d-flex justify-space-around">
      <div>
        <p class="big-font-size font-weight-bold">
          {{ sprayWalls.length }}
        </p>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        elevation="0"
        color="primary"
        :to="`${gym.adminPath}/spray-walls`"
      >
        {{ $t('components.gymAdmin.sprayWalls') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { oblykSprayWall } from '~/assets/oblyk-icons'
import IndoorSubscriptionUpBtn from '~/components/indoorSubscription/IndoorSubscriptionUpBtn.vue'
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'GymAdminSprayWallsFigures',
  components: { IndoorSubscriptionUpBtn },
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      loadingSprayWalls: true,
      sprayWalls: [],

      oblykSprayWall
    }
  },

  created () {
    if (this.gym.plan !== 'free') {
      this.getSprayWalls()
    } else {
      this.loadingSprayWalls = false
    }
  },

  methods: {
    getSprayWalls () {
      this.loadingSprayWalls = true
      new OblykApi(this.$axios, this.$auth)
        .get(`/gyms/${this.gym.id}/spray_walls`)
        .then((resp) => { this.sprayWalls = resp.data })
        .finally(() => {
          this.loadingSprayWalls = false
        })
    }
  }
}
</script>
