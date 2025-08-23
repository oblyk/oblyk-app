<template>
  <div>
    <p class="mb-1 font-weight-medium">
      <v-icon color="primary" left class="vertical-align-top">
        {{ mdiBookOutline }}
      </v-icon>
      {{ $t('components.dailyCrosses.myLogbook') }}
    </p>
    <v-sheet class="rounded pa-2">
      <div class="d-flex">
        <v-sheet class="pt-4 px-3 pb-1 rounded-sm back-app-color">
          <p class="mb-4 text-center">
            <span class="text-h4">
              {{ figures?.ascents === null ? '...' : figures?.ascents }}
            </span><br>
            <span class="text--disabled">
              {{ $t('models.gymRoute.ascents') }}
            </span>
          </p>
        </v-sheet>
        <div class="pl-2">
          <p class="mb-0 font-weight-medium">
            {{ $t('components.logBook.since28Days') }}
          </p>
          <div v-if="loadingFigures">
            <p class="mb-0">
              ...
            </p>
            <p class="mb-0">
              ...
            </p>
            <p class="mb-0">
              <v-chip small>
                {{ $tc('components.climbingSession.count', 2, { count: '...' }) }}
              </v-chip>
            </p>
          </div>
          <div v-else>
            <p class="mb-0">
              {{ $tc('components.logBook.figures.additionalAscents', figures.last_28_days.ascents, { count: figures.last_28_days.ascents }) }}
            </p>
            <p class="mb-0">
              {{ $tc('components.logBook.figures.gyms', figures.last_28_days.gyms, { count: figures.last_28_days.gyms }) }}
            </p>
            <p class="mb-0">
              <v-chip
                to="/home/climbing-sessions?only-indoor=true&back_to=/indoor"
                small
              >
                {{ $tc('components.climbingSession.count', figures.last_28_days.sessions, { count: figures.last_28_days.sessions }) }}
              </v-chip>
            </p>
          </div>
        </div>
      </div>
      <div class="text-right mt-2">
        <v-btn
          small
          to="/home/ascents/indoor"
          elevation="0"
          color="primary"
        >
          <v-icon left>
            {{ mdiBookOutline }}
          </v-icon>
          {{ $t('components.user.ascentTabs.sendList') }}
        </v-btn>
        <v-btn
          to="/ascents/indoor/new"
          small
          elevation="0"
          color="primary"
        >
          <v-icon left>
            {{ mdiPlusBoxOutline }}
          </v-icon>
          {{ $t('actions.addAAscents') }}
        </v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mdiBookOutline, mdiPlusBoxOutline } from '@mdi/js'
import LogBookIndoorApi from '~/services/oblyk-api/LogBookIndoorApi'

export default {
  name: 'LogBookIndoorSmallFigures',

  data () {
    return {
      figures: null,
      loadingFigures: true,

      mdiBookOutline,
      mdiPlusBoxOutline
    }
  },

  mounted () {
    this.getFigures()
  },

  methods: {
    getFigures () {
      this.loadingFigures = true
      new LogBookIndoorApi(this.$axios, this.$auth)
        .figures()
        .then((resp) => {
          this.figures = resp.data
        })
        .finally(() => {
          this.loadingFigures = false
        })
    }
  }
}
</script>
