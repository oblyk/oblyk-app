<template>
  <v-card class="rounded-lg full-height">
    <v-card-title>
      <h2 class="h2-title-in-card-title">
        <v-icon left>
          {{ mdiAccountGroup }}
        </v-icon>
        {{ $t('components.partner.around') }}
      </h2>
    </v-card-title>
    <v-card-text>
      <!-- Loading climbers -->
      <div v-if="loadingClimber">
        <v-skeleton-loader
          class="d-inline-block mr-2"
          type="avatar, text"
          width="50"
        />
        <v-skeleton-loader
          class="d-inline-block mr-2"
          type="avatar, text"
          width="50"
        />
        <v-skeleton-loader
          class="d-inline-block"
          type="avatar, text"
          width="50"
        />
      </div>

      <!-- Climbers list -->
      <div v-else>
        <div v-if="climbers.length > 0">
          <v-card
            v-for="(climber, index) in limitedClimbers"
            :key="`around-climber-${index}`"
            class="d-inline-block text-center mb-2 pa-1 pt-2 text-center light-primary-hoverable"
            style="width: 80px"
            :to="climber.path"
            elevation="0"
          >
            <v-avatar size="40">
              <v-img :src="climber.thumbnailAvatarUrl" />
            </v-avatar>
            <p class="text-truncate mb-0">
              {{ climber.first_name }}
            </p>
          </v-card>
          <v-card
            v-if="(climbers.length - limit) > 0"
            class="d-inline-block text-center mb-2 pa-1 pt-2 text-center light-primary-hoverable"
            style="width: 75px"
            elevation="0"
            @click="limit = climbers.length"
          >
            <v-avatar size="40">
              <span class="font-weight-bold">
                +{{ (climbers.length - limit) }}
              </span>
            </v-avatar>
            <p class="text-truncate mb-0 text--disabled">
              {{ $t('common.seeMore') }}
            </p>
          </v-card>
        </div>
        <div
          v-else
          class="text-center"
        >
          <p
            class="text--disabled"
            v-html="$t('components.partner.noClimbers')"
          />
          <v-btn
            text
            color="primary"
            small
            to="/about/partner-search"
          >
            {{ $t('common.pages.partner.title') }}
          </v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAccountGroup, mdiMap } from '@mdi/js'
import PartnerApi from '~/services/oblyk-api/PartnerApi'
import User from '@/models/User'

export default {
  name: 'ClimbersAround',
  props: {
    latitude: {
      type: [Number, String],
      required: true
    },
    longitude: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      climbersDialog: false,
      limit: 9,
      loadingClimber: true,
      distance: 15,
      climbers: [],

      mdiAccountGroup,
      mdiMap
    }
  },

  computed: {
    limitedClimbers () {
      const climbers = []
      let loop = 0
      for (const climber of this.climbers) {
        loop++
        if (loop > this.limit) { continue }
        climbers.push(climber)
      }
      return climbers
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
