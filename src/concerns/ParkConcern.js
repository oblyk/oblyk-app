import Park from '@/models/Park'

export const ParkConcern = {
  data () {
    return {
      park: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.cragId || !to.params.parkId) {
      next()
    } else {
      new Park()
        .find(
          to.params.cragId,
          to.params.parkId
        )
        .then(resp => {
          next(vm => {
            vm.park = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'park'))
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.cragId || !to.params.parkId) {
      next()
    } else if (from.params.parkId === to.params.parkId) {
      next()
    } else {
      new Park()
        .find(
          to.params.cragId,
          to.params.parkId
        )
        .then(resp => {
          this.park = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'park')
          next()
        })
    }
  }
}
