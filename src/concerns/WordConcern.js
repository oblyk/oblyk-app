import Word from '@/models/Word'
import store from '@/store'

export const WordConcern = {
  data () {
    return {
      word: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.wordId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Word()
        .find(to.params.wordId)
        .then(resp => {
          next(vm => {
            vm.word = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'word'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.wordId) {
      next()
    } else if (from.params.wordId === to.params.wordId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Word()
        .find(to.params.wordId)
        .then(resp => {
          this.word = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'word')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
