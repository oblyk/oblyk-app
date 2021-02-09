import Area from '@/models/Area'
import store from '@/store'

export const AreaConcern = {
  data () {
    return {
      area: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.areaId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Area()
        .find(to.params.areaId)
        .then(resp => {
          next(vm => {
            vm.area = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'area'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.areaId) {
      next()
    } else if (from.params.areaId === to.params.areaId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Area()
        .find(to.params.areaId)
        .then(resp => {
          this.area = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'area')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
