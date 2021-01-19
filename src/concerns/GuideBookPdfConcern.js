import GuideBookPdf from '@/models/GuideBookPdf'

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
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.guideBookPdfId) {
      next()
      return
    }

    if (from.params.guideBookPdfId === to.params.guideBookPdfId) {
      next()
    } else {
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
    }
  }
}
