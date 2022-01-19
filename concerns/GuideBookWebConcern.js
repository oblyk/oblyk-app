import GuideBookWeb from '@/models/GuideBookWeb'

export const GuideBookWebConcern = {
  data () {
    return {
      guideBookWeb: null
    }
  },

  async fetch () {
    this.guideBookWeb = await new GuideBookWeb({
      axios: this.$axios,
      store: this.$store
    })._find(
      this.$route.params.guideBookWebId
    )
  }
}
