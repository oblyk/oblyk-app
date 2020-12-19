import GymApi from '@/services/oblyk-api/gym'
import GymModel from '@/models/GymModel'

export const Gymable = {
  data () {
    return {
      gym: null,
      load: true
    }
  },

  created () {
    this.getGym()
  },

  methods: {
    getGym: function () {
      GymApi
        .find(this.$route.params.gymId)
        .then(resp => {
          this.gym = new GymModel(resp.data)
        })
        .catch(err => {
          console.error(err)
        })
        .finally(() => {
          this.load = false
        })
    }
  }
}
