import Link from '@/models/Link'

export const LinkConcern = {
  data () {
    return {
      link: null,
      loadingLink: true
    }
  },

  created () {
    if (this.$route.params.linkId) { this.getLink() }
  },

  methods: {
    getLink () {
      this.loadingLink = true
      new Link({ axios: this.$axios, auth: this.$auth })
        ._find(this.$route.params.linkId)
        .then((resp) => {
          this.link = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'link')
        }).finally(() => {
          this.loadingLink = false
        })
    }
  }
}
