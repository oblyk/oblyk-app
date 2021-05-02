import Newsletter from '@/models/Newsletter'
import store from '@/store'

export const NewsletterConcern = {
  data () {
    return {
      newsletter: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.newsletterId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Newsletter()
        .find(to.params.newsletterId)
        .then(resp => {
          next(vm => {
            vm.newsletter = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'newsletter'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.newsletterId) {
      next()
    } else if (from.params.newsletterId === to.params.newsletterId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Newsletter()
        .find(to.params.newsletterId)
        .then(resp => {
          this.newsletter = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'newsletter')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
