import GymOpener from '@/models/GymOpener'

export const GymOpenerConcern = {
  data () {
    return {
      gymOpener: null,
      loadingGymOpener: true
    }
  },

  created () {
    if (this.$route.params.gymOpenerId) { this.getGymOpener() }
  },

  methods: {
    getGymOpener () {
      this.loadingGymOpener = true
      new GymOpener({ axios: this.$axios, auth: this.$auth })
        ._find(
          this.$route.params.gymId,
          this.$route.params.gymOpenerId
        )
        .then((resp) => {
          this.gymOpener = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymOpener')
        }).finally(() => {
          this.loadingGymOpener = false
        })
    }
  }
}
