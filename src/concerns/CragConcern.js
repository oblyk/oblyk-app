import Crag from '@/models/Crag'
import store from '@/store'

export const CragConcern = {
  data () {
    return {
      crag: null
    }
  },

  computed: {
    cragMetaTitle: function () {
      return this.$t('meta.crag.title', { name: (this.crag || {}).name, region: (this.crag || {}).region })
    },
    cragMetaDescription: function () {
      return this.$t('meta.crag.description', { name: (this.crag || {}).name, region: (this.crag || {}).region, city: (this.crag || {}).city })
    },
    cragMetaImage: function () {
      if (this.crag && this.crag.photo) {
        return this.crag.coverUrl()
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg`
      }
    },
    cragMetaUrl: function () {
      if (this.crag) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.crag.path()}`
      }
    }
  },

  metaInfo () {
    return {
      title: this.cragMetaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.cragMetaDescription },
        { vmid: 'og-title', property: 'og:title', content: this.cragMetaTitle },
        { vmid: 'og-description', property: 'og:description', content: this.cragMetaDescription },
        { vmid: 'og-image', property: 'og:image', content: this.cragMetaImage },
        { vmid: 'og-url', property: 'og:url', content: this.cragMetaUrl }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.cragId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Crag()
        .find(to.params.cragId)
        .then(resp => {
          next(vm => {
            vm.crag = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'crag'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.cragId) {
      next()
    } else if (from.params.cragId === to.params.cragId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Crag()
        .find(to.params.cragId)
        .then(resp => {
          this.crag = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'crag')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
