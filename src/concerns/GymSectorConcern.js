import GymSector from '@/models/GymSector'

export const GymSectorConcern = {
  data () {
    return {
      gymSector: null,
      loadingGymSector: true
    }
  },

  created () {
    if (
      this.$route.params.gymId &&
      this.$route.params.gymSpaceId &&
      this.$route.params.gymSectorId
    ) {
      this.getGymSector()
    }
  },

  methods: {
    getGymSector: function () {
      this.loadingGymSector = true
      new GymSector()
        .find(
          this.$route.params.gymId,
          this.$route.params.gymSpaceId,
          this.$route.params.gymSectorId
        )
        .then((resp) => {
          this.gymSector = resp
        })
        .catch((err) => {
          console.error(err)
        }).finally(() => {
          this.loadingGymSector = false
        })
    }
  }
}
