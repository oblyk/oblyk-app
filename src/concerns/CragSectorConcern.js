import CragSector from '@/models/CragSector'
import store from '@/store'

export const CragSectorConcern = {
  data () {
    return {
      cragSector: null
    }
  },

  computed: {
    cragSectorMetaTitle: function () {
      if (this.cragSector) {
        return this.$t('meta.cragSector.title', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name
        })
      }
    },
    cragSectorMetaDescription: function () {
      if (this.cragSector) {
        return this.$t('meta.cragSector.description', {
          name: this.cragSector.name,
          crag: this.cragSector.Crag.name,
          region: this.cragSector.Crag.region,
          city: this.cragSector.Crag.city
        })
      }
    },
    cragSectorMetaImage: function () {
      if (this.cragSector) {
        return this.cragSector.coverUrl()
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg`
      }
    },
    cragSectorMetaUrl: function () {
      if (this.cragSector) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.cragSector.path()}`
      }
    }
  },

  metaInfo () {
    return {
      title: this.cragSectorMetaTitle,
      meta: [
        {
          vmid: 'description',
          name: 'description',
          content: this.cragSectorMetaDescription
        },
        {
          vmid: 'og-title',
          property: 'og:title',
          content: this.cragSectorMetaTitle
        },
        {
          vmid: 'og-description',
          property: 'og:description',
          content: this.cragSectorMetaDescription
        },
        {
          vmid: 'og-image',
          property: 'og:image',
          content: this.cragSectorMetaImage
        },
        {
          vmid: 'og-url',
          property: 'og:url',
          content: this.cragSectorMetaUrl
        }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.cragId || !to.params.cragSectorId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new CragSector()
        .find(
          to.params.cragId,
          to.params.cragSectorId
        )
        .then(resp => {
          next(vm => {
            vm.cragSector = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'cragSector'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.cragId || !to.params.cragSectorId) {
      next()
    } else if (from.params.cragSectorId === to.params.cragSectorId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new CragSector()
        .find(
          to.params.cragId,
          to.params.cragSectorId
        )
        .then(resp => {
          this.cragSector = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'cragSector')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
