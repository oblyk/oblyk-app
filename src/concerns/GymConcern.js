import Gym from '@/models/Gym'

export const GymConcern = {
  data () {
    return {
      gym: null,
      loadingGym: true
    }
  },

  created () {
    if (this.$route.params.gymId) this.getGym()
  },

  methods: {
    getGym: function () {
      this.loadingGym = true
      new Gym()
        .find(this.$route.params.gymId)
        .then((resp) => {
          this.gym = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'gym')
        }).finally(() => {
          this.loadingGym = false
        })
    }
  }
}
