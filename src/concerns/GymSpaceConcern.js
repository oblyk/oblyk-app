import GymSpace from '@/models/GymSpace'
import store from '@/store'

export const GymSpaceConcern = {
  data () {
    return {
      gymSpace: null
    }
  },

  computed: {
    gymSpaceMetaTitle: function () {
      if (this.gymSpace) {
        return this.$t('meta.gym.space.title', { name: this.gymSpace.name, gym: this.gymSpace.gym.name })
      }
    },
    gymSpaceMetaDescription: function () {
      if (this.gymSpace) {
        return this.$t('meta.gym.space.description', { gym: this.gymSpace.gym.name })
      }
    },
    gymSpaceMetaImage: function () {
      if (this.gymSpace && this.gymSpace.gym.banner) {
        return this.gymSpace.Gym.bannerUrl()
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg`
      }
    },
    gymSpaceMetaUrl: function () {
      if (this.gymSpace) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gymSpace.path()}`
      }
    }
  },

  metaInfo () {
    return {
      title: this.gymSpaceMetaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.gymSpaceMetaDescription },
        { vmid: 'og-title', property: 'og:title', content: this.gymSpaceMetaTitle },
        { vmid: 'og-description', property: 'og:description', content: this.gymSpaceMetaDescription },
        { vmid: 'og-image', property: 'og:image', content: this.gymSpaceMetaImage },
        { vmid: 'og-url', property: 'og:url', content: this.gymSpaceMetaUrl }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.gymId || !to.params.gymSpaceId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new GymSpace()
        .find(
          to.params.gymId,
          to.params.gymSpaceId
        )
        .then(resp => {
          next(vm => {
            vm.gymSpace = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'gymSpace'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.gymId || !to.params.gymSpaceId) {
      next()
    } else if (from.params.gymSpaceId === to.params.gymSpaceId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new GymSpace()
        .find(
          to.params.gymId,
          to.params.gymSpaceId
        )
        .then(resp => {
          this.gymSpace = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gymSpace')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
