import store from '@/store'
import User from '@/models/User'

export const UserConcern = {
  data () {
    return {
      user: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.userUuid) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new User()
        .find(to.params.userUuid)
        .then(resp => {
          next(vm => {
            vm.user = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'user'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.userUuid) {
      next()
    } else if (from.params.userUuid === to.params.userUuid) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new User()
        .find(to.params.userUuid)
        .then(resp => {
          this.user = resp
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
