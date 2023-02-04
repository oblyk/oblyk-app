<template>
  <v-card
    class="full-height"
  >
    <v-card-title>
      <v-icon left>
        {{ mdiAccountGroup }}
      </v-icon>
      {{ $t('components.gymAdmin.team') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <strong class="big-font-size">
        <span v-if="loadingGymAdministrators">
          ...
        </span>
        <span v-else>
          {{ gymAdministrators.length }}
        </span>
      </strong>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        text
        color="primary"
        :to="`${gym.adminPath}/administrators`"
      >
        {{ $t('components.gymAdmin.team') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mdiAccountGroup } from '@mdi/js'
import GymAdministratorApi from '~/services/oblyk-api/GymAdministratorApi'

export default {
  name: 'GymAdminTeamFigures',
  props: {
    gym: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mdiAccountGroup,
      loadingGymAdministrators: true,
      gymAdministrators: []
    }
  },

  created () {
    this.getGymAdministrators()
  },

  methods: {
    getGymAdministrators () {
      new GymAdministratorApi(this.$axios, this.$auth)
        .all(this.gym.id)
        .then((resp) => {
          this.gymAdministrators = resp.data
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymAdministrator')
        })
        .finally(() => {
          this.loadingGymAdministrators = false
        })
    }
  }
}
</script>
