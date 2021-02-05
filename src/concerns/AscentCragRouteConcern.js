import AscentCragRoute from '@/models/AscentCragRoute'

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
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.ascentCragRouteId) {
      next()
    } else if (from.params.ascentCragRouteId === to.params.ascentCragRouteId) {
      next()
    } else {
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
    }
  }
}
