import Video from '@/models/Video'

export const VideoConcern = {
  data () {
    return {
      video: null,
      loadingVideo: true
    }
  },

  created () {
    if (this.$route.params.videoId) { this.getVideo() }
  },

  methods: {
    getVideo () {
      this.loadingVideo = true
      new Video({ axios: this.$axios, store: this.$store })
        ._find(this.$route.params.videoId)
        .then((resp) => {
          this.video = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'video')
        }).finally(() => {
          this.loadingVideo = false
        })
    }
  }
}
