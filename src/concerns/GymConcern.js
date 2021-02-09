import Gym from '@/models/Gym'
import store from '@/store'

export const GymConcern = {
  data () {
    return {
      gym: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.gymId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Gym()
        .find(to.params.gymId)
        .then(resp => {
          next(vm => {
            vm.gym = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'gym'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.gymId) {
      next()
    } else if (from.params.gymId === to.params.gymId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Gym()
        .find(to.params.gymId)
        .then(resp => {
          this.gym = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gym')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
