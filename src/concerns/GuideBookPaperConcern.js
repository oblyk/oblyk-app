import GuideBookPaper from '@/models/GuideBookPaper'

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
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.guideBookPaperId) {
      next()
      return
    }

    if (from.params.guideBookPaperId === to.params.guideBookPaperId) {
      next()
    } else {
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
    }
  }
}
