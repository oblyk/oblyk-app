<template>
  <v-container>
    <h1 class="text-h5 mt-4 mb-4">
      {{ $t('components.ascentCragRoute.addedAscentToLogbook') }}
    </h1>

    <!-- Display loader if gym_id is in url -->
    <v-skeleton-loader
      v-if="loadingGymFromQuery"
      type="list-item-avatar"
      :full-height="false"
    />

    <!-- Gym search form -->
    <v-card v-if="!selectedGym && !ascentAdded && !loadingGymFromQuery">
      <v-card-title>
        <v-icon left>
          {{ mdiOfficeBuildingMarker }}
        </v-icon>
        {{ $t('components.ascentGymRoute.whichGym') }}
      </v-card-title>
      <v-card-text>
        <gym-search-form
          :callback="gymFormSearch"
          :used-callback="searchUsed"
          :linkable-result="false"
          :around-me-btn="true"
        />
        <div v-if="addGymBtn">
          <p class="text-right mt-3">
            <strong class="text--disabled">
              {{ $t('components.ascentGymRoute.gymNotFound') }}
            </strong><br>
            <v-btn
              :to="`/gyms/new?redirect_to=${$route.fullPath}&name=${query}`"
              text
              small
            >
              <v-icon left>
                {{ mdiPlus }}
              </v-icon>
              {{ $t('actions.addGym') }}
            </v-btn>
          </p>
        </div>
      </v-card-text>
    </v-card>

    <!-- Gym card and ascents form -->
    <div v-if="selectedGym && !ascentAdded">
      <gym-small-card
        :gym="selectedGym"
        :small="true"
      />

      <v-card class="pa-4 mt-3">
        <ascent-gym-bulk-form
          :gym="selectedGym"
          :callback="addCallback"
        />
      </v-card>
    </div>

    <!-- Success message and redirect btn -->
    <div
      v-if="selectedGym && ascentAdded"
      class="mt-3"
    >
      <v-alert
        type="success"
        text
      >
        {{ $t('components.ascentGymRoute.addingSuccess') }}
      </v-alert>
      <v-row justify="center">
        <v-col cols="12" md="4" lg="3">
          <v-btn
            block
            outlined
            text
            :to="selectedGym.path"
          >
            <v-icon
              color="primary"
              left
            >
              {{ mdiOfficeBuildingMarker }}
            </v-icon>
            {{ $t('components.ascentGymRoute.gymPage') }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" lg="3">
          <v-btn
            block
            outlined
            text
            to="`/home/ascents/indoor"
          >
            <v-icon
              color="primary"
              left
            >
              {{ mdiBookCheckOutline }}
            </v-icon>
            {{ $t('components.ascentCragRoute.seeLogbook') }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="4" lg="3">
          <v-btn
            block
            outlined
            text
            @click="reset"
          >
            <v-icon
              color="primary"
              left
            >
              {{ mdiPlusBoxOutline }}
            </v-icon>
            {{ $t('components.ascentGymRoute.addNewAscents') }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {
  mdiOfficeBuildingMarker,
  mdiPlusBoxOutline,
  mdiBookCheckOutline,
  mdiPlus
} from '@mdi/js'
import GymSearchForm from '~/components/gyms/forms/GymSearchForm.vue'
import GymSmallCard from '~/components/gyms/GymSmallCard.vue'
import AscentGymBulkForm from '~/components/ascentGymRoutes/forms/AscentGymBulkForm.vue'
import GymApi from '~/services/oblyk-api/GymApi'
import Gym from '~/models/Gym'

export default {
  components: { AscentGymBulkForm, GymSmallCard, GymSearchForm },

  data () {
    return {
      gymId: null,
      loadingGymFromQuery: false,
      addGymBtn: false,
      selectedGym: null,
      ascentAdded: false,
      query: null,

      mdiOfficeBuildingMarker,
      mdiPlusBoxOutline,
      mdiBookCheckOutline,
      mdiPlus
    }
  },

  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    this.gymId = urlParams.get('gym_id')
    if (this.gymId) {
      this.getGym()
    }
  },

  methods: {
    getGym () {
      this.loadingGymFromQuery = true
      new GymApi(this.$axios, this.$auth)
        .find(this.gymId)
        .then((resp) => {
          this.selectedGym = new Gym({ attributes: resp.data })
        })
        .finally(() => {
          this.loadingGymFromQuery = false
        })
    },

    searchUsed (query) {
      this.addGymBtn = true
      this.query = query
    },

    gymFormSearch (gym) {
      this.selectedGym = gym
    },

    addCallback () {
      this.ascentAdded = true
    },

    reset () {
      this.ascentAdded = false
      this.selectedGym = null
    }
  }
}
</script>
