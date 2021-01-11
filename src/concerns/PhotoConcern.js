import Photo from '@/models/Photo'

export const PhotoConcern = {
  data () {
    return {
      photo: null,
      loadingPhoto: true
    }
  },

  created () {
    if (this.$route.params.photoId) this.getPhoto()
  },

  methods: {
    getPhoto: function () {
      this.loadingPhoto = true
      new Photo()
        .find(this.$route.params.photoId)
        .then((resp) => {
          this.photo = resp
        })
        .catch((err) => {
          this.$root.$emit('alertFromApiError', err, 'photo')
        }).finally(() => {
          this.loadingPhoto = false
        })
    }
  }
}
