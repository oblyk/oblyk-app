import GuideBookPaper from '@/models/GuideBookPaper'
import store from '@/store'

export const GuideBookPaperConcern = {
  data () {
    return {
      guideBookPaper: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.guideBookPaperId) {
      next()
      return
    }
    store.commit('loader/START_LOADING')
    new GuideBookPaper()
      .find(to.params.guideBookPaperId)
      .then(resp => {
        next(vm => {
          vm.guideBookPaper = resp
        })
      })
      .catch(err => {
        next(vm => vm.$root.$emit('alertFromApiError', err, 'guideBookPaper'))
      })
      .finally(() => {
        store.commit('loader/FINISH_LOADING')
      })
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.guideBookPaperId) {
      next()
      return
    }

    if (from.params.guideBookPaperId === to.params.guideBookPaperId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new GuideBookPaper()
        .find(to.params.guideBookPaperId)
        .then(resp => {
          this.guideBookPaper = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
