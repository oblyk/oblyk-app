import Article from '@/models/Article'
import store from '@/store'

export const ArticleConcern = {
  data () {
    return {
      article: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.articleId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Article()
        .find(to.params.articleId)
        .then(resp => {
          next(vm => {
            vm.article = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'article'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.articleId) {
      next()
    } else if (from.params.articleId === to.params.articleId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Article()
        .find(to.params.articleId)
        .then(resp => {
          this.article = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'article')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
