import Area from '@/models/Area'
import store from '@/store'

export const AreaConcern = {
  data () {
    return {
      area: null
    }
  },

  computed: {
    areaMetaTitle: function () {
      return this.$t('meta.area.title', {
        name: (this.area || {}).name
      })
    },
    areaMetaDescription: function () {
      return this.$t('meta.area.description', {
        name: (this.area || {}).name
      })
    },
    areaMetaImage: function () {
      if (this.area && this.area.photo) {
        return this.area.coverUrl()
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg`
      }
    },
    areaMetaUrl: function () {
      if (this.area) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.area.path()}`
      }
    }
  },

  metaInfo () {
    return {
      title: this.areaMetaTitle,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.areaMetaDescription
        },
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.areaMetaTitle
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.areaMetaDescription
        },
        {
          vmid: 'og-image',
          property: 'og:image',
          content: this.areaMetaImage
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: this.areaMetaUrl
        }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.areaId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Area()
        .find(to.params.areaId)
        .then(resp => {
          next(vm => {
            vm.area = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'area'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.areaId) {
      next()
    } else if (from.params.areaId === to.params.areaId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Area()
        .find(to.params.areaId)
        .then(resp => {
          this.area = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'area')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
