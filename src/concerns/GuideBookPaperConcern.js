import GuideBookPaper from '@/models/GuideBookPaper'

export const GuideBookPaperConcern = {
  data () {
    return {
      guideBookPaper: null,
      loadingGuideBookPaper: true
    }
  },

  created () {
    if (this.$route.params.guideBookPaperId) this.getGuideBookPaper()
  },

  methods: {
    getGuideBookPaper: function () {
      this.loadingGuideBookPaper = true
      new GuideBookPaper()
        .find(this.$route.params.guideBookPaperId)
        .then((resp) => {
          this.guideBookPaper = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'guideBookPaper')
        }).finally(() => {
          this.loadingGuideBookPaper = false
        })
    }
  }
}
