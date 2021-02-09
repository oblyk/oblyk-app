import AscentCragRoute from '@/models/AscentCragRoute'
import store from '@/store'

export const AscentCragRouteConcern = {
  data () {
    return {
      ascentCragRoute: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.ascentCragRouteId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new AscentCragRoute()
        .find(to.params.ascentCragRouteId)
        .then(resp => {
          next(vm => {
            vm.ascentCragRoute = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'ascentCragRoute'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.ascentCragRouteId) {
      next()
    } else if (from.params.ascentCragRouteId === to.params.ascentCragRouteId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new AscentCragRoute()
        .find(to.params.ascentCragRouteId)
        .then(resp => {
          this.ascentCragRoute = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'ascentCragRoute')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
