import Crag from '@/models/Crag'
import store from '@/store'

export const CragConcern = {
  data () {
    return {
      crag: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.cragId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Crag()
        .find(to.params.cragId)
        .then(resp => {
          next(vm => {
            vm.crag = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'crag'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.cragId) {
      next()
    } else if (from.params.cragId === to.params.cragId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Crag()
        .find(to.params.cragId)
        .then(resp => {
          this.crag = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'crag')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
