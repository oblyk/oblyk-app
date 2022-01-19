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
      store: this.$store
    })._find(
      this.$route.params.guideBookPdfId
    )
  }
}
