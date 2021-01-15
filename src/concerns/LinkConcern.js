import Link from '@/models/Link'

export const LinkConcern = {
  data () {
    return {
      link: null,
      loadingLink: true
    }
  },

  created () {
    if (this.$route.params.linkId) this.getLink()
  },

  methods: {
    getLink: function () {
      this.loadingLink = true
      new Link()
        .find(this.$route.params.linkId)
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
