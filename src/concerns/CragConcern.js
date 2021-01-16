import Crag from '@/models/Crag'

export const CragConcern = {
  data () {
    return {
      crag: null
    }
  },

  beforeRouteEnter (to, from, next) {
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
  },

  beforeRouteUpdate (to, from, next) {
    if (from.params.cragId === to.params.cragId) {
      next()
    } else {
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
    }
  }
}
