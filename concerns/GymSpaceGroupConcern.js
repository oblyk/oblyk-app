import GymSpaceGroup from '@/models/GymSpaceGroup'

export const GymSpaceGroupConcern = {
  data () {
    return {
      gymSpaceGroup: null,
      loadingGymSpaceGroup: true
    }
  },

  created () {
    if (this.$route.params.gymSpaceGroupId) { this.getGymSpaceGroup() }
  },

  methods: {
    getGymSpaceGroup () {
      this.loadingGymSpaceGroup = true
      new GymSpaceGroup({ axios: this.$axios, auth: this.$auth })
        ._find(
          this.$route.params.gymId,
          this.$route.params.gymSpaceGroupId
        )
        .then((resp) => {
          this.gymSpaceGroup = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymSpaceGroup')
        }).finally(() => {
          this.loadingGymSpaceGroup = false
        })
    }
  }
}
