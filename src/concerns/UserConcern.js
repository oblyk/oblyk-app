import store from '@/store'
import User from '@/models/User'

export const UserConcern = {
  data () {
    return {
      user: null
    }
  },

  computed: {
    userMetaTitle: function () {
      return this.$t('meta.user.title', { name: (this.user || {}).first_name })
    },
    userMetaDescription: function () {
      return this.$t('meta.user.description', { name: (this.user || {}).first_name })
    },
    userMetaImage: function () {
      if (this.user && this.user.banner) {
        return this.user.bannerUrl()
      } else {
        return `${process.env.VUE_APP_OBLYK_APP_URL}/img/images/oblyk-og-image.jpg`
      }
    },
    userMetaUrl: function () {
      if (this.user) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.user.path()}`
      }
    }
  },

  metaInfo () {
    return {
      title: this.userMetaTitle,
      meta: [
        { vmid: 'description', name: 'description', content: this.userMetaDescription },
        { vmid: 'og-title', property: 'og:title', content: this.userMetaTitle },
        { vmid: 'og-description', property: 'og:description', content: this.userMetaDescription },
        { vmid: 'og-image', property: 'og:image', content: this.userMetaImage },
        { vmid: 'og-url', property: 'og:url', content: this.userMetaUrl }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.userUuid) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new User()
        .find(to.params.userUuid)
        .then(resp => {
          next(vm => {
            vm.user = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'user'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.userUuid) {
      next()
    } else if (from.params.userUuid === to.params.userUuid) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new User()
        .find(to.params.userUuid)
        .then(resp => {
          this.user = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'user')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
