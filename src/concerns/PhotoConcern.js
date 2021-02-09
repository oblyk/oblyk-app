import Photo from '@/models/Photo'
import store from '@/store'

export const PhotoConcern = {
  data () {
    return {
      photo: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.photoId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Photo()
        .find(to.params.photoId)
        .then(resp => {
          next(vm => {
            vm.photo = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'photo'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.photoId) {
      next()
    } else if (from.params.photoId === to.params.photoId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Photo()
        .find(to.params.photoId)
        .then(resp => {
          this.photo = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'photo')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
