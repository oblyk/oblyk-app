import GymSpace from '@/models/GymSpace'
import store from '@/store'

export const GymSpaceConcern = {
  data () {
    return {
      gymSpace: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.gymId || !to.params.gymSpaceId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new GymSpace()
        .find(
          to.params.gymId,
          to.params.gymSpaceId
        )
        .then(resp => {
          next(vm => {
            vm.gymSpace = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'gymSpace'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.gymId || !to.params.gymSpaceId) {
      next()
    } else if (from.params.gymSpaceId === to.params.gymSpaceId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new GymSpace()
        .find(
          to.params.gymId,
          to.params.gymSpaceId
        )
        .then(resp => {
          this.gymSpace = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
