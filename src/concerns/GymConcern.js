import Gym from '@/models/Gym'
import store from '@/store'

export const GymConcern = {
  data () {
    return {
      gym: null
    }
  },

  computed: {
    gymMetaTitle: function () {
      return this.$t('meta.gym.title', { name: (this.gym || {}).name, city: (this.gym || {}).city })
    },
    gymMetaDescription: function () {
      return this.$t(
        'meta.gym.description',
        {
          name: (this.gym || {}).name,
          city: (this.gym || {}).city,
          big_city: (this.gym || {}).big_city,
          region: (this.gym || {}).region
        }
      )
    },
    gymMetaImage: function () {
      if (this.gym && this.gym.banner) {
        return this.gym.bannerUrl()
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg`
      }
    },
    gymMetaUrl: function () {
      if (this.gym) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.gym.path()}`
      }
    }
  },

  metaInfo () {
    return {
      title: this.gymMetaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.gymMetaDescription },
        { vmid: 'og-title', property: 'og:title', content: this.gymMetaTitle },
        { vmid: 'og-description', property: 'og:description', content: this.gymMetaDescription },
        { vmid: 'og-image', property: 'og:image', content: this.gymMetaImage },
        { vmid: 'og-url', property: 'og:url', content: this.gymMetaUrl }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.gymId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Gym()
        .find(to.params.gymId)
        .then(resp => {
          next(vm => {
            vm.gym = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'gym'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.gymId) {
      next()
    } else if (from.params.gymId === to.params.gymId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Gym()
        .find(to.params.gymId)
        .then(resp => {
          this.gym = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'gym')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
