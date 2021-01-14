<template>
  <v-card
    :to="gym.url('administrators')"
    class="full-height"
  >
    <v-card-title>
      <v-icon left>
        mdi-account-group
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
import Spinner from '@/components/layouts/Spiner'
import GymAdministratorApi from '@/services/oblyk-api/GymAdministratorApi'
export default {
  name: 'GymTeamCard',
  components: { Spinner },
  props: {
    gym: Object
  },

  data () {
    return {
      loadingGymAdministrators: true,
      gymAdministrators: []
    }
  },

  created () {
    this.getGymAdministrators()
  },

  methods: {
    getGymAdministrators: function () {
      GymAdministratorApi
        .all(this.gym.id)
        .then(resp => {
          this.gymAdministrators = resp.data
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymAdministrator')
        })
        .finally(() => {
          this.loadingGymAdministrators = false
        })
    }
  }
}
</script>
