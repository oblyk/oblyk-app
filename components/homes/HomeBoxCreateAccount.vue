<template>
  <div class="text-center my-7">
    <h2 class="text-h5 mb-3 font-weight-bold">
      {{ $t('home.createAccount.title') }}
    </h2>
    <p v-html="$t('home.createAccount.body', { count: climbersCount.toLocaleString() })" />
    <div>
      <v-btn
        elevation="0"
        color="primary"
        to="/sign-up?back_to=/oblyk"
      >
        {{ $t('actions.createFreeAccount') }}
      </v-btn>
    </div>
    <div>
      <v-btn
        text
        small
        to="/sign-in?back_to=/oblyk"
      >
        {{ $t('actions.signIn') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import OblykApi from '~/services/oblyk-api/OblykApi'

export default {
  name: 'HomeBoxCreateAccount',
  data () {
    return {
      climbersCount: '...'
    }
  },

  mounted () {
    this.getClimberCount()
  },

  methods: {
    getClimberCount () {
      new OblykApi(this.$axios, this.$auth)
        .get('/micro_stats', { figures: ['climbers_count'] })
        .then((resp) => {
          const climber = resp.data.climbers_count
          this.climbersCount = Math.floor(climber / 100) * 100
        })
    }
  }
}
</script>
