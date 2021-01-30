import Photo from '@/models/Photo'

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
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.photoId) {
      next()
    } else if (from.params.photoId === to.params.photoId) {
      next()
    } else {
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
    }
  }
}
