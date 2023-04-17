<template>
  <div>
    <h3 class="mb-2">
      <v-icon
        class="mr-2 mb-2"
      >
        {{ mdiAccountMultipleCheckOutline }}
      </v-icon>
      {{ $t('components.user.myPartnerSearch') }}
    </h3>
    <v-sheet class="rounded pa-4">
      <v-row>
        <v-col cols="12" md="4" lg="2">
          <v-sheet
            class="px-7 text-center rounded-sm back-app-color"
            :class="figures.newClimbers > 0 ? 'py-4' : 'py-9'"
          >
            <p class="mb-n1 text-h3">
              {{ loadingFigures ? '...' : figures.count }}
            </p>
            <p
              v-if="!loadingFigures"
              class="text--disabled mb-0"
            >
              {{ $tc('common.climbers.shortWithoutCount', figures.count) }}
            </p>
            <div
              v-if="!loadingFigures && figures.newClimbers > 0"
              class="mt-2"
            >
              <v-chip
                color="red"
                text-color="white"
                class="font-weight-bold"
              >
                {{ $tc('common.new', figures.new_climbers, { count: figures.newClimbers }) }} !
              </v-chip>
            </div>
          </v-sheet>
        </v-col>
        <v-col
          :class="$vuetify.breakpoint.mobile ? 'text-center' : ''"
        >
          <p class="mb-1 font-weight-bold">
            {{ $t('components.user.climbersActiveRecently') }}
          </p>
          <div v-if="loadingFigures">
            <v-skeleton-loader
              class="d-inline-block mr-4"
              type="avatar, text"
              width="100"
            />
            <v-skeleton-loader
              class="d-inline-block mr-4"
              type="avatar, text"
              width="100"
            />
            <v-skeleton-loader
              class="d-inline-block"
              type="avatar, text"
              width="100"
            />
          </div>
          <div v-else>
            <v-card
              v-for="(climber, index) in figures.lastClimbers"
              :key="`around-climber-${index}`"
              class="d-inline-block text-center mb-2 pa-1 pt-2 text-center light-primary-hoverable"
              style="width: 100px"
              :to="climber.path"
              elevation="0"
            >
              <v-avatar size="60">
                <v-img :src="climber.thumbnailAvatarUrl" />
              </v-avatar>
              <p class="text-truncate mb-0">
                {{ climber.first_name }}
              </p>
            </v-card>
            <v-card
              class="d-inline-block text-center mb-2 pa-1 pt-2 text-center light-primary-hoverable border"
              style="width: 100px"
              elevation="0"
              to="/home/search-climbers"
            >
              <v-avatar size="60">
                <v-icon
                  large
                  color="primary"
                >
                  {{ mdiArrowRight }}
                </v-icon>
              </v-avatar>
              <p class="text-truncate font-weight-bold mb-0">
                {{ $t('common.seeAll') }}
              </p>
            </v-card>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="2"
          lg="1"
          class="text-center"
        >
          <v-card
            width="100"
            class="d-inline-block light-primary-hoverable pt-2"
            to="/maps/climbers"
          >
            <v-btn
              icon
            >
              <v-icon>
                {{ mdiMap }}
              </v-icon>
            </v-btn>
            <v-card-actions class="pt-0 justify-center">
              <small>
                {{ $t('common.map') }}
              </small>
            </v-card-actions>
          </v-card>
          <v-card
            width="100"
            class="d-inline-block light-primary-hoverable pt-2"
            to="/home/settings/partner"
          >
            <v-btn
              icon
            >
              <v-icon>
                {{ mdiCogOutline }}
              </v-icon>
            </v-btn>
            <v-card-actions class="pt-0 justify-center">
              <small>
                {{ $t('common.setting') }}
              </small>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { mdiAccountMultipleCheckOutline, mdiArrowRight, mdiMap, mdiCogOutline } from '@mdi/js'
import CurrentUserApi from '~/services/oblyk-api/CurrentUserApi'
import User from '~/models/User'

export default {
  name: 'MyPartnerFigures',

  data () {
    return {
      figures: {
        count: 0,
        newClimbers: 0,
        lastClimbers: []
      },
      loadingFigures: true,

      mdiAccountMultipleCheckOutline,
      mdiArrowRight,
      mdiMap,
      mdiCogOutline
    }
  },

  mounted () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      this.loadingFigures = true
      new CurrentUserApi(this.$axios, this.$auth)
        .partnerFigures()
        .then((resp) => {
          const figures = resp.data
          const climbers = []
          for (const climber of figures.last_partners) {
            climbers.push(new User({ attributes: climber }))
          }
          this.figures = {
            count: figures.count,
            newClimbers: figures.new_partners,
            lastClimbers: climbers
          }
        })
        .finally(() => {
          this.loadingFigures = false
        })
    }
  }
}
</script>
