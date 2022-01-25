import GuideBookPdf from '@/models/GuideBookPdf'

export const GuideBookPdfConcern = {
  data () {
    return {
      guideBookPdf: null
    }
  },

  async fetch () {
    this.guideBookPdf = await new GuideBookPdf({
      axios: this.$axios,
      auth: this.$auth
    })._find(
      this.$route.params.guideBookPdfId
    )
  }
}
