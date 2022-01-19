import Newsletter from '@/models/Newsletter'

export const NewsletterConcern = {
  data () {
    return {
      newsletter: null
    }
  },

  async fetch () {
    this.newsletter = await new Newsletter({
      axios: this.$axios,
      store: this.$store
    })._find(
      this.$route.params.newsletterId
    )
  }
}
