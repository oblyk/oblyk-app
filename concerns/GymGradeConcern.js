import GymGrade from '@/models/GymGrade'

export const GymGradeConcern = {
  data () {
    return {
      gymGrade: null,
      loadingGymGrade: true
    }
  },

  created () {
    if (this.$route.params.gymGradeId) { this.getGymGrade() }
  },

  methods: {
    getGymGrade () {
      this.loadingGymGrade = true
      new GymGrade({ axios: this.$axios, store: this.$store })
        ._find(
          this.$route.params.gymId,
          this.$route.params.gymGradeId
        )
        .then((resp) => {
          this.gymGrade = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gymGrade')
        }).finally(() => {
          this.loadingGymGrade = false
        })
    }
  }
}
