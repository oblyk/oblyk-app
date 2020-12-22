import Crag from '@/models/Crag'

export const Cragable = {
  data () {
    return {
      crag: null,
      loadingCrag: true
    }
  },

  created () {
    if (this.$route.params.cragId) this.getCrag()
  },

  methods: {
    getCrag: function () {
      this.loadingCrag = true
      new Crag()
        .find(this.$route.params.cragId)
        .then((resp) => {
          this.crag = resp
        })
        .catch((err) => {
          console.error(err)
        }).finally(() => {
          this.loadingCrag = false
        })
    }
  }
}
