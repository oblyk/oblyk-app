<template>
  <div v-if="!loadingClimber">
    <v-card-title>
      <v-icon left>
        {{ mdiAccountGroup }}
      </v-icon>
      {{ $tc('components.partner.xAround', climbers.length, { count: climbers.length }) }}
    </v-card-title>
    <v-card-text
      class="hoverable"
      @click="climbersDialog = true"
    >
      <div
        v-for="(climber, index) in climbers"
        :key="`around-climber-${index}`"
        class="d-inline"
      >
        <v-avatar
          v-if="index < limit"
          class="mr-2 mb-1"
          size="40"
        >
          <v-img :src="climber.thumbnailAvatarUrl" />
        </v-avatar>
      </div>
      <v-avatar
        v-if="(climbers.length - limit) > 0"
        size="40"
      >
        <span class="font-weight-bold">
          +{{ (climbers.length - limit) }}
        </span>
      </v-avatar>
    </v-card-text>

    <v-dialog
      v-model="climbersDialog"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">
          {{ $tc('components.partner.xAround', climbers.length, { count: climbers.length }) }}
        </v-card-title>
        <v-card-text>
          <user-small-card
            v-for="(user, index) in climbers"
            :key="`users-${index}`"
            :small="true"
            :user="user"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            small
            @click="climbersDialog = false"
          >
            {{ $t('common.close') }}
          </v-btn>
          <v-btn
            text
            color="primary"
            :to="`/maps/climbers?lat=${latitude}&lng=${longitude}&zoom=12`"
          >
            <v-icon class="mr-2">
              {{ mdiMap }}
            </v-icon>
            {{ $t('components.user.openClimbersMap') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiAccountGroup, mdiMap } from '@mdi/js'
import PartnerApi from '~/services/oblyk-api/PartnerApi'
import User from '@/models/User'
import UserSmallCard from '@/components/users/UserSmallCard'

export default {
  name: 'ClimbersAround',
  components: { UserSmallCard },
  props: {
    latitude: [Number, String],
    longitude: [Number, String]
  },

  data () {
    return {
      mdiAccountGroup,
      mdiMap,
      climbersDialog: false,
      limit: 8,
      loadingClimber: true,
      distance: 15,
      climbers: []
    }
  },

  mounted () {
    this.getPartnersAround()
  },

  methods: {
    getPartnersAround () {
      this.loadingClimber = true
      new PartnerApi(this.$axios, this.$auth)
        .partnersAround(
          this.latitude,
          this.longitude,
          this.distance
        )
        .then((resp) => {
          this.climbers = []
          for (const user of resp.data) {
            this.climbers.push(new User({ attributes: user }))
          }
        })
        .finally(() => {
          this.loadingClimber = false
        })
    }
  }
}
</script>
