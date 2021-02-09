import GuideBookPdf from '@/models/GuideBookPdf'
import store from '@/store'

export const GuideBookPdfConcern = {
  data () {
    return {
      guideBookPdf: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.guideBookPdfId) {
      next()
      return
    }
    store.commit('loader/START_LOADING')
    new GuideBookPdf()
      .find(to.params.guideBookPdfId)
      .then(resp => {
        next(vm => {
          vm.guideBookPdf = resp
        })
      })
      .catch(err => {
        next(vm => vm.$root.$emit('alertFromApiError', err, 'guideBookPdf'))
      })
      .finally(() => {
        store.commit('loader/FINISH_LOADING')
      })
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.guideBookPdfId) {
      next()
      return
    }

    if (from.params.guideBookPdfId === to.params.guideBookPdfId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new GuideBookPdf()
        .find(to.params.guideBookPdfId)
        .then(resp => {
          this.guideBookPdf = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'guideBookPdf')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
