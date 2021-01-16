import Word from '@/models/Word'

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
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.wordId) {
      next()
    } else if (from.params.wordId === to.params.wordId) {
      next()
    } else {
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
    }
  }
}
