import Approach from '@/models/Approach'
import store from '@/store'

export const ApproachConcern = {
  data () {
    return {
      approach: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.cragId || !to.params.approachId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Approach()
        .find(
          to.params.cragId,
          to.params.approachId
        )
        .then(resp => {
          next(vm => {
            vm.approach = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'approach'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.cragId || !to.params.approachId) {
      next()
    } else if (from.params.approachId === to.params.approachId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Approach()
        .find(
          to.params.cragId,
          to.params.approachId
        )
        .then(resp => {
          this.approach = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'approach')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
