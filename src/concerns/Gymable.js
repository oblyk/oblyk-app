import GymApi from '@/services/oblyk-api/gym'
import GymModel from '@/models/GymModel'

export const Gymable = {
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
      GymApi
        .find(this.$route.params.gymId)
        .then(resp => {
          this.gym = new GymModel(resp.data)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.loadingGym = false
        })
    }
  }
}
