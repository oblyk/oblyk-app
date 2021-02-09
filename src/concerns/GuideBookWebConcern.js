import GuideBookWeb from '@/models/GuideBookWeb'
import store from '@/store'

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
    store.commit('loader/START_LOADING')
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
      .finally(() => {
        store.commit('loader/FINISH_LOADING')
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
      store.commit('loader/START_LOADING')
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
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
