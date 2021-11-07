import Organization from '@/models/Organization'
import store from '@/store'

export const OrganizationConcern = {
  data () {
    return {
      organization: null
    }
  },

  computed: {
    organizationMetaTitle: function () {
      return (this.organization || {}).name
    },
    organizationMetaUrl: function () {
      if (this.organization) {
        return `${process.env.VUE_APP_OBLYK_APP_URL}${this.organization.path()}`
      }
    }
  },

  metaInfo () {
    return {
      title: this.organizationMetaTitle,
      meta: [
        { vmid: 'og-title', property: 'og:title', content: this.organizationMetaTitle },
        { vmid: 'og-url', property: 'og:url', content: this.organizationMetaUrl }
      ]
    }
  },

  beforeRouteEnter (to, from, next) {
    if (!to.params.organizationId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Organization()
        .find(to.params.organizationId)
        .then(resp => {
          next(vm => {
            vm.organization = resp
          })
        })
        .catch(err => {
          next(vm => vm.$root.$emit('alertFromApiError', err, 'organization'))
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  },

  beforeRouteUpdate (to, from, next) {
    if (!to.params.organizationId) {
      next()
    } else if (from.params.organizationId === to.params.organizationId) {
      next()
    } else {
      store.commit('loader/START_LOADING')
      new Organization()
        .find(to.params.organizationId)
        .then(resp => {
          this.organization = resp
          next()
        })
        .catch(err => {
          this.$root.$emit('alertFromApiError', err, 'organization')
          next()
        })
        .finally(() => {
          store.commit('loader/FINISH_LOADING')
        })
    }
  }
}
