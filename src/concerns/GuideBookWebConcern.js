import GuideBookWeb from '@/models/GuideBookWeb'

export const GuideBookWebConcern = {
  data () {
    return {
      guideBookWeb: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.guideBookWebId) {
      next()
      return
    }

    new GuideBookWeb()
      .find(to.params.guideBookWebId)
      .then(resp => {
        next(vm => {
          vm.guideBookWeb = resp
        })
      })
      .catch(err => {
        next(vm => vm.$root.$emit('alertFromApiError', err, 'guideBookWeb'))
      })
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.guideBookWebId) {
      next()
      return
    }

    if (from.params.guideBookWebId === to.params.guideBookWebId) {
      next()
    } else {
      new GuideBookWeb()
        .find(to.params.guideBookWebId)
        .then(resp => {
          this.guideBookWeb = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'guideBookWeb')
          next()
        })
    }
  }
}
