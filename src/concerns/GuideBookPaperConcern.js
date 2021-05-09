import GuideBookPaper from '@/models/GuideBookPaper'
import store from '@/store'

export const GuideBookPaperConcern = {
  data () {
    return {
      guideBookPaper: null
    }
  },

  computed: {
    guideBookPaperMetaTitle: function () {
      return this.$t('meta.guideBookPaper.title', {
        name: (this.guideBookPaper || {}).name
      })
    },
    guideBookPaperMetaDescription: function () {
      return this.$t('meta.guideBookPaper.description', {
        name: (this.guideBookPaper || {}).name
      })
    },
    guideBookPaperMetaImage: function () {
      if (this.guideBookPaper) {
        return this.guideBookPaper.coverUrl()
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg`
      }
    },
    guideBookPaperMetaUrl: function () {
      if (this.guideBookPaper) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.guideBookPaper.path()}`
      }
    }
  },

  metaInfo () {
    return {
      title: this.guideBookPaperMetaTitle,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.guideBookPaperMetaDescription
        },
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.guideBookPaperMetaTitle
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.guideBookPaperMetaDescription
        },
        {
          vmid: 'og-image',
          property: 'og:image',
          content: this.guideBookPaperMetaImage
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: this.guideBookPaperMetaUrl
        }
      ]
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
