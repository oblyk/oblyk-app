import CragSector from '@/models/CragSector'
import store from '@/store'

export const CragSectorConcern = {
  data () {
    return {
      cragSector: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.cragId || !to.params.cragSectorId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new CragSector()
        .find(
          to.params.cragId,
          to.params.cragSectorId
        )
        .then(resp => {
          next(vm => {
            vm.cragSector = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'cragSector'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.cragId || !to.params.cragSectorId) {
      next()
    } else if (from.params.cragSectorId === to.params.cragSectorId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new CragSector()
        .find(
          to.params.cragId,
          to.params.cragSectorId
        )
        .then(resp => {
          this.cragSector = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'cragSector')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
