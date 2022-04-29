<template>
  <v-card
    :to="`${gym.adminPath}/administrators`"
    class="full-height"
  >
    <v-card-title>
      <v-icon left>
        {{ mdiAccountGroup }}
      </v-icon>
      {{ $t('components.gymAdmin.team') }}
    </v-card-title>
    <v-card-text class="text-center pt-5 pb-7">
      <spinner v-if="loadingGymAdministrators" :full-height="false" />
      <strong
        v-if="!loadingGymAdministrators"
        class="big-font-size"
      >
        {{ gymAdministrators.length }}
      </strong>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAccountGroup } from '@mdi/js'
import Spinner from '@/components/layouts/Spiner'
import GymAdministratorApi from '~/services/oblyk-api/GymAdministratorApi'

export default {
  name: 'GymAdminTeamFigures',
  components: { Spinner },
  props: {
    gym: Object
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
